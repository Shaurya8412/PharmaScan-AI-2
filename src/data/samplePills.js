// High-Resolution Synthetic Sample Image Generators for Presentation Demo

function createSampleCanvas(width, height, drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, width, height);
  return canvas.toDataURL('image/png');
}

// 1. Authentic Paracetamol 500mg (Pill)
export function getAuthenticParacetamolImage() {
  return createSampleCanvas(400, 400, (ctx, w, h) => {
    // Dark medical background grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    
    // Draw grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for(let i=0; i<w; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
    }

    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 12;

    // Pill Base (Clean smooth white circle)
    const cx = w/2, cy = h/2, r = 110;
    const grad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.7, '#f8fafc');
    grad.addColorStop(1, '#e2e8f0');

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Bevel ring
    ctx.beginPath();
    ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Score line
    ctx.beginPath();
    ctx.moveTo(cx - 70, cy);
    ctx.lineTo(cx + 70, cy);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // GSK Imprint Engraving
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('GSK 500', cx, cy - 30);
    ctx.fillText('PARA', cx, cy + 45);
  });
}

// 2. Counterfeit Paracetamol 500mg (Pill with defects)
export function getCounterfeitParacetamolImage() {
  return createSampleCanvas(400, 400, (ctx, w, h) => {
    // Dark medical background grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for(let i=0; i<w; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
    }

    const cx = w/2, cy = h/2, r = 110;

    // Distorted irregular pill outline (rough / chipped edge)
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;

    // Yellowish discolored degraded gradient
    const grad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, r);
    grad.addColorStop(0, '#fef08a'); // Dull yellow tint
    grad.addColorStop(0.5, '#eab308'); 
    grad.addColorStop(1, '#ca8a04');

    ctx.beginPath();
    // Create chipped edge by jittering points
    const points = 120;
    for(let i=0; i<=points; i++) {
      const angle = (i / points) * Math.PI * 2;
      // Introduce synthetic edge erosion / chipping noise
      let jitter = 0;
      if (angle > 0.5 && angle < 1.2) jitter = -14 + Math.random() * 8; // Major chip notch!
      else if (angle > 3.0 && angle < 3.8) jitter = -10 + Math.random() * 5;
      else jitter = (Math.sin(angle * 12) * 3);

      const radius = r + jitter;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Add chemical blotches / dark specks (impurities)
    ctx.fillStyle = '#854d0e';
    for(let k=0; k<18; k++) {
      const bx = cx + (Math.random() - 0.5) * 140;
      const by = cy + (Math.random() - 0.5) * 140;
      ctx.beginPath();
      ctx.arc(bx, by, 1.5 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Blurred / Misaligned Imprint Engraving
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillStyle = '#713f12';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(cx + 8, cy - 20);
    ctx.rotate(0.12); // Slanted misaligned stamp
    ctx.fillText('GSK 500', 0, 0);
    ctx.restore();

    // Misaligned crooked score line
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy + 15);
    ctx.lineTo(cx + 60, cy + 35);
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 4.5;
    ctx.stroke();
  });
}

// 3. Authentic Amoxicillin 500mg Capsule
export function getAuthenticAmoxicillinImage() {
  return createSampleCanvas(400, 400, (ctx, w, h) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const cx = w/2, cy = h/2;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 6); // Diagonal presentation

    // Capsule dimensions
    const capWidth = 80;
    const capHeight = 220;
    const radius = 40;

    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 15;

    // Top half: Scarlet Red (#dc2626)
    ctx.beginPath();
    ctx.arc(0, -capHeight/2 + radius, radius, Math.PI, 0);
    ctx.lineTo(radius, 0);
    ctx.lineTo(-radius, 0);
    ctx.closePath();
    const redGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
    redGrad.addColorStop(0, '#ef4444');
    redGrad.addColorStop(0.3, '#f87171');
    redGrad.addColorStop(0.8, '#dc2626');
    redGrad.addColorStop(1, '#991b1b');
    ctx.fillStyle = redGrad;
    ctx.fill();

    // Bottom half: Vivid Gold Yellow (#eab308)
    ctx.beginPath();
    ctx.arc(0, capHeight/2 - radius, radius, 0, Math.PI);
    ctx.lineTo(-radius, 0);
    ctx.lineTo(radius, 0);
    ctx.closePath();
    const yellowGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
    yellowGrad.addColorStop(0, '#fde047');
    yellowGrad.addColorStop(0.4, '#facc15');
    yellowGrad.addColorStop(0.8, '#eab308');
    yellowGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = yellowGrad;
    ctx.fill();

    ctx.shadowBlur = 0;

    // Middle Precision Seam Ring
    ctx.beginPath();
    ctx.rect(-radius - 1, -4, (radius * 2) + 2, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();

    // Gloss Reflection Highlight Line
    ctx.beginPath();
    ctx.moveTo(-radius + 12, -capHeight/2 + 25);
    ctx.lineTo(-radius + 12, capHeight/2 - 25);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Print Text "AMOX 500"
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('AMOX 500', 0, -40);

    ctx.fillStyle = '#0f172a';
    ctx.fillText('SANDOZ', 0, 45);

    ctx.restore();
  });
}

// 4. Counterfeit Amoxicillin 500mg Capsule
export function getCounterfeitAmoxicillinImage() {
  return createSampleCanvas(400, 400, (ctx, w, h) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const cx = w/2, cy = h/2;
    
    ctx.save();
    ctx.translate(cx + 5, cy - 10);
    ctx.rotate(-Math.PI / 5);

    const capHeight = 215;
    const radius = 39;

    // Dull discolored Top Half (Faded brownish red)
    ctx.beginPath();
    ctx.arc(0, -capHeight/2 + radius, radius, Math.PI, 0);
    ctx.lineTo(radius, 0);
    ctx.lineTo(-radius, 0);
    ctx.closePath();
    const redGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
    redGrad.addColorStop(0, '#991b1b');
    redGrad.addColorStop(0.5, '#7f1d1d');
    redGrad.addColorStop(1, '#450a0a');
    ctx.fillStyle = redGrad;
    ctx.fill();

    // Uneven Body Misalignment: Bottom half offset by +6px
    ctx.beginPath();
    ctx.arc(6, capHeight/2 - radius, radius, 0, Math.PI);
    ctx.lineTo(-radius + 6, 0);
    ctx.lineTo(radius + 6, 0);
    ctx.closePath();
    const yellowGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
    yellowGrad.addColorStop(0, '#ca8a04');
    yellowGrad.addColorStop(0.5, '#854d0e');
    yellowGrad.addColorStop(1, '#713f12');
    ctx.fillStyle = yellowGrad;
    ctx.fill();

    // Rough distorted middle seam
    ctx.beginPath();
    ctx.moveTo(-radius - 5, 0);
    ctx.lineTo(radius + 10, 5);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Smudged blurred text
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('AMX 500', -5, -45); // Typo "AMX"

    ctx.restore();
  });
}

// 5. Authentic Augmentin Packaging Box
export function getAuthenticAugmentinBoxImage() {
  return createSampleCanvas(400, 400, (ctx, w, h) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Box Container
    const bx = 40, by = 50, bw = 320, bh = 300;
    
    // Clean White Packaging Card
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 12);
    ctx.fill();

    // Blue & Orange Branding Bar
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(bx, by, bw, 65);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(bx, by + 65, bw, 8);

    // GSK Brand Logo
    ctx.font = '800 24px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('gsk', bx + 20, by + 42);

    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('GlaxoSmithKline', bx + 70, by + 42);

    // Product Title
    ctx.font = '800 32px Inter, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('Augmentin', bx + 20, by + 120);

    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillStyle = '#0284c7';
    ctx.fillText('625 mg', bx + 215, by + 120);

    // Active ingredient subtitle
    ctx.font = '500 13px Inter, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('Amoxicillin & Clavulanate Potassium Tablets', bx + 20, by + 145);

    // GS1 DataMatrix / Barcode Simulation
    ctx.fillStyle = '#0f172a';
    for(let i=0; i<35; i++) {
      const barX = bx + 20 + i * 5;
      const width = (i % 3 === 0) ? 3 : 1.5;
      ctx.fillRect(barX, by + 180, width, 55);
    }

    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#334155';
    ctx.fillText('(01)05012345678901(17)270831(10)BN9842', bx + 20, by + 250);

    ctx.fillStyle = '#16a34a';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText('✓ Rx Only  • 10 Film-Coated Tablets', bx + 20, by + 280);
  });
}

// 6. Counterfeit Augmentin Box Packaging (With Typo & Bad Font)
export function getCounterfeitAugmentinBoxImage() {
  return createSampleCanvas(400, 400, (ctx, w, h) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const bx = 40, by = 50, bw = 320, bh = 300;
    
    // Slightly discolored gray/cream Box Container
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 12);
    ctx.fill();

    // Off-color Branding Bar (Purpleish blue mismatch)
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(bx, by, bw, 65);
    ctx.fillStyle = '#ef4444'; // Red bar instead of orange
    ctx.fillRect(bx, by + 65, bw, 8);

    // Misspelled logo / font mismatch
    ctx.font = 'bold 20px "Comic Sans MS", cursive, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('GSK Pharma', bx + 20, by + 42);

    // Misspelled Product Title: "Augmentn" missing 'i'!
    ctx.font = '800 30px serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('Augmentn', bx + 20, by + 120); // Missing 'i'!

    ctx.font = '600 18px sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('625 mg', bx + 215, by + 120);

    ctx.font = '500 12px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Amoxicilin & Clavulanate Tablets', bx + 20, by + 145); // Misspelled Amoxicillin

    // Damaged / Invalid Barcode
    ctx.fillStyle = '#475569';
    for(let i=0; i<25; i++) {
      const barX = bx + 20 + i * 7;
      ctx.fillRect(barX, by + 180, 4, 50);
    }

    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('INVALID GS1 CHECKSUM (ERR_99)', bx + 20, by + 250);

    ctx.fillStyle = '#b91c1c';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText('⚠️ UNVERIFIED BATCH LOG', bx + 20, by + 280);
  });
}

// Sample Gallery List for Presentation Demo
export const DEMO_SAMPLE_PILLS = [
  {
    id: 'sample-para-authentic',
    name: 'Authentic Paracetamol 500mg',
    type: 'Pill',
    expectedVerdict: 'AUTHENTIC',
    benchmarkId: 'paracetamol-500',
    getImage: getAuthenticParacetamolImage,
    description: 'Genuine round white GSK pill with smooth bevel, clear score line, and correct color vector.'
  },
  {
    id: 'sample-para-counterfeit',
    name: 'Counterfeit Paracetamol 500mg',
    type: 'Pill',
    expectedVerdict: 'COUNTERFEIT',
    benchmarkId: 'paracetamol-500',
    getImage: getCounterfeitParacetamolImage,
    description: 'Fake pill exhibiting yellowed discoloration, chipped crumbly edges, impurity specks, and slanted stamp.'
  },
  {
    id: 'sample-amox-authentic',
    name: 'Authentic Amoxicillin 500mg Capsule',
    type: 'Capsule',
    expectedVerdict: 'AUTHENTIC',
    benchmarkId: 'amoxicillin-500',
    getImage: getAuthenticAmoxicillinImage,
    description: 'High-grade bicolor scarlet/yellow capsule with glossy finish and centered Sandoz imprint.'
  },
  {
    id: 'sample-amox-counterfeit',
    name: 'Counterfeit Amoxicillin 500mg Capsule',
    type: 'Capsule',
    expectedVerdict: 'COUNTERFEIT',
    benchmarkId: 'amoxicillin-500',
    getImage: getCounterfeitAmoxicillinImage,
    description: 'Fake capsule with dull discolored body, severe seam offset (+6px misalignment), and smudged typo imprint.'
  },
  {
    id: 'sample-aug-authentic',
    name: 'Authentic Augmentin 625 Box',
    type: 'Box Packaging',
    expectedVerdict: 'AUTHENTIC',
    benchmarkId: 'augmentin-625',
    getImage: getAuthenticAugmentinBoxImage,
    description: 'Official GSK box with crisp typography, valid GS1 DataMatrix syntax, and verified batch code.'
  },
  {
    id: 'sample-aug-counterfeit',
    name: 'Counterfeit Augmentin 625 Box',
    type: 'Box Packaging',
    expectedVerdict: 'COUNTERFEIT',
    benchmarkId: 'augmentin-625',
    getImage: getCounterfeitAugmentinBoxImage,
    description: 'Counterfeit box featuring misspelled "Augmentn" (missing i), wrong font family, and unverified barcode.'
  }
];
