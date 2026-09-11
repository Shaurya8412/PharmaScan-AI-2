"""
PharmaScan - Synthetic Sample Image Generator for Python Presentation Demo
"""

import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_authentic_paracetamol():
    """Generates authentic round smooth white Paracetamol tablet with crisp engraving."""
    w, h = 400, 400
    img = Image.new('RGB', (w, h), (15, 23, 42)) # Dark slate background
    draw = ImageDraw.Draw(img)

    # Draw grid background lines
    for x in range(0, w, 40):
        draw.line([(x, 0), (x, h)], fill=(30, 41, 59), width=1)
        draw.line([(0, x), (w, x)], fill=(30, 41, 59), width=1)

    # Shadow
    draw.ellipse([85, 95, 315, 325], fill=(5, 10, 20))

    # Pill Base (Smooth clean white circle)
    cx, cy, r = 200, 200, 110
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(248, 250, 252), outline=(203, 213, 225), width=3)

    # Score line
    draw.line([(cx - 70, cy), (cx + 70, cy)], fill=(148, 163, 184), width=4)

    # Engraving text
    try:
        font = ImageFont.truetype("arial.ttf", 22)
    except IOError:
        font = ImageFont.load_default()

    draw.text((cx, cy - 35), "GSK 500", fill=(100, 116, 139), font=font, anchor="mm")
    draw.text((cx, cy + 40), "PARA", fill=(100, 116, 139), font=font, anchor="mm")

    return img

def generate_counterfeit_paracetamol():
    """Generates counterfeit Paracetamol tablet: yellowed discoloration, chipped crumbly edges, blotches."""
    w, h = 400, 400
    img = Image.new('RGB', (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)

    for x in range(0, w, 40):
        draw.line([(x, 0), (x, h)], fill=(30, 41, 59), width=1)
        draw.line([(0, x), (w, x)], fill=(30, 41, 59), width=1)

    cx, cy, r = 200, 200, 110

    # Polygon outline with synthetic chipped edge noise
    points = []
    num_pts = 100
    np.random.seed(42)
    for i in range(num_pts):
        angle = (i / num_pts) * 2 * math.pi
        jitter = 0
        if 0.5 < angle < 1.2:
            jitter = -15 + np.random.uniform(-3, 3) # Major chip notch!
        elif 3.0 < angle < 3.8:
            jitter = -12 + np.random.uniform(-2, 2)
        else:
            jitter = np.sin(angle * 10) * 3

        radius = r + jitter
        px = cx + math.cos(angle) * radius
        py = cy + math.sin(angle) * radius
        points.append((px, py))

    # Fill discolored yellowed pill (#fef08a -> #eab308)
    draw.polygon(points, fill=(254, 240, 138), outline=(202, 138, 4), width=3)

    # Chemical blotches / foreign specks
    for _ in range(25):
        bx = cx + np.random.uniform(-80, 80)
        by = cy + np.random.uniform(-80, 80)
        br = np.random.uniform(2, 5)
        draw.ellipse([bx - br, by - br, bx + br, by + br], fill=(133, 77, 14))

    # Misaligned slanted score line
    draw.line([(cx - 65, cy + 15), (cx + 60, cy + 35)], fill=(161, 98, 7), width=5)

    # Smudged misaligned imprint text
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except IOError:
        font = ImageFont.load_default()

    draw.text((cx + 10, cy - 25), "GSK 500", fill=(113, 63, 18), font=font, anchor="mm")

    return img

def generate_authentic_amoxicillin():
    """Generates authentic bicolor scarlet red & gold yellow capsule."""
    w, h = 400, 400
    img = Image.new('RGB', (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)

    for x in range(0, w, 40):
        draw.line([(x, 0), (x, h)], fill=(30, 41, 59), width=1)
        draw.line([(0, x), (w, x)], fill=(30, 41, 59), width=1)

    # Bicolor Capsule
    # Top Half: Scarlet Red
    draw.rectangle([160, 90, 240, 200], fill=(220, 38, 38))
    draw.ellipse([160, 50, 240, 130], fill=(220, 38, 38))

    # Bottom Half: Gold Yellow
    draw.rectangle([160, 200, 240, 310], fill=(234, 179, 8))
    draw.ellipse([160, 270, 240, 350], fill=(234, 179, 8))

    # Middle Seam
    draw.line([(158, 200), (242, 200)], fill=(255, 255, 255), width=3)

    # Imprint
    try:
        font = ImageFont.truetype("arial.ttf", 16)
    except IOError:
        font = ImageFont.load_default()

    draw.text((200, 140), "AMOX 500", fill=(255, 255, 255), font=font, anchor="mm")
    draw.text((200, 260), "SANDOZ", fill=(15, 23, 42), font=font, anchor="mm")

    return img

def generate_counterfeit_amoxicillin():
    """Generates counterfeit capsule: dull discolored body, severe seam offset misalignment (+6px)."""
    w, h = 400, 400
    img = Image.new('RGB', (w, h), (15, 23, 42))
    draw = ImageDraw.Draw(img)

    for x in range(0, w, 40):
        draw.line([(x, 0), (x, h)], fill=(30, 41, 59), width=1)
        draw.line([(0, x), (w, x)], fill=(30, 41, 59), width=1)

    # Dull dark red top
    draw.rectangle([160, 90, 240, 200], fill=(127, 29, 29))
    draw.ellipse([160, 50, 240, 130], fill=(127, 29, 29))

    # Misaligned bottom half (+8px horizontal offset!)
    draw.rectangle([168, 200, 248, 310], fill=(161, 98, 7))
    draw.ellipse([168, 270, 248, 350], fill=(161, 98, 7))

    # Rough crooked seam
    draw.line([(155, 198), (250, 205)], fill=(239, 68, 68), width=5)

    try:
        font = ImageFont.truetype("arial.ttf", 15)
    except IOError:
        font = ImageFont.load_default()

    draw.text((195, 140), "AMX 500", fill=(200, 200, 200), font=font, anchor="mm")

    return img

def get_demo_samples():
    """Returns list of demo samples with pre-generated images."""
    return [
        {
            "id": "sample-para-authentic",
            "name": "Authentic Paracetamol 500mg",
            "type": "Tablet",
            "expected_verdict": "AUTHENTIC",
            "benchmark_id": "paracetamol-500",
            "generator": generate_authentic_paracetamol,
            "description": "Genuine round smooth white GSK pill with clear score line and perfect circularity."
        },
        {
            "id": "sample-para-counterfeit",
            "name": "Counterfeit Paracetamol 500mg",
            "type": "Tablet",
            "expected_verdict": "COUNTERFEIT",
            "benchmark_id": "paracetamol-500",
            "generator": generate_counterfeit_paracetamol,
            "description": "Fake pill exhibiting yellowed discoloration, chipped crumbly edges, and impurity specks."
        },
        {
            "id": "sample-amox-authentic",
            "name": "Authentic Amoxicillin 500mg Capsule",
            "type": "Capsule",
            "expected_verdict": "AUTHENTIC",
            "benchmark_id": "amoxicillin-500",
            "generator": generate_authentic_amoxicillin,
            "description": "High-grade bicolor scarlet/yellow capsule with glossy finish and centered Sandoz imprint."
        },
        {
            "id": "sample-amox-counterfeit",
            "name": "Counterfeit Amoxicillin 500mg Capsule",
            "type": "Capsule",
            "expected_verdict": "COUNTERFEIT",
            "benchmark_id": "amoxicillin-500",
            "generator": generate_counterfeit_amoxicillin,
            "description": "Fake capsule with dull discolored body, severe seam offset (+8px misalignment), and smudged typo imprint."
        }
    ]
