// Authentic Medicine Reference Database & Pharmacovigilance Registry

export const MEDICINE_REGISTRY = {
  "paracetamol-500": {
    id: "paracetamol-500",
    brandName: "Paracetamol / Acetaminophen 500mg",
    category: "Analgesic & Antipyretic",
    manufacturer: "GSK Healthcare / Standard Pharma",
    activeIngredient: "Paracetamol (500mg)",
    form: "Tablet",
    standardDimensions: "12.5mm Round / Smooth Bevel",
    colorSpec: { h: 0, s: 0, l: 96, name: "Pure White" }, // Bright clean white
    tolerance: {
      hueMaxDev: 15,
      saturationMax: 12, // Max allowed discoloration
      circularityMin: 0.85, // Smooth circle
      laplacianEdgeMax: 35.0, // Low edge roughness (not crumbly)
      glossMin: 60
    },
    dosage: "1-2 tablets every 4-6 hours as needed. Maximum 4000mg per 24 hours.",
    indications: "Fever reduction, mild to moderate pain relief (headache, toothache, muscle aches).",
    contraindications: "Severe hepatic impairment or severe active liver disease.",
    sideEffects: "Rare: skin rash, nausea. Overdose causes severe hepatotoxicity.",
    storage: "Store below 30°C in a dry place away from direct light.",
    counterfeitRiskAlert: "High risk: Common fake versions contain chalk/starch binders without active drug, causing persistent untreated fevers."
  },
  "amoxicillin-500": {
    id: "amoxicillin-500",
    brandName: "Amoxicillin 500mg Capsule",
    category: "Broad-Spectrum Antibiotic (Penicillin)",
    manufacturer: "Sandoz / Teva Pharmaceuticals",
    activeIngredient: "Amoxicillin Trihydrate (500mg)",
    form: "Bicolor Hard Gelatin Capsule",
    standardDimensions: "Size 0 Capsule (21.7mm length)",
    colorSpec: { h: 350, s: 80, l: 45, name: "Scarlet Red / Gold Yellow" }, // Bicolor
    tolerance: {
      hueMaxDev: 20,
      saturationMax: 85,
      circularityMin: 0.65, // Elongated capsule
      laplacianEdgeMax: 40.0,
      glossMin: 70
    },
    dosage: "500mg every 8 hours for 7-10 days as prescribed by physician.",
    indications: "Bacterial infections: respiratory tract, otitis media, skin & soft tissue infections.",
    contraindications: "Hypersensitivity to beta-lactam antibiotics (penicillins/cephalosporins).",
    sideEffects: "Diarrhea, nausea, skin rash, oral candidiasis.",
    storage: "Keep tightly closed in cool dry place below 25°C.",
    counterfeitRiskAlert: "Critical risk: Fake capsules often contain sub-therapeutic dosage or flour, leading to severe antibiotic resistance and sepsis."
  },
  "augmentin-625": {
    id: "augmentin-625",
    brandName: "Augmentin 625mg (Amoxicillin + Clavulanic Acid)",
    category: "Beta-lactamase Inhibitor Combination",
    manufacturer: "GlaxoSmithKline (GSK)",
    activeIngredient: "Amoxicillin (500mg) + Clavulanate Potassium (125mg)",
    form: "Film-Coated Oval Tablet with Score Line",
    standardDimensions: "20mm Oval / Engraved 'AC'",
    colorSpec: { h: 40, s: 15, l: 90, name: "Off-White / Cream Film Coat" },
    tolerance: {
      hueMaxDev: 12,
      saturationMax: 20,
      circularityMin: 0.70,
      laplacianEdgeMax: 30.0,
      glossMin: 65
    },
    dosage: "1 tablet (625mg) twice daily at the start of a meal to minimize GI intolerance.",
    indications: "Sinusitis, pneumonia, urinary tract infections, severe skin infections.",
    contraindications: "History of Augmentin-associated cholestatic jaundice or hepatic dysfunction.",
    sideEffects: "Mucocutaneous candidiasis, diarrhea, vomiting, transient leukopenia.",
    storage: "Store in original moisture-proof foil blister pack below 25°C.",
    counterfeitRiskAlert: "Severe risk: Counterfeit Augmentin is heavily targeted in counterfeit markets with missing moisture barrier foil."
  },
  "lipitor-20": {
    id: "lipitor-20",
    brandName: "Lipitor 20mg (Atorvastatin Calcium)",
    category: "HMG-CoA Reductase Inhibitor (Statin)",
    manufacturer: "Pfizer / Viatris",
    activeIngredient: "Atorvastatin Calcium (20mg)",
    form: "Film-Coated Elliptic Tablet",
    standardDimensions: "9.5mm Elliptical / Engraved 'PD 156'",
    colorSpec: { h: 210, s: 5, l: 95, name: "Crisp White Film Coated" },
    tolerance: {
      hueMaxDev: 10,
      saturationMax: 10,
      circularityMin: 0.78,
      laplacianEdgeMax: 25.0,
      glossMin: 80
    },
    dosage: "20mg once daily at any time of day, with or without food.",
    indications: "Hypercholesterolemia, reduction of cardiovascular disease & stroke risk.",
    contraindications: "Active liver disease, unexplained persistent elevations of serum transaminases, pregnancy.",
    sideEffects: "Nasopharyngitis, arthralgia, diarrhea, myalgia, elevated blood glucose.",
    storage: "Store controlled room temperature 20°C to 25°C.",
    counterfeitRiskAlert: "High risk: Counterfeit Lipitor has caused serious clinical cardiovascular events due to zero active drug."
  }
};
