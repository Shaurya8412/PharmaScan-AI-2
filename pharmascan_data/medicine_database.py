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

DISPRIN_SPEC = {
    "id": "disprin-350",
    "brand_name": "Disprin",
    "category": "Fast-Acting Analgesic, Antipyretic & Antiplatelet",
    "fda_ndc_code": "DISPRIN-350-SOL",
    "gs1_gtin": "5000158064903",
    "manufacturer": "Reckitt Benckiser Healthcare",
    "active_ingredient": "Aspirin / Acetylsalicylic Acid (350mg)",
    "form": "Soluble Effervescent Tablet",
    "shape_type": "Round Flat Beveled Tablet",
    "dimensions": {
        "shape_classification": "Round Flat Beveled Tablet (1:1 Ratio)",
        "diameter_mm": 12.50,
        "diameter_tolerance_mm": 0.30,
        "thickness_mm": 3.80,
        "thickness_tolerance_mm": 0.20,
        "average_weight_mg": 450.0,
        "aspect_ratio": 1.00,
        "bevel_angle_deg": 35,
        "engraving_stamp": "DISPRIN (Embossed Text) with Sword Emblem & Transverse Score",
        "score_line": "Single Transverse Functional Score Line (Split Dosing)"
    },
    "color_spec": {
        "h": 0, "s": 0, "l": 96,
        "is_bicolor": False,
        "hex_target": "#F8FAFC",
        "color_name": "USP Pure White (Effervescent Solid Dosage)"
    },
    "tolerance": {
        "hue_max_dev": 30,
        "saturation_max": 25,
        "circularity_min": 0.85,
        "circularity_max": 1.00,
        "laplacian_edge_max": 3800.0,
        "gloss_min": 65
    },
    "dosage": "Adults & adolescents 16+ years: 1 to 2 tablets dissolved in half a glass of water every 4 to 6 hours as needed (Maximum 8 tablets / 2800mg in 24 hours). In suspected Acute Coronary Syndrome (heart attack): chew or dissolve 1 tablet immediately without delay.",
    "indications": "Fast-acting relief of headaches, migraine attacks, toothache, neuralgia, sore throat, period pain (dysmenorrhea), fever reduction, cold and influenza symptoms, muscular aches, rheumatic pains, and emergency antiplatelet cardioprotection.",
    "contraindications": "Active gastrointestinal ulceration or bleeding, history of aspirin/NSAID-induced asthma, hemophilia or bleeding diathesis, concurrent anticoagulant therapy without medical supervision, third trimester of pregnancy, and children under 16 years (risk of Reye's Syndrome).",
    "side_effects": "Mild gastric discomfort, nausea, heartburn, increased bleeding tendency, dyspepsia, hypersensitivity reactions (bronchospasm, urticaria).",
    "storage": "Store below 25°C in a dry place. Keep container tightly closed to protect from atmospheric moisture. Do not use if tablets are crumbled or emit a pungent vinegar (acetic) odor.",
    "counterfeit_risk_alert": "Critical safety alert: Counterfeit Disprin batches frequently substitute active acetylsalicylic acid with compressed chalk, plaster of Paris, or industrial starch binders. Counterfeit tablets fail to effervesce/dissolve rapidly in water and deliver zero analgesic or life-saving cardioprotective antiplatelet activity.",
    "image_references": [
        {
            "filename": "aspirin_disprin_debossed.png",
            "title": "Disprin Soluble Tablet // Debossed Brand & Sword Emblem",
            "description": "Authentic Disprin soluble tablet featuring centered uppercase 'DISPRIN' engraving, distinctive upper sword/hilt emblem, and lower vertical score line."
        },
        {
            "filename": "aspirin_plain_reverse.png",
            "title": "Disprin Round Tablet // Smooth Reverse Face",
            "description": "Uniform matte white reverse face of round tablet demonstrating intact perimeter bevel, standard reflectivity, and zero chalky friability degradation."
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
            "description": "FDA & regulatory standard reference comparison showing legitimate imprint variants ('A2' vs '44 157') across approved manufacturing lines."
        }
    ]
}

ASPIRIN_SPEC = DISPRIN_SPEC

MEDICINE_REGISTRY = {
    "disprin-350": DISPRIN_SPEC
}
