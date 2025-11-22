# BullBudget 

A modern FinTech dashboard designed to make personal budget management intuitive and engaging using the "Savings Jars" concept.

## Project Overview

BullBudget is a full stack webapp application built with Vite and React for frontend, Node.js and Firebase to provide real-time data synchronization. It features a clean, grid-based dashboard that allows users to track their total balance, view spending statistics, and manage individual budget categories (Jars). Designed specifically for USF students to manage BullBucks, Dining Dollars, and personal finances in one place.

The project focuses on modularity and clean UI architecture using standard CSS Modules.

## Features

* **Interactive Welcome Screen:** A clean entry interface that "opens up" to reveal the main dashboard.
* **Smart Dashboard Layout:** A responsive grid layout separating visual data from detailed statistics.
* **Budget Tracking:** Tracks balances across different categories (e.g., BullBucks, Dining Dollars, Personal Use).
* **Dynamic Balance:** Automatically calculates the total balance from all budget categories.
* **AI-Powered Chatbot:** Integrated Google Gemini AI assistant that provides personalized financial advice, budgeting tips, and answers money management questions in real-time.
* **Real-Time Sync:** Firebase integration ensures all data updates instantly across all components.
* **Modular Styling:** Utilizes **CSS Modules** (`*.module.css`) to ensure component-scoped styling and prevent CSS conflicts.

## 🛠️ Tech Stack

* **Frontend:** React 
* **Build Tool:** Vite
* **Backend and Database:** Firebase Firestore
* **Authentication:** Firebase Auth
* **AI Integration:** Google Gemini API
* **Styling:** CSS Modules