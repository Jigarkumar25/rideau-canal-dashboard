# Rideau Canal IoT Web Dashboard  
CST8916 Final Project – Web Dashboard Component

## Student Information
- **Name:** Jigarkumar Dilipkumar Patel  
- **Student ID:** 041169204  
- **Course:** CST8916 – Fall 2025  

---

## Overview

This repository contains the **web dashboard application** for the Rideau Canal IoT Monitoring System.  
The dashboard displays **real-time and historical sensor data** coming from Azure Cosmos DB and shows the current **safety status** of different Rideau Canal locations.

The dashboard helps users:
- Monitor live ice conditions
- View environmental trends
- Make safe skating decisions using real-time analytics

---

## Dashboard Features

- Real-time sensor data updates  
- Location-based data display  
- Safety status (Safe, Caution, Unsafe)  
- Charts for temperature, ice thickness, and snow depth  
- Auto-refresh functionality  
- Responsive web interface  

---

## Technologies Used

- Node.js  
- Express.js  
- Azure Cosmos DB  
- HTML, CSS, JavaScript  
- Chart.js (for graphs and visualizations)  
- Azure App Service  

---

## Prerequisites

Before running the dashboard, ensure we have:

- Node.js installed  
- An active Azure Cosmos DB account  
- Azure App Service (for deployment)  
- Proper environment variable values  
- Git  

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Jigarkumar25/rideau-canal-dashboard.git
cd rideau-canal-dashboard
```
### 2. Install Dependencies
```bash
npm install
```
## Configuration
Create a .env file in the root directory and add the following values:
```bash
COSMOS_ENDPOINT=cosmos-endpoint
COSMOS_KEY=cosmos-key
COSMOS_DATABASE=RideauCanalDB
COSMOS_CONTAINER=SensorAggregations
PORT=3000
```
## API Endpoints
1. Get All Sensor Readings

Endpoint:
```bash
GET /api/readings
```
Description:
Returns all available sensor data from Cosmos DB.

Example Request:
```bash
GET http://localhost:3000/api/readings
```

Example Response:
```json
[
  {
    "location": "Dows Lake",
    "avgIceThickness": 28.5,
    "avgTemperature": -6.2,
    "avgSnowDepth": 4.1,
    "safetyStatus": "Safe",
    "windowEndTime": "2025-01-12T23:20:00Z"
  }
]
```
### 2. Get Sensor Data by Location

Endpoint:
```bash
GET /api/readings/:location
```

Description:
Returns sensor data for a specific location.

Example Request:
```bash
GET http://localhost:3000/api/readings/Dows%20Lake
```

Example Response:
```json
{
  "location": "Dows Lake",
  "avgIceThickness": 27.1,
  "avgTemperature": -7.0,
  "avgSnowDepth": 5.0,
  "safetyStatus": "Caution",
  "windowEndTime": "2025-01-12T23:25:00Z"
}
```
## Deployment to Azure App Service

### Step-by-Step Deployment Guide

1. Create an **Azure App Service** (Node.js runtime)
2. Set the correct **runtime stack** to **Node.js**
3. Upload the dashboard code or use **GitHub deployment**
4. Configure the following **environment variables** in App Service:
   - COSMOS_ENDPOINT  
   - COSMOS_KEY  
   - COSMOS_DATABASE  
   - COSMOS_CONTAINER  
   - PORT  
5. Restart the **App Service**
6. Open the **public App Service URL** to access the dashboard

---

### Configuration Settings in Azure

In **App Service → Configuration → Application Settings**, add:

- COSMOS_ENDPOINT  
- COSMOS_KEY  
- COSMOS_DATABASE  
- COSMOS_CONTAINER  
- PORT  

These values should match  local `.env` file.

---

## Dashboard Features 

### Real-time Updates
The dashboard automatically refreshes data from Cosmos DB without requiring manual reload.

### Charts and Visualizations
Graphs display trends for temperature, ice thickness, and snow accumulation.

### Safety Status Indicators
Each location is labeled as **Safe**, **Caution**, or **Unsafe** based on real-time data.

---

## Troubleshooting

### Common Issues and Fixes

---

### 1. Dashboard Not Loading  
**Cause:** Node.js server not running or wrong port.  
**Fix:**
- Run `npm start`  
- Check the correct port in `.env`  
- Restart the server  

---

### 2. No Data Displayed on Dashboard  
**Cause:** Incorrect Cosmos DB credentials or container name.  
**Fix:**
- Verify `COSMOS_ENDPOINT` and `COSMOS_KEY`  
- Confirm database and container names  
- Restart the application  

---

### 3. API Endpoints Not Responding  
**Cause:** Backend API error or incorrect routing.  
**Fix:**
- Check API route definitions  
- Review server logs  
- Restart the Node.js server  

---


## AI Tools Disclosure

ChatGPT was used for documentation wording,code guidance and minor debugging guidance.  
All dashboard coding, Azure configuration, testing, and deployment were completed manually by me.

---

## References

- Node.js Official Documentation  
  https://nodejs.org/en/docs  

- Express.js Official Documentation  
  https://expressjs.com  

- Azure Cosmos DB Documentation  
  https://learn.microsoft.com/en-us/azure/cosmos-db  

- Azure App Service Documentation  
  https://learn.microsoft.com/en-us/azure/app-service  
