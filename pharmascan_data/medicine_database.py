"""
PharmaScan AI - Enterprise Pharmaceutical Reference Specification Framework
Universal inspection framework without hardcoded legacy sample entries.
"""

DEFAULT_SPEC = {
    "id": "general-inspection",
    "brand_name": "General Pharmaceutical Inspection",
    "category": "Optical & Packaging Quality Verification",
    "fda_ndc_code": "GENERAL-VERIFY",
    "gs1_gtin": "00000000000000",
    "manufacturer": "Standard Pharmaceutical",
    "active_ingredient": "Active Pharmaceutical Ingredient (API)",
    "form": "Solid Oral Dosage / Packaging",
    "shape_type": "Universal Standard",
    "dimensions": {
        "shape_classification": "Packaging & Surface Analysis",
        "aspect_ratio": 1.0,
        "thickness_mm": 4.0,
        "average_weight_mg": 500.0,
        "engraving_stamp": "STANDARD IMPRINT",
        "score_line": "Standard Inspection"
    },
    "color_spec": {
        "h": 0, "s": 0, "l": 90,
        "is_bicolor": False,
        "hex_target": "#FFFFFF",
        "color_name": "Standard Inspection Profile"
    },
    "tolerance": {
        "hue_max_dev": 180,
        "saturation_max": 100,
        "circularity_min": 0.15,
        "circularity_max": 1.00,
        "laplacian_edge_max": 5000.0,
        "gloss_min": 50
    },
    "dosage": "Inspect physical package integrity, tamper-evident seals, and optical print resolution.",
    "indications": "Point-of-care optical inspection for counterfeit screening and package integrity.",
    "contraindications": "Verify batch number and expiry integrity before clinical dispensing.",
    "side_effects": "N/A — Optical Analysis Module.",
    "storage": "Store captured inspection frames in local audit trail.",
    "counterfeit_risk_alert": "Suspect counterfeit packaging detected by optical anomaly analysis or neural feature deviations."
}

ASPIRIN_SPEC = {
    "id": "aspirin-325",
    "brand_name": "Aspirin 325mg (Acetylsalicylic Acid)",
    "category": "NSAID / Analgesic & Antiplatelet",
    "fda_ndc_code": "67777-157-01",
    "gs1_gtin": "00367777157016",
    "manufacturer": "Reckitt Benckiser (Disprin) / Bayer Healthcare / LNK International / Perrigo",
    "active_ingredient": "Aspirin / Acetylsalicylic Acid (325mg)",
    "form": "Round Bi-Convex Tablet",
    "shape_type": "Round Tablet",
    "dimensions": {
        "shape_classification": "Round Bi-Convex Tablet (1:1 Ratio)",
        "diameter_mm": 10.30,
        "diameter_tolerance_mm": 0.20,
        "thickness_mm": 3.90,
        "thickness_tolerance_mm": 0.15,
        "average_weight_mg": 375.0,
        "aspect_ratio": 1.00,
        "bevel_angle_deg": 40,
        "engraving_stamp": "DISPRIN (Embossed Emblem & Score) / ASPIRIN (Radial Deboss) / '44 157' / 'A1' / 'A2'",
        "score_line": "Single Central Transverse Score or Debossed Disprin Cross-Sword Line"
    },
    "color_spec": {
        "h": 0, "s": 0, "l": 96,
        "is_bicolor": False,
        "hex_target": "#F8FAFC",
        "color_name": "USP Pure White (Standard Solid Dosage)"
    },
    "tolerance": {
        "hue_max_dev": 30,
        "saturation_max": 25,
        "circularity_min": 0.85,
        "circularity_max": 1.00,
        "laplacian_edge_max": 3800.0,
        "gloss_min": 65
    },
    "dosage": "325mg to 650mg orally every 4 to 6 hours as needed (Max 4000mg/day). In suspected Acute Coronary Syndrome (heart attack): chew 325mg non-enteric aspirin immediately.",
    "indications": "Mild-to-moderate pain, fever reduction, acute myocardial infarction, stroke prophylaxis, anti-inflammatory treatment for osteoarthritis and rheumatoid arthritis.",
    "contraindications": "Active gastrointestinal bleeding, severe peptic ulcer disease, hemophilia or bleeding diathesis, pediatric patients with viral syndromes (risk of Reye's Syndrome), known hypersensitivity to NSAIDs.",
    "side_effects": "Gastric irritation, nausea, dyspepsia, prolonged prothrombin time, tinnitus in elevated doses, occult GI bleeding.",
    "storage": "Store at controlled room temperature 20°C - 25°C (68°F - 77°F). Protect from moisture and heat. Discard if strong acetic (vinegar) odor is detected.",
    "counterfeit_risk_alert": "Critical risk: Substandard and counterfeit aspirin batches frequently contain chalk or starch binders with zero active acetylsalicylic acid, creating life-threatening failure of antiplatelet cardioprotection in cardiac patients.",
    "image_references": [
        {
            "filename": "aspirin_disprin_debossed.png",
            "title": "Disprin Soluble Aspirin Tablet // Debossed Emblem & Score Line",
            "description": "Authentic Disprin soluble aspirin tablet featuring centered uppercase 'DISPRIN' engraving, distinctive upper sword/hilt emblem, and lower vertical score line."
        },
        {
            "filename": "aspirin_plain_reverse.png",
            "title": "Aspirin / Disprin Round Tablet // Smooth Reverse Face",
            "description": "Uniform matte white reverse face of round bi-convex aspirin tablet demonstrating intact perimeter bevel, standard reflectivity, and zero chalky friability degradation."
        },
        {
            "filename": "aspirin_44_157_dual.png",
            "title": "Aspirin 325mg Dual-Face // Imprint 44 157",
            "description": "Round bi-convex tablet showing radial 'ASPIRIN' debossed uppercase lettering on obverse, with manufacturer imprint '44' over '157' on reverse."
        },
        {
            "filename": "aspirin_scored_tablet.png",
            "title": "Aspirin Tablet // Central Score Calibration",
            "description": "Single transverse central functional score line for split-dosing calibration on authentic round pharmaceutical substrate."
        },
        {
            "filename": "aspirin_a1_dual.png",
            "title": "Aspirin Tablet // Radial Imprint & 'A1' Identifier",
            "description": "Macro inspection of perimeter radial 'ASPIRIN' engraving paired with authentic 'A1' batch verification code."
        },
        {
            "filename": "aspirin_embossed_pair.png",
            "title": "Aspirin Solid Oral Dosage // Bevel & Relief Angle",
            "description": "Dual perspective showcasing 40° edge chamfer, high-contrast debossing depth, and clean edge contour without friability erosion."
        },
        {
            "filename": "aspirin_comparison_chart.png",
            "title": "Aspirin Regulatory Reference Matrix // Imprint Variants",
            "description": "FDA & NDC standard reference comparison showing legitimate imprint variants ('A2' vs '44 157') across approved manufacturing lines."
        }
    ]
}

MEDICINE_REGISTRY = {
    "aspirin-325": ASPIRIN_SPEC
}
