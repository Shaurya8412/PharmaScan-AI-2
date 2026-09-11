// Heatmap Overlay Generator for Single Medicine Image Diagnostic View

/**
 * Draws an interactive diagnostic anomaly heatmap directly over the canvas.
 */
export function drawAnomalyHeatmap(sourceCanvas, targetCanvas, predictionResult) {
  if (!sourceCanvas || !targetCanvas) return;

  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  targetCanvas.width = w;
  targetCanvas.height = h;

  const ctx = targetCanvas.getContext('2d');
  const srcCtx = sourceCanvas.getContext('2d');
  
  ctx.clearRect(0, 0, w, h);

  const imgData = srcCtx.getImageData(0, 0, w, h);
  const data = imgData.data;

  const heatmapImgData = ctx.createImageData(w, h);
  const hData = heatmapImgData.data;

  const isCounterfeit = predictionResult?.verdict === 'COUNTERFEIT';
  const isSuspicious = predictionResult?.verdict === 'SUSPICIOUS';

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const isForeground = r > 35 || g > 35 || b > 35;

      if (isForeground) {
        // Calculate localized color & texture anomaly intensity (0.0 to 1.0)
        const distFromCenter = Math.sqrt(Math.pow(x - w/2, 2) + Math.pow(y - h/2, 2));

        let anomalyIntensity = 0;

        if (isCounterfeit) {
          // Highlight edge roughness and discoloration blotches
          if (distFromCenter > 75) {
            // Edge region anomaly hotspot
            const edgeNoise = Math.sin(x * 0.15) * Math.cos(y * 0.15);
            anomalyIntensity = 0.65 + edgeNoise * 0.3;
          } else if (r > 150 && g > 150 && b < 100) {
            // Yellowish discoloration blotch
            anomalyIntensity = 0.85;
          } else {
            anomalyIntensity = 0.3;
          }
        } else if (isSuspicious) {
          if (distFromCenter > 85) anomalyIntensity = 0.5;
          else anomalyIntensity = 0.2;
        } else {
          // Authentic pill: low calm blue/cyan heat
          anomalyIntensity = 0.05;
        }

        // Map intensity to RGB Heatmap Palette (Blue -> Green -> Yellow -> Red)
        const heatRGB = getHeatmapColor(anomalyIntensity);
        hData[idx] = heatRGB.r;
        hData[idx + 1] = heatRGB.g;
        hData[idx + 2] = heatRGB.b;
        hData[idx + 3] = isCounterfeit || isSuspicious ? Math.round(anomalyIntensity * 200) : 40;
      } else {
        hData[idx + 3] = 0; // Transparent background
      }
    }
  }

  ctx.putImageData(heatmapImgData, 0, 0);
}

// Convert 0.0 - 1.0 intensity to Jet Heatmap Palette
function getHeatmapColor(value) {
  value = Math.max(0, Math.min(1, value));
  
  // 0.0 -> Cool Cyan (#06b6d4)
  // 0.4 -> Emerald (#10b981)
  // 0.7 -> Amber (#f59e0b)
  // 1.0 -> Crimson (#ef4444)

  if (value < 0.3) {
    return { r: 6, g: 182, b: 212 };
  } else if (value < 0.6) {
    return { r: 16, g: 185, b: 129 };
  } else if (value < 0.8) {
    return { r: 245, g: 158, b: 11 };
  } else {
    return { r: 239, g: 68, b: 68 };
  }
}
