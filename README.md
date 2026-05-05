# Smart Expense Tracker with NLP
<div align="center">

# 💸 Smart Expense Tracker with NLP

### 🧠 Track Expenses Using Natural Language

<p>
  <a href="https://smart-expense-tracker-with-nlp-1.onrender.com">
    <img src="https://img.shields.io/badge/🚀 Live App-Frontend-brightgreen?style=for-the-badge&logo=render" />
  </a>
  <a href="https://smart-expense-tracker-with-nlp-3.onrender.com">
    <img src="https://img.shields.io/badge/⚙️ Backend API-Online-blue?style=for-the-badge&logo=render" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</p>

</div>

---

## 🚀 Overview

**Smart Expense Tracker** is a full-stack web application that allows users to manage their daily expenses in a smarter way using **Natural Language Processing (NLP)**.

Instead of filling forms, users can simply type:

> “Spent 500 on pizza”
> “Paid rent 10000”

The system automatically understands:

* 💰 Amount
* 🏷️ Category
* 📅 Date

---

## ✨ Features

* 🧠 **NLP-Based Input** – Add expenses using natural language
* 📊 **Dashboard** – View all expenses in one place
* 🔐 **Authentication** – Secure login & registration
* 🏷️ **Smart Categories** – Auto-detect categories like Food, Travel, Bills
* 📱 **Responsive UI** – Works on all devices
* ⚡ **Fast & Clean Interface**

---

## 🏷️ Supported Categories

* 🍔 Food
* ☕ Coffee / Tea
* 🚕 Travel / Cab
* 🛍️ Shopping
* 🏠 Rent
* 💡 Bills
* 🎬 Entertainment
* 🏥 Health
* 📚 Education
* 👤 Personal
* 📦 Others

---

## 🧠 NLP Logic (Simple & Effective)

The app uses **keyword-based NLP**:

| Input          | Category |
| -------------- | -------- |
| pizza, burger  | Food     |
| coffee, tea    | Coffee   |
| uber, ola      | Cab      |
| rent           | Rent     |
| bill, recharge | Bills    |

👉 If no match → **Others**

---

## 🛠️ Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | React, HTML, CSS, JavaScript |
| Backend  | Node.js, Express             |
| Database | MySQL                        |

---

## 🔗 Live Links

* 🌐 Frontend:
  https://smart-expense-tracker-with-nlp-1.onrender.com

* ⚙️ Backend API:
  https://smart-expense-tracker-with-nlp-3.onrender.com

---

## 📂 Project Structure

```bash
smart-expense-tracker/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│
└── assets/
```

---

## ⚙️ Backend Setup (Simple Steps)

1. Go to backend folder

```bash
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Start server

```bash
node server.js
```

Server will run on:

```bash
http://localhost:5000
```

---

## 💡 How It Works

1. User logs in
2. Enters expense (manual or text)
3. NLP processes input
4. Data stored in MySQL
5. Dashboard updates instantly

---

## 🚀 Future Improvements

* 📊 Charts & analytics
* 📅 Monthly reports
* 🤖 Advanced NLP
* 📱 Mobile version

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
