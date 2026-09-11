# PharmaScan AI

**AI-Powered Medicine Inspection, Authentication & Smart Pharmacovigilance Platform**

PharmaScan AI is an offline-capable, computer-vision and deep-learning pharmaceutical screening system designed for rapid point-of-care verification of medicines. It detects physical anomalies, morphological defects, imprint deviations, and counterfeits using multi-modal AI heuristics.

---

## Key Capabilities

- **PyTorch PillNetCNN Deep Feature Extractor**: Extracts 128-dimensional high-fidelity neural embeddings from captured medicine imagery.
- **Ground-Truth Reference Vector Anchoring**: Compares test images against compiled authentic reference anchors (e.g. Aspirin 325mg dual imprint, central score, and chamfer angle profiles) using cosine similarity and HSV chrominance distribution.
- **OpenCV Morphological Analysis**: Computes millimeter-calibrated axis diameters, circularity factor, aspect ratio, and boundary solidity.
- **Dual Visual Activation Diagnostics**: Renders OpenCV surface flaw anomaly heatmaps and PyTorch Grad-CAM neural attention field overlays.
- **Cryptographic Audit Log**: Encrypted local SQLite record keeping with SHA-256 integrity verification.
- **Automated Verification Certificates**: Generates verifiable, downloadable PDF diagnostic certificates via ReportLab.
- **Cinematic Laboratory UI**: Built with Streamlit and an interactive procedural Three.js 3D scanning background with pointer parallax tracking.

---

## Quick Start (Local)

### 1. Prerequisites
- Python 3.10+
- Webcam or image input

### 2. Installation
`ash
git clone https://github.com/Shaurya8412/PharmaScan-AI-2.git
cd PharmaScan-AI-2
pip install -r requirements.txt
`

### 3. Run the Application
`ash
streamlit run app.py
`
The interface will be accessible at http://localhost:8501.

---

## Cloud Deployment Guide

### Deploying on Streamlit Community Cloud (Recommended & Free)
Streamlit apps require persistent WebSocket connections and stateful Python runtimes. **Streamlit Community Cloud** provides native, free one-click hosting:

1. Push this repository to your GitHub account (Shaurya8412/PharmaScan-AI-2).
2. Visit [share.streamlit.io](https://share.streamlit.io) and sign in with GitHub.
3. Click **New App**.
4. Select your repository: Shaurya8412/PharmaScan-AI-2.
5. Set Branch to main and Main file path to pp.py.
6. Click **Deploy!** Your app will be live on a public URL (e.g., https://pharmascan-ai-2.streamlit.app).

### Alternative Cloud Hosts
- **Render (
ender.com)**: Deploy as a Python Web Service (streamlit run app.py --server.port  --server.address 0.0.0.0).
- **Hugging Face Spaces (huggingface.co/spaces)**: Deploy with the Streamlit SDK (1-click from GitHub).
- **Railway (
ailway.app)**: Persistent container deployment.

> **Note on Vercel**: Vercel is a serverless platform designed for stateless request-response APIs and static frontends (Next.js/React). Persistent WebSocket applications like Streamlit cannot run within Vercel serverless execution limits. Use Streamlit Community Cloud or Render for zero-configuration deployment.

---

## Project Structure

`
PharmaScan-AI-2/
|-- app.py                     # Main Streamlit application & Three.js background
|-- requirements.txt           # Python package dependencies
|-- pillnet_cnn.pt             # Pretrained PyTorch model weights
|-- scans_history.db           # SQLite audit registry
|-- pharmascan_data/           # Pharmaceutical specifications & ground-truth reference images
|   |-- medicine_database.py   # Regulatory database and dimensional tolerances
|   |-- reference_images/      # Ground-truth certified reference standards
|-- pharmascan_ml/             # Machine learning & computer vision pipelines
|   |-- classifier.py          # Multi-vector ensemble screening engine
|   |-- cnn_model.py           # PyTorch 4-layer convolutional neural network
|   |-- feature_extractor.py   # OpenCV dimensional, color & contour analysis
|   |-- reference_matcher.py   # Vector similarity & reference anchor comparison
|-- pharmascan_report/         # PDF certificate generator
|   |-- pdf_generator.py       # ReportLab pharmaceutical dossier builder
`

---

## License
Proprietary / Demonstration Use.
