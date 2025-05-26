<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>
<h1 align="center">furrydelight-3d-marketplace</h1>
<h4 align="center">Interactive 3D cat food marketplace providing an immersive shopping experience.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/3D_Library-Three.js-008000" alt="Three.js">
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/furrydelight-3d-marketplace?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/furrydelight-3d-marketplace?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/furrydelight-3d-marketplace?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents

- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📜 API Documentation
- 📄 License
- 👏 Authors

## 📍 Overview

This repository showcases a 3D interactive landing page designed for a cat food marketplace. It provides an engaging online shopping experience using React, Three.js, and React Three Fiber. This MVP emphasizes interactive product exploration and visual appeal.

## 📦 Features

|     | Feature                   | Description                                                                                               |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| 🧊 | 3D Scene Management       | ThreeScene.tsx: Core Three.js scene setup with camera, lighting, and controls.                             |
| ⚙️  | 3D Model Loading          | ModelLoader.tsx: Loads and optimizes 3D models (GLTF) for web delivery.                                  |
| ✨ | Animation System          | use3DAnimation.ts: Manages and controls animations on 3D objects.                                        |
| 📜 | Scroll-Triggered Effects | ScrollScene.tsx: Creates 3D scene animations driven by scroll events.                                     |
| 👆 | Interactive Elements    | use3DInteraction.ts: Enables click, hover, and drag interactions with 3D objects.                         |
| 🎨 | Theming and Styling     | Tailwind CSS: Provides a utility-first CSS framework for consistent and responsive styling.               |
| 🗺️ | Route Management       | React Router: Enables navigation between different sections of the site (Home, About, Contact, etc.).      |
| 🚀 | Optimized Performance    | Model optimization, lazy loading, and adaptive rendering for smooth user experience.                         |

## 📂 Structure

```
furrydelight-3d-marketplace/
├── public/                  # Static assets (3D models, textures, fonts, etc.)
├── src/
│   ├── components/           # React components
│   │   ├── 3d/              # 3D related components
│   │   │   ├── core/          # Core 3D components (Scene, Camera, Lights)
│   │   │   ├── models/        # 3D model components (CatFoodModel, etc.)
│   │   ├── layout/        # Reusable React layout components.
│   │   │   ├── Header.tsx        # Contains the header content.
│   │   │   ├── Footer.tsx        # Contains the footer content.
│   │   ├── sections/       # React sections related to the main landing page and sections.
│   │   │   ├── LandingHero.tsx    # Contains the Hero for the 3D landing page.
│   │   ├── ui/             # Basic Reusable React UI components.
│   │   ├── 3d/
│   │   │   ├── ThreeScene.tsx    # Used for all the basic 3D scene.
│   │   │   ├── ModelLoader.tsx     # General method to load models into the 3D scenes.
│   │   ├──hooks/                  # All reusable React hooks.
│   │   │   ├── use3DAnimation.tsx     # Used to animate and generate threeJS models.
│   │   │   ├── use3DInteraction.tsx          # Provides a way to use interactions with 3D scenes.
│   ├── pages/             # React pages
│   │   ├── HomePage.tsx     # Main landing page
│   ├── utils/              # Utility functions
│   │   ├── three-helpers.ts  # Utility functions for Three.js operations
│   │   ├── modelManager.ts   # Manages 3D model caching and optimization
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point for React
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## 💻 Installation

> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18 or higher
> - npm v8 or higher
> - Git

### 🚀 Setup Instructions
1.  Clone the repository:
   ```bash
   git clone https://github.com/coslynx/furrydelight-3d-marketplace.git
   cd furrydelight-3d-marketplace
   ```
2.  Install dependencies:
   ```bash
   npm install
   ```
3.  Set up environment variables:
   ```bash
   cp .env.example .env
   # Fill in required environment variables in .env file
   ```

## 🏗️ Usage

### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application at `http://localhost:5173`

> [!TIP]
> ### ⚙️ Configuration
>  *  Modify `src/App.tsx` to customize the website title, navigation links, and other configurations.
>  *  Adjust 3D model paths in `src/components/sections/LandingHero.tsx` to use custom models.

### 💡 Examples
* **Displaying the Landing Page:**
Navigate to the root URL `/` to view the 3D landing page.

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Deploying to Vercel

1.  Create a Vercel account and install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2.  Link your local project to Vercel:
   ```bash
   vercel link
   ```
3.  Deploy the project:
   ```bash
   vercel deploy --prod
   ```

### 🔑 Environment Variables

*   `VITE_APP_TITLE`: Sets the title of the application. Example: `FurryDelight 3D`

## 📜 API Documentation

This MVP does not include a backend API. It is a front-end project focused on showcasing 3D content.

## 📄 License & Attribution

> [!NOTE]
> ## 📜 License & Attribution
>
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
>
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
>
> No human was directly involved in the coding process of the repository: furrydelight-3d-marketplace
>
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>