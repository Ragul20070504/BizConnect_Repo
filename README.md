# Business Companion App  
**Empowering First-Time Entrepreneurs in Tier-2 and Tier-3 Cities**

---

## Overview  
The **Business Companion App** is a full-stack platform designed to assist first-time entrepreneurs and small-town business owners in managing compliance, billing, and business growth from a single interface.  

It streamlines access to **GST registration, business licenses, and Udyam** services with regional language guidance through a chatbot and voice assistant.  

Beyond compliance, it functions as a **smart business secretary**—sending reminders, tracking invoices, analyzing sales, and fostering collaborative growth among shopkeepers, vendors, and service providers.

---

## Features  

- Simplified Registrations – Redirects users to GST, License, and Udyam registration with guided steps.  
- Multilingual Chatbot & Voice Assistant – Supports multiple Indian languages using OpenRouter API (LLaMA model) and Google Translate API.  
- Smart Notifications – Twilio API integration enables WhatsApp alerts for GST filings, renewals, and pending invoices.  
- Billing & Analytics – Built-in billing system tracks payments and visualizes sales data using Python (NumPy, Pandas, Matplotlib).  
- Collaborative Growth – Connects local entrepreneurs to learn, trade, and grow together within a shared ecosystem.  
- Data Insights – Highlights best-selling products, overdue invoices, and monthly trends.  

---

## Tech Stack  

### Frontend
- HTML, CSS (TailwindCSS)  
- JavaScript (React.js)  

### Backend
- Node.js  
- Express (TypeScript)  
- Supabase (BaaS) with PostgreSQL  

### APIs Used
- OpenRouter API (LLaMA) – AI chatbot guidance  
- Twilio API – WhatsApp notifications  
- Google Translate API – Multilingual support  

### Data Analysis Tools
- Python  
- NumPy  
- Pandas  
- Matplotlib  

### Deployment
- Vercel  

---

## Installation and Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/<your-username>/business-companion-app.git
cd business-companion-app
