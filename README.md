# Smart Expense Tracker with NLP
<div align="center">
  <img src="./assets/banner.png" alt="Smart Expense Tracker Banner" width="100%">
  # 💸 Smart Expense Tracker with NLP
  
  **Transform your spending habits with the power of AI.**
  
  [![Live Demo](https://img.shields.io/badge/Live-Frontend-brightgreen?style=for-the-badge&logo=render)](https://smart-expense-tracker-with-nlp-1.onrender.com)
  [![API Status](https://img.shields.io/badge/API-Backend-blue?style=for-the-badge&logo=render)](https://smart-expense-tracker-with-nlp-3.onrender.com/)
  [![GitHub License](https://img.shields.io/github/license/Abhilanshu/smart-expense-tracker?style=for-the-badge)](https://github.com/Abhilanshu/smart-expense-tracker/blob/main/LICENSE)
  *Manage your finances effortlessly using Natural Language Processing and intuitive visualizations.*
</div>
---
## 🚀 Overview
**Smart Expense Tracker** is a modern financial management tool designed for the modern user. Gone are the days of tedious manual entry. With our built-in NLP engine, you can simply type how you spent your money, and the app does the rest—categorizing, dating, and logging your expenses in seconds.
## ✨ Key Features
- **🧠 Smart NLP Input**: Just type *"Spent 500 on dinner with friends"* or *"Bought groceries for 1200 today"*. Our AI parses the amount, category, and date automatically.
- **📊 Interactive Analytics**: Visualize your spending patterns with beautiful, interactive Pie and Bar charts powered by Chart.js.
- **💎 Premium UI/UX**: A sleek, minimal "Arctic White" aesthetic with smooth transitions and responsive design for all devices.
- **🛡️ Secure Auth**: Robust user authentication system to keep your financial data private and personalized.
- **🌍 Multi-Currency Support**: Native support for **Indian Rupee (₹)** with precise formatting.
## 🛠️ Tech Stack
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
</div>
## 📸 UI Preview
| Landing Page | Dashboard |
| :---: | :---: |
| ![Landing](./assets/preview1.png) | ![Dashboard](./assets/preview2.png) |
*(Note: Upload your own screenshots to the assets folder as preview1.png and preview2.png to replace these placeholders)*
## 🚦 Getting Started
### Prerequisites
- Node.js (v16+)
- MySQL
### 1. Clone the repository
```bash
git clone https://github.com/Abhilanshu/smart-expense-tracker.git
cd smart-expense-tracker
2. Setup Backend
bash
cd backend
npm install
# Create a .env file with your DB credentials
npm run dev
3. Setup Frontend
bash
cd ../frontend
npm install
npm run dev
📂 Project Structure
text
├── backend/            # Express.js Server & NLP Logic
│   ├── routes/         # API Endpoints
│   └── db.js           # Database Configuration
├── frontend/           # React App (Vite)
│   ├── src/pages/      # Dashboard, Auth, Landing
│   └── src/components/ # Reusable UI Components
└── assets/             # Images and Icons
