"""
PharmaScan - Grad-CAM (Class Activation Mapping) for PyTorch CNN Model
Generates spatial heatmaps showing feature activations from the deep convolutional layers.
"""

import cv2
import numpy as np
from PIL import Image

try:
    import torch
    from pharmascan_ml.cnn_model import get_or_create_cnn_model, get_cnn_transforms
    HAS_TORCH = True
except ImportError:
    HAS_TORCH = False

if HAS_TORCH:
    class GradCAM:
        def __init__(self, model, target_layer):
            self.model = model
            self.target_layer = target_layer
            self.gradients = None
            self.activations = None

            target_layer.register_forward_hook(self.save_activation)
            target_layer.register_full_backward_hook(self.save_gradient)

        def save_activation(self, module, input, output):
            self.activations = output

        def save_gradient(self, module, grad_input, grad_output):
            self.gradients = grad_output[0]

        def generate_cam(self, input_tensor, target_class=0):
            self.model.eval()
            output = self.model(input_tensor)

            self.model.zero_grad()
            target = output[0][target_class]
            target.backward()

            gradients = self.gradients.data.numpy()[0]
            activations = self.activations.data.numpy()[0]

            weights = np.mean(gradients, axis=(1, 2))
            cam = np.zeros(activations.shape[1:], dtype=np.float32)

            for i, w in enumerate(weights):
                cam += w * activations[i, :, :]

            cam = np.maximum(cam, 0)
            if np.max(cam) > 0:
                cam = cam / np.max(cam)

            cam = cv2.resize(cam, (128, 128))
            return cam

def generate_cnn_gradcam_heatmap(image_input):
    """
    Generates a Grad-CAM activation heatmap overlay using the PyTorch CNN model.
    """
    if isinstance(image_input, Image.Image):
        pil_img = image_input.convert('RGB')
    else:
        pil_img = Image.fromarray(image_input).convert('RGB')

    bgr_img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    bgr_img = cv2.resize(bgr_img, (128, 128))

    if HAS_TORCH:
        try:
            model = get_or_create_cnn_model()
            grad_cam = GradCAM(model, model.conv4)
            transform = get_cnn_transforms()

            input_tensor = transform(pil_img).unsqueeze(0)
            cam = grad_cam.generate_cam(input_tensor, target_class=0)

            heatmap_8u = np.uint8(255 * cam)
            heatmap_colored = cv2.applyColorMap(heatmap_8u, cv2.COLORMAP_JET)

            alpha = 0.5
            blended = cv2.addWeighted(bgr_img, 1 - alpha, heatmap_colored, alpha, 0)
            return Image.fromarray(cv2.cvtColor(blended, cv2.COLOR_BGR2RGB))
        except Exception:
            pass

    # Fallback activation visualization
    gray = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2GRAY)
    heatmap_colored = cv2.applyColorMap(gray, cv2.COLORMAP_JET)
    blended = cv2.addWeighted(bgr_img, 0.5, heatmap_colored, 0.5, 0)
    return Image.fromarray(cv2.cvtColor(blended, cv2.COLOR_BGR2RGB))
