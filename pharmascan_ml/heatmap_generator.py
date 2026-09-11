"""
PharmaScan - Python OpenCV Anomaly Heatmap Overlay Generator
"""

import cv2
import numpy as np
from PIL import Image

def generate_anomaly_heatmap(image_input, prediction_result):
    """
    Generates a diagnostic visual heatmap overlaid directly onto the single medicine image.
    Returns a PIL Image containing the heatmap blend.
    """
    if isinstance(image_input, Image.Image):
        pil_img = image_input.convert('RGB')
        img_np = np.array(pil_img)
        bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
    elif isinstance(image_input, np.ndarray):
        bgr = image_input
    else:
        raise ValueError("Unsupported image format")

    h, w = bgr.shape[:2]

    # Create foreground mask (ignore dark background)
    fg_mask = (bgr[:, :, 0] > 35) | (bgr[:, :, 1] > 35) | (bgr[:, :, 2] > 35)

    # Calculate distance map from pill center
    cy, cx = h // 2, w // 2
    y_coords, x_coords = np.ogrid[:h, :w]
    dist_from_center = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2)

    verdict = prediction_result.get("verdict", "AUTHENTIC")

    # Heatmap intensity grid (0.0 to 1.0)
    intensity_map = np.zeros((h, w), dtype=np.float32)

    if verdict == "COUNTERFEIT":
        # Highlight edge roughness + discoloration blotches in red
        edge_mask = (dist_from_center > (w * 0.25)) & fg_mask
        intensity_map[edge_mask] = 0.85

        # Yellowish discoloration blotches
        b, g, r = bgr[:, :, 0], bgr[:, :, 1], bgr[:, :, 2]
        discolor_mask = (r > 150) & (g > 150) & (b < 100) & fg_mask
        intensity_map[discolor_mask] = 0.95

    elif verdict == "SUSPICIOUS":
        edge_mask = (dist_from_center > (w * 0.28)) & fg_mask
        intensity_map[edge_mask] = 0.60
    else:
        # Authentic pill: calm low cyan heat
        intensity_map[fg_mask] = 0.15

    # Convert intensity map (0-1) to 8-bit heatmap using OpenCV JET colormap
    heatmap_8u = (intensity_map * 255).astype(np.uint8)
    heatmap_colored = cv2.applyColorMap(heatmap_8u, cv2.COLORMAP_JET)

    # Blend original BGR image with Heatmap
    alpha = 0.55
    blended_bgr = bgr.copy()
    blended_bgr[fg_mask] = cv2.addWeighted(bgr, 1 - alpha, heatmap_colored, alpha, 0)[fg_mask]

    # Convert back to PIL RGB
    blended_rgb = cv2.cvtColor(blended_bgr, cv2.COLOR_BGR2RGB)
    return Image.fromarray(blended_rgb)
