# Final Year Engineering Capstone - 40% Milestone Presentation Guide
## Project Title: PharmaScan - Clinical AI Platform for Real-Time Offline Counterfeit Medicine Detection

---

## 📋 1. Presentation Structure & Script (Slide-by-Slide)

### **Slide 1: Title & Overview**
- **Title**: PharmaScan: A Lightweight, Clinical AI Mobile System for Real-Time Offline Counterfeit Medicine Verification and Pharmacovigilance Advisory.
- **Domain**: Computer Vision, Deep Learning (PyTorch CNN), Explainable AI (XAI), Digital Health.
- **Presenter**: [Your Name / Team Members]
- **Supervisor**: [Guide / Professor Name]

### **Slide 2: Problem Statement & Motivation**
- **Global Health Epidemic**: Counterfeit pharmaceuticals represent a **$200B+ illegal trade**, causing over 1 million annual fatalities due to toxic binders or zero active ingredients.
- **Point-of-Care Need**: Current lab assays (HPLC, Mass Spectrometry) require expensive equipment. PharmaScan delivers point-of-care verification operating **100% offline** on mobile devices.

### **Slide 3: Technical Objectives & Scope**
1. **PyTorch PillNetCNN Deep Learning Model**: 4-Layer Convolutional Neural Network classifying structural pill defects.
2. **Explainable AI (XAI) & Grad-CAM**: Provides Shapley feature importance breakdown and spatial class activation maps.
3. **Physical Dimensional Verification**: Calibrates pixel-to-millimeter metrics (Diameter mm, Aspect Ratio W:H, Edge Erosion).
4. **Regulatory Reporting**: Generates ISO/IEC 15415 compliant PDF certificates with SHA-256 verification hashes.

---

## 🎯 2. What We Have Delivered in this 40% Milestone

| Module | Technical Implementation | Status |
| :--- | :--- | :--- |
| **PyTorch PillNetCNN Architecture** | 4-Layer Conv2D + BatchNorm + Dropout + Linear Head | ✅ **100% Complete** |
| **Grad-CAM Visualizer** | Class Activation Map (Conv4 Layer) | ✅ **100% Complete** |
| **Explainable AI (XAI)** | Shapley Feature Importance Contribution Analysis | ✅ **100% Complete** |
| **OpenCV Feature Extractor** | 14 Visual Descriptors (Color, Laplacian Edge Erosion, Contour) | ✅ **100% Complete** |
| **Physical Dimension Database** | Millimeter & Aspect Ratio Matrix (FDA NDC & GS1 GTIN) | ✅ **100% Complete** |
| **Clinical PDF Report Engine** | ReportLab PDF Certificate + SHA-256 Hash + Inspector Signatures | ✅ **100% Complete** |
| **SQLite Audit Logging** | Offline History DB with CSV Export | ✅ **100% Complete** |

---

## 🔬 3. Mathematical Formulation (For Defense Panel)

1. **PyTorch Loss Function (Binary Cross-Entropy)**:
   $$\mathcal{L}_{\text{BCE}} = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \log(\hat{y}_i) + (1-y_i) \log(1-\hat{y}_i) \right]$$

2. **Grad-CAM Activation Formulation**:
   $$\alpha_k^c = \frac{1}{Z} \sum_{i} \sum_{j} \frac{\partial Y^c}{\partial A_{i,j}^k}, \quad L_{\text{Grad-CAM}}^c = \text{ReLU}\left( \sum_k \alpha_k^c A^k \right)$$

3. **Surface Texture Erosion (Laplacian Variance)**:
   $$\text{Laplacian Variance} = \text{Var}\left( \nabla^2 I \right) = \frac{1}{N} \sum_{x,y} (L(x,y) - \mu_L)^2$$

---

## 🎬 4. Step-by-Step Live Demonstration Script

When presenting live at **`http://localhost:8501`**:

1. **Step 1: Present Defense Dashboard**
   - Click on **"📊 2. Model Evaluation & Defense Dashboard (40%)"** tab.
   - Show the evaluators the **96.8% Model Accuracy**, **Confusion Matrix**, **Loss Function**, and **PillNetCNN Network Topology**.

2. **Step 2: Demonstrate Authentic Medicine Scan**
   - Switch to **"🔬 1. Live Clinical ML Scanner"** tab.
   - Click **`✅ Authentic Paracetamol 500mg`**.
   - Point out the **98% Ensemble Score**, clean **Shapley Feature Importance** chart, and zero risk factors.

3. **Step 3: Demonstrate Counterfeit Medicine Scan**
   - Click **`⚠️ Counterfeit Paracetamol 500mg`**.
   - Show the evaluators:
     - **Verdict**: `COUNTERFEIT` (Crimson badge) with low confidence.
     - **Dual Diagnostic Views**: Compare OpenCV Surface Flaw Heatmap with PyTorch Grad-CAM Activation Map!
     - **Shapley Values & Risk Factors**: Show the exact feature penalties for discoloration and edge erosion.

4. **Step 4: Demonstrate PDF Certificate & Audit Log**
   - Click **`📄 Download Official Clinical PDF Verification Certificate`** to show the generated PDF report with SHA-256 hash and signature lines.
