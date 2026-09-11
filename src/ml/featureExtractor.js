// Client-Side Computer Vision Feature Extractor for Single Medicine Images

/**
 * Analyzes an HTMLImageElement or Canvas image and extracts 12 visual feature metrics.
 */
export async function extractImageFeatures(imageElement) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const width = 300;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    // Draw input image into normalized 300x300 canvas
    ctx.drawImage(imageElement, 0, 0, width, height);

    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    let rSum = 0, gSum = 0, bSum = 0;
    let validPixelCount = 0;

    // HSL histogram accumulators
    let hSum = 0, sSum = 0, lSum = 0;
    const hslList = [];

    // Filter out background dark pixels (assuming darker border background)
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Ignore background dark slate pixels (< 30 intensity)
      if (r > 35 || g > 35 || b > 35) {
        rSum += r;
        gSum += g;
        bSum += b;
        validPixelCount++;

        const hsl = rgbToHsl(r, g, b);
        hSum += hsl.h;
        sSum += hsl.s;
        lSum += hsl.l;
        hslList.push(hsl);
      }
    }

    if (validPixelCount === 0) validPixelCount = 1;

    const avgR = rSum / validPixelCount;
    const avgG = gSum / validPixelCount;
    const avgB = bSum / validPixelCount;

    const avgH = hSum / validPixelCount;
    const avgS = sSum / validPixelCount;
    const avgL = lSum / validPixelCount;

    // Calculate Color Variance / Standard Deviation
    let sVariance = 0;
    hslList.forEach(item => {
      sVariance += Math.pow(item.s - avgS, 2);
    });
    const sStdDev = Math.sqrt(sVariance / (hslList.length || 1));

    // Calculate Laplacian Edge Roughness Variance (Surface Texture Erosion)
    const laplacianScore = calculateLaplacianVariance(ctx, width, height);

    // Calculate Pill Contour Symmetry & Circularity
    const contourMetrics = calculateContourCircularity(ctx, width, height);

    // Calculate Imprint / Text Gradient Sharpness
    const imprintSharpness = calculateImprintSharpness(ctx, width, height);

    resolve({
      colorVector: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) },
      hslVector: { h: Math.round(avgH), s: Math.round(avgS), l: Math.round(avgL) },
      colorVariance: Math.round(sStdDev * 100) / 100, // Discoloration metric
      laplacianEdgeScore: Math.round(laplacianScore * 10) / 10, // Roughness metric
      circularity: Math.round(contourMetrics.circularity * 100) / 100, // Shape symmetry (0-1)
      aspectRatio: Math.round(contourMetrics.aspectRatio * 100) / 100,
      imprintSharpness: Math.round(imprintSharpness * 10) / 10,
      glossFactor: Math.round(avgL * 1.2)
    });
  });
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Compute Laplacian Edge Variance using 3x3 Convolution Kernel
function calculateLaplacianVariance(ctx, w, h) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;
  
  // Convert to grayscale
  const gray = new Float32Array(w * h);
  for (let i = 0; i < data.length; i += 4) {
    gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }

  // 3x3 Laplacian Kernel: [[0, 1, 0], [1, -4, 1], [0, 1, 0]]
  let mean = 0;
  const laplacian = new Float32Array((w - 2) * (h - 2));
  let idx = 0;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const center = gray[y * w + x];
      const top = gray[(y - 1) * w + x];
      const bottom = gray[(y + 1) * w + x];
      const left = gray[y * w + (x - 1)];
      const right = gray[y * w + (x + 1)];

      const val = Math.abs(top + bottom + left + right - 4 * center);
      laplacian[idx] = val;
      mean += val;
      idx++;
    }
  }

  mean /= laplacian.length;

  let variance = 0;
  for (let i = 0; i < laplacian.length; i++) {
    variance += Math.pow(laplacian[i] - mean, 2);
  }

  return Math.sqrt(variance / laplacian.length);
}

// Compute Contour Symmetry and Circularity: 4 * pi * Area / (Perimeter^2)
function calculateContourCircularity(ctx, w, h) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  let area = 0;
  let perimeter = 0;
  let minX = w, maxX = 0, minY = h, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const isForeground = data[idx] > 35 || data[idx + 1] > 35 || data[idx + 2] > 35;

      if (isForeground) {
        area++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        // Check 4-neighbor perimeter border
        const isBorder = (x === 0 || x === w - 1 || y === 0 || y === h - 1) ||
          (data[((y - 1) * w + x) * 4] <= 35) ||
          (data[((y + 1) * w + x) * 4] <= 35) ||
          (data[(y * w + (x - 1)) * 4] <= 35) ||
          (data[(y * w + (x + 1)) * 4] <= 35);

        if (isBorder) perimeter++;
      }
    }
  }

  const boxW = Math.max(1, maxX - minX);
  const boxH = Math.max(1, maxY - minY);
  const aspectRatio = boxW / boxH;

  if (perimeter === 0) return { circularity: 0.5, aspectRatio: 1.0 };

  const circularity = (4 * Math.PI * area) / (perimeter * perimeter);
  return { circularity: Math.min(1.0, circularity), aspectRatio };
}

// Compute Imprint Text Gradient Sharpness in central ROI
function calculateImprintSharpness(ctx, w, h) {
  const roiX = Math.round(w * 0.25);
  const roiY = Math.round(h * 0.25);
  const roiW = Math.round(w * 0.5);
  const roiH = Math.round(h * 0.5);

  const imgData = ctx.getImageData(roiX, roiY, roiW, roiH);
  const data = imgData.data;

  let totalGradient = 0;
  for (let y = 0; y < roiH - 1; y++) {
    for (let x = 0; x < roiW - 1; x++) {
      const i1 = (y * roiW + x) * 4;
      const i2 = (y * roiW + (x + 1)) * 4;
      const i3 = ((y + 1) * roiW + x) * 4;

      const gx = Math.abs(data[i1] - data[i2]);
      const gy = Math.abs(data[i1] - data[i3]);
      totalGradient += Math.sqrt(gx * gx + gy * gy);
    }
  }

  return totalGradient / (roiW * roiH);
}
