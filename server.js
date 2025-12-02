// Simple dashboard server for Rideau Canal monitoring

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { CosmosClient } = require("@azure/cosmos");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cosmos DB config from .env
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
const COSMOS_DATABASE = process.env.COSMOS_DATABASE || "RideauCanalDB";
const COSMOS_CONTAINER = process.env.COSMOS_CONTAINER || "SensorAggregations";

// Debug log – now variables exist
console.log("Cosmos config:", {
  endpoint: COSMOS_ENDPOINT,
  database: COSMOS_DATABASE,
  container: COSMOS_CONTAINER
});

if (!COSMOS_ENDPOINT || !COSMOS_KEY) {
  console.warn("⚠️ COSMOS_ENDPOINT or COSMOS_KEY is missing in .env. The API will fail until you set them.");
}

const cosmosClient = new CosmosClient({
  endpoint: COSMOS_ENDPOINT,
  key: COSMOS_KEY,
});

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Simple health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API to get latest readings from Cosmos
app.get("/api/readings", async (req, res) => {
  try {
    const database = cosmosClient.database(COSMOS_DATABASE);
    const container = database.container(COSMOS_CONTAINER);

    // Get latest 50 records, newest first
    const query = {
      query: "SELECT TOP 50 * FROM c ORDER BY c.windowEnd DESC"
    };

    const { resources } = await container.items.query(query).fetchAll();

    res.json({
      count: resources.length,
      items: resources
    });
  } catch (err) {
    console.error("Error querying Cosmos DB:", err.message);
    res.status(500).json({ error: "Failed to load readings from Cosmos DB" });
  }
});

// Serve index.html for any unknown route (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Rideau Canal dashboard running on http://localhost:${PORT}`);
});
