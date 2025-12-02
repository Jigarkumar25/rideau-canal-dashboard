async function loadReadings() {
  const statusEl = document.getElementById("status");
  const tbody = document.getElementById("readings-body");

  statusEl.textContent = "Loading data...";
  tbody.innerHTML = `<tr><td colspan="9">Loading data…</td></tr>`;

  try {
    const res = await fetch("/api/readings");
    if (!res.ok) {
      throw new Error("API error " + res.status);
    }
    const data = await res.json();

    const items = data.items || [];
    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9">No data available yet.</td></tr>`;
      statusEl.textContent = "No data in Cosmos DB yet.";
      updateCards([]);
      return;
    }

    // Sort newest first by windowEnd
    items.sort((a, b) => new Date(b.windowEnd) - new Date(a.windowEnd));

    tbody.innerHTML = "";
    for (const item of items) {
      const tr = document.createElement("tr");

      const safety = item.safetyStatus || "Unknown";
      const badgeClass =
        safety === "Safe" ? "safe" :
        safety === "Caution" ? "caution" :
        "unsafe";

      tr.innerHTML = `
        <td>${item.location || ""}</td>
        <td>${item.windowEnd || ""}</td>
        <td>${item.avgIceThickness?.toFixed?.(2) ?? ""}</td>
        <td>${item.minIceThickness?.toFixed?.(2) ?? ""}</td>
        <td>${item.maxIceThickness?.toFixed?.(2) ?? ""}</td>
        <td>${item.avgSurfaceTemp?.toFixed?.(2) ?? ""}</td>
        <td>${item.maxSnowAccumulation?.toFixed?.(2) ?? ""}</td>
        <td>${item.avgExternalTemp?.toFixed?.(2) ?? ""}</td>
        <td><span class="badge ${badgeClass}">${safety}</span></td>
      `;

      tbody.appendChild(tr);
    }

    updateCards(items);
    statusEl.textContent = `Loaded ${items.length} records from Cosmos DB.`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error loading data from Cosmos DB.";
    tbody.innerHTML = `<tr><td colspan="9">Error loading data. Check server logs.</td></tr>`;
  }
}

function updateCards(items) {
  const latestByLocation = {};

  for (const item of items) {
    if (!item.location) continue;
    const existing = latestByLocation[item.location];
    const ts = item.windowEnd ? new Date(item.windowEnd).getTime() : 0;
    if (!existing || ts > existing._ts) {
      latestByLocation[item.location] = { ...item, _ts: ts };
    }
  }

  updateCardForLocation("Dows Lake", "summary-dows", latestByLocation["Dows Lake"]);
  updateCardForLocation("Fifth Avenue", "summary-fifth", latestByLocation["Fifth Avenue"]);
  updateCardForLocation("NAC", "summary-nac", latestByLocation["NAC"]);
}

function updateCardForLocation(label, elementId, item) {
  const el = document.getElementById(elementId);
  const card = el?.parentElement;
  if (!el || !card) return;

  card.classList.remove("safe", "caution", "unsafe");

  if (!item) {
    el.textContent = "No recent data.";
    return;
  }

  const safety = item.safetyStatus || "Unknown";
  const safetyLower = safety.toLowerCase();

  if (safetyLower === "safe") card.classList.add("safe");
  else if (safetyLower === "caution") card.classList.add("caution");
  else card.classList.add("unsafe");

  const ice = item.avgIceThickness?.toFixed?.(2);
  const temp = item.avgSurfaceTemp?.toFixed?.(2);
  const time = item.windowEnd || "";

  el.textContent = `${safety} – Avg ice ${ice} cm, surface temp ${temp} °C (window ending ${time})`;
}

document.getElementById("refresh-btn").addEventListener("click", loadReadings);

// Load once on page load
loadReadings();
