"""
PharmaScan AI - PDF Certificate Generator
Generates clean, official PDF Verification Certificates.
"""

import io
import datetime
import hashlib
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf_report(prediction_result):
    """
    Generates an official PharmaScan AI Verification Certificate (PDF).
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36, leftMargin=36,
        topMargin=36, bottomMargin=36
    )

    story = []
    styles = getSampleStyleSheet()

    raw_str = f"{prediction_result.get('timestamp')}_{prediction_result.get('verdict')}_{prediction_result.get('authenticity_score')}"
    sha256_hash = hashlib.sha256(raw_str.encode('utf-8')).hexdigest()[:24].upper()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        alignment=0
    )

    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#475569')
    )

    # 1. Header Banner
    story.append(Paragraph("<b>PHARMASCAN AI VERIFICATION CERTIFICATE</b>", title_style))
    story.append(Paragraph(f"Counterfeit Medicine Diagnostic Report • SHA-256 Hash: <code>{sha256_hash}</code>", sub_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#06b6d4'), spaceAfter=12))

    # 2. Verdict Banner
    verdict = prediction_result.get("verdict", "AUTHENTIC")
    score = prediction_result.get("authenticity_score", 0)

    if verdict == "AUTHENTIC":
        badge_bg = colors.HexColor('#dcfce7')
        badge_fg = colors.HexColor('#166534')
    elif verdict == "SUSPICIOUS":
        badge_bg = colors.HexColor('#fef3c7')
        badge_fg = colors.HexColor('#92400e')
    else:
        badge_bg = colors.HexColor('#fee2e2')
        badge_fg = colors.HexColor('#991b1b')

    verdict_text = f"<b>DIAGNOSTIC RESULT: {verdict} ({score}% CONFIDENCE SCORE)</b>"
    verdict_style = ParagraphStyle('Verdict', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, textColor=badge_fg, alignment=1)

    verdict_table = Table([[Paragraph(verdict_text, verdict_style)]], colWidths=[540])
    verdict_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), badge_bg),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 8),
        ('BOX', (0,0), (-1,-1), 1.5, badge_fg)
    ]))
    story.append(verdict_table)
    story.append(Spacer(1, 12))

    # 3. Product & Specification Information
    med_info = prediction_result.get("medicine_info", {})
    dim_specs = med_info.get("dimensions", {})

    info_data = [
        [Paragraph("<b>Brand Name:</b>", styles['Normal']), Paragraph(med_info.get("brand_name", "N/A"), styles['Normal'])],
        [Paragraph("<b>FDA NDC Code:</b>", styles['Normal']), Paragraph(f"<code>{med_info.get('fda_ndc_code', 'N/A')}</code>", styles['Normal'])],
        [Paragraph("<b>GS1 GTIN Code:</b>", styles['Normal']), Paragraph(f"<code>{med_info.get('gs1_gtin', 'N/A')}</code>", styles['Normal'])],
        [Paragraph("<b>Active Ingredient:</b>", styles['Normal']), Paragraph(med_info.get("active_ingredient", "N/A"), styles['Normal'])],
        [Paragraph("<b>Physical Form & Stamp:</b>", styles['Normal']), Paragraph(f"{med_info.get('form', 'N/A')} (Stamp: {dim_specs.get('engraving_stamp', 'Standard')})", styles['Normal'])],
        [Paragraph("<b>Timestamp:</b>", styles['Normal']), Paragraph(prediction_result.get("timestamp", datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")), styles['Normal'])]
    ]

    info_table = Table(info_data, colWidths=[150, 390])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 5)
    ]))
    story.append(info_table)
    story.append(Spacer(1, 14))

    # 4. Neural & Visual Descriptor Metrics Table
    story.append(Paragraph("<b>Neural & Computer Vision Descriptor Metrics</b>", styles['Heading2']))
    story.append(Spacer(1, 4))

    feature_scores = prediction_result.get("feature_scores", {})
    feat_data = [[Paragraph("<b>Vector Parameter</b>", styles['Normal']), Paragraph("<b>Confidence Score</b>", styles['Normal']), Paragraph("<b>Status</b>", styles['Normal'])]]

    for k, v in feature_scores.items():
        status_text = "PASSED" if v >= 75 else ("WARNING" if v >= 55 else "FAILED")
        feat_data.append([
            Paragraph(k, styles['Normal']),
            Paragraph(f"{v}%", styles['Normal']),
            Paragraph(f"<b>{status_text}</b>", styles['Normal'])
        ])

    feat_table = Table(feat_data, colWidths=[200, 140, 200])
    feat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 5)
    ]))
    story.append(feat_table)
    story.append(Spacer(1, 14))

    # 5. Risk Factors
    risk_factors = prediction_result.get("risk_factors", [])
    story.append(Paragraph("<b>Detected Visual & Structural Anomalies</b>", styles['Heading3']))
    story.append(Spacer(1, 4))

    if not risk_factors:
        story.append(Paragraph("✓ Zero anomalies detected. Conforms to pharmaceutical benchmark specifications.", styles['Normal']))
    else:
        for rf in risk_factors:
            story.append(Paragraph(f"• <b>[{rf.get('vector')}] ({rf.get('severity')})</b>: {rf.get('detail')}", styles['Normal']))

    story.append(Spacer(1, 20))
    story.append(Paragraph("<i>This document is generated by PharmaScan AI Computer Vision & Deep Learning Engine.</i>", sub_style))

    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()
