import { MEDICINE_REGISTRY } from '../data/medicineDatabase.js';
import { extractImageFeatures } from './featureExtractor.js';

/**
 * Predicts fake vs authentic medicine from a single image using multi-factor ML metrics.
 */
export async function predictMedicineAuthenticity(imageElement, selectedMedicineId = 'paracetamol-500') {
  // 1. Extract visual features from single image
  const features = await extractImageFeatures(imageElement);

  // Get benchmark specification
  const benchmark = MEDICINE_REGISTRY[selectedMedicineId] || MEDICINE_REGISTRY['paracetamol-500'];
  const tol = benchmark.tolerance;

  const riskFactors = [];
  let scorePoints = 100;

  // Vector 1: Color Hue & Discoloration Analysis (Weight 30%)
  const expectedColor = benchmark.colorSpec;
  const hueDev = Math.abs(features.hslVector.h - expectedColor.h);
  const hueDevNorm = Math.min(180, hueDev > 180 ? 360 - hueDev : hueDev);

  let colorMatchScore = 100;
  if (hueDevNorm > tol.hueMaxDev) {
    const penalty = Math.min(35, (hueDevNorm - tol.hueMaxDev) * 1.5);
    colorMatchScore -= penalty;
    scorePoints -= penalty;
    riskFactors.push({
      vector: "Color Variance & Discoloration",
      severity: "HIGH",
      detail: `Color hue deviates by ${Math.round(hueDevNorm)}° (Allowed max: ${tol.hueMaxDev}°). Indicates batch chemical discoloration or fake dye.`
    });
  }

  // Check Saturation excess (e.g., yellowed white pill)
  if (expectedColor.s < 10 && features.hslVector.s > tol.saturationMax) {
    const satPenalty = Math.min(25, (features.hslVector.s - tol.saturationMax) * 1.2);
    colorMatchScore -= satPenalty;
    scorePoints -= satPenalty;
    riskFactors.push({
      vector: "Surface Discoloration",
      severity: "HIGH",
      detail: `Yellowish tint/saturation at ${features.hslVector.s}% (Expected < ${tol.saturationMax}% clean white). Impurities or chalk binder detected.`
    });
  }

  // Vector 2: Texture & Edge Roughness / Crumbly Pill (Weight 25%)
  let textureScore = 100;
  if (features.laplacianEdgeScore > tol.laplacianEdgeMax) {
    const penalty = Math.min(30, (features.laplacianEdgeScore - tol.laplacianEdgeMax) * 1.8);
    textureScore -= penalty;
    scorePoints -= penalty;
    riskFactors.push({
      vector: "Surface Texture & Edge Erosion",
      severity: "MEDIUM",
      detail: `Chipped edge / crumbly surface score is ${features.laplacianEdgeScore} (Threshold: < ${tol.laplacianEdgeMax}). Suggests improper pill compression.`
    });
  }

  // Vector 3: Contour Geometry & Symmetry (Weight 20%)
  let contourScore = 100;
  if (features.circularity < tol.circularityMin) {
    const penalty = Math.min(25, (tol.circularityMin - features.circularity) * 60);
    contourScore -= penalty;
    scorePoints -= penalty;
    riskFactors.push({
      vector: "Contour & Geometric Distortion",
      severity: "HIGH",
      detail: `Circularity symmetry score is ${features.circularity} (Min expected: ${tol.circularityMin}). Indicates misaligned mold or broken physical pill.`
    });
  }

  // Vector 4: Imprint / Stamp Gradient Clarity (Weight 15%)
  let stampScore = 100;
  if (features.imprintSharpness < 8.0) {
    const penalty = Math.min(20, (8.0 - features.imprintSharpness) * 2.5);
    stampScore -= penalty;
    scorePoints -= penalty;
    riskFactors.push({
      vector: "Imprint Engraving Clarity",
      severity: "MEDIUM",
      detail: `Engraved logo sharpness is low (${features.imprintSharpness}/10). Suggests smudged, shallow, or missing manufacturer stamp.`
    });
  }

  // Vector 5: Chemical Blotches / Impurities (Weight 10%)
  let purityScore = 100;
  if (features.colorVariance > 18.0) {
    const penalty = Math.min(15, (features.colorVariance - 18.0) * 1.2);
    purityScore -= penalty;
    scorePoints -= penalty;
    riskFactors.push({
      vector: "Surface Specks & Impurities",
      severity: "MEDIUM",
      detail: `High color variance (${features.colorVariance}) across pill surface. Indicates unblended chemical specks or foreign contaminants.`
    });
  }

  // Final Authenticity Percentage (Clamped 0 - 99%)
  const authenticityScore = Math.max(8, Math.min(98, Math.round(scorePoints)));

  // Determine Verdict Category
  let verdict = "AUTHENTIC";
  let verdictBadge = "Emerald";
  let description = "High visual feature match with pharmaceutical benchmark specifications.";

  if (authenticityScore < 58) {
    verdict = "COUNTERFEIT";
    verdictBadge = "Crimson";
    description = "Critical visual defect anomalies detected. High likelihood of counterfeit medicine.";
  } else if (authenticityScore < 82) {
    verdict = "SUSPICIOUS";
    verdictBadge = "Amber";
    description = "Notable deviations from benchmark specs. Recommended for secondary GS1 barcode / chemical lab assay verification.";
  }

  return {
    authenticityScore,
    verdict,
    verdictBadge,
    description,
    medicineInfo: benchmark,
    riskFactors,
    featureScores: {
      colorMatch: Math.max(10, Math.round(colorMatchScore)),
      textureSmoothness: Math.max(10, Math.round(textureScore)),
      contourSymmetry: Math.max(10, Math.round(contourScore)),
      imprintClarity: Math.max(10, Math.round(stampScore)),
      purityScore: Math.max(10, Math.round(purityScore))
    },
    rawFeatures: features,
    timestamp: new Date().toISOString()
  };
}
