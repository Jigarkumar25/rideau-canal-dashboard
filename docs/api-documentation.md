# Rideau Canal IoT Dashboard – API Documentation  
CST8916 Final Project

---

## Overview

This document describes the **REST API endpoints** used by the Rideau Canal IoT Web Dashboard.  
These APIs allow the frontend dashboard to retrieve **real-time sensor data** stored in **Azure Cosmos DB**.

All endpoints are served by the Node.js backend (`server.js`).

---

## Base URL

### Local Development
```url
http://localhost:3000
```
### Azure App Service (Example)
```url
https://<your-app-name>.azurewebsites.net
```

---

## Authentication

This API does **not require user authentication**.  
Security is handled using:
- Azure App Service environment variables
- Azure Cosmos DB access keys on the backend only  
(No credentials are exposed to the frontend.)

---

## API Endpoints



## 1. Get All Sensor Readings

### Endpoint

```
GET /api/readings
```

### Description
Returns **all available aggregated sensor data** from Azure Cosmos DB for all canal locations.

### Example Request
```
GET http://localhost:3000/api/readings
```

### Example Response
```json
[
  {
    "location": "Dows Lake",
    "avgIceThickness": 28.5,
    "avgTemperature": -6.2,
    "avgSnowDepth": 4.1,
    "safetyStatus": "Safe",
    "windowEndTime": "2025-01-12T23:20:00Z"
  },
  {
    "location": "Fifth Avenue",
    "avgIceThickness": 25.3,
    "avgTemperature": -7.0,
    "avgSnowDepth": 6.2,
    "safetyStatus": "Caution",
    "windowEndTime": "2025-01-12T23:20:00Z"
  }
]
```

## 2. Get Sensor Data by Location
Endpoint
GET /api/readings/:location

#### Description

Returns sensor data for a specific Rideau Canal location.

Example Request
```
GET http://localhost:3000/api/readings/Dows%20Lake
```
Example Response
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
Error Handling

All errors return a standard JSON response:
```json
{
  "error": "Error message description"
}
```
### Environment Variables Used by the API

The backend uses the following environment variables:
```
COSMOS_ENDPOINT
COSMOS_KEY
COSMOS_DATABASE
COSMOS_CONTAINER
PORT
```

These must be configured both:

- Locally in .env

- In Azure App Service → Configuration → Application Settings

### Data Source

All data returned by this API comes from:

- Azure Cosmos DB

- Container: SensorAggregations

- Partition Key: /location

### Performance Notes

- Queries are optimized using the /location partition key

- Data is refreshed every 5 minutes based on Stream Analytics aggregation

- API responses are optimized for fast dashboard loading

### AI Tools Disclosure

ChatGPT was used for documentation wording only.
All API coding, testing, and Azure configuration were completed manually by me.

### References

- Azure Cosmos DB REST API Documentation
https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/sdk-dotnet-v3

- Express.js Documentation
https://expressjs.com/

- Node.js Documentation
https://nodejs.org/en/docs/