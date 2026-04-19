# Vancouver Restaurant Map
### A Hotel Concierge Dining Guide — Self-Contained Web + ArcGIS

---

## Folder Structure

```
vancouver-restaurant-map/
├── index.html                      ← The website (open this in a browser)
├── data/
│   └── restaurants.geojson         ← THE SINGLE SOURCE OF TRUTH (edit this)
├── arcgis/
│   ├── generate_mxd.py             ← Run with arcpy to build the .mxd
│   ├── vancouver_restaurants.mxd   ← Generated ArcMap project (after running script)
│   └── vancouver_restaurants.gdb/  ← Generated File Geodatabase (after running script)
└── README.md                       ← This file
```

---

## 1 — Running the Website

The website reads `data/restaurants.geojson` via `fetch()`, which requires
a local HTTP server (browsers block `file://` requests).

**Option A — Python (easiest):**
```bash
cd vancouver-restaurant-map
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

**Option B — Node (if installed):**
```bash
npx serve .
```

**Option C — VS Code:**
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

---

## 2 — Editing Restaurants (GeoJSON)

Open `data/restaurants.geojson` in any text editor.

Each restaurant is a GeoJSON Feature. Here is the template:

```json
{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [-123.1234, 49.2800] },
  "properties": {
    "id": 99,
    "name": "Restaurant Name",
    "cuisine": "Cuisine Type",
    "category": "Fine Dining",
    "address": "123 Main St, Vancouver",
    "phone": "+1 604-555-0000",
    "price": "$$$",
    "rating": 4.5,
    "hours": "Mon–Sun 5:00–10:00 PM",
    "notes": "Concierge tip shown on the map popup.",
    "website": "https://example.com",
    "walk_minutes": 10,
    "tags": ["tag1", "tag2", "tag3"]
  }
}
```

**Available categories** (controls colour on both map and MXD):
| Category       | Map Colour  |
|----------------|-------------|
| Fine Dining    | Brown       |
| Seafood & Sushi| Blue        |
| Casual Fine    | Green       |
| Asian          | Orange      |
| European       | Purple      |
| Bar & Lounge   | Red         |

To add a **new category**, add the colour to both:
- `CATEGORY_COLORS` in `index.html` (CSS hex value)
- `CATEGORY_COLOURS` in `arcgis/generate_mxd.py` (RGB tuple)

**Finding coordinates:**
- Right-click any location on Google Maps → the coordinates appear in the menu.
- Format: `[longitude, latitude]` (note: longitude first in GeoJSON)

---

## 3 — Generating the ArcGIS MXD

Requirements:
- ArcGIS Desktop 10.x (ArcMap) with arcpy installed
- OR ArcGIS Pro 2.x/3.x (see the `.aprx` section at the bottom of the script)

**Steps:**
1. Open ArcMap
2. Go to Geoprocessing > Python (opens the Python window)
3. Run:
   ```python
   execfile(r'C:\full\path\to\arcgis\generate_mxd.py')
   ```
   Or from the command line:
   ```
   "C:\Python27\ArcGIS10.x\python.exe" arcgis\generate_mxd.py
   ```
4. The script will create:
   - `arcgis/vancouver_restaurants.mxd`
   - `arcgis/vancouver_restaurants.gdb`

**After opening the MXD:**
- The restaurant points are in the `restaurants` feature class inside the GDB.
- Open the attribute table to see all fields.
- You can edit symbology, labels, and layout in ArcMap normally.
- To save custom symbology for future runs, save a `.lyr` file named
  `arcgis/restaurants_style.lyr` — the script will auto-apply it next run.

---

## 4 — Keeping Website + MXD in Sync

**Edit in GeoJSON → update MXD:**
1. Edit `data/restaurants.geojson`
2. Re-run `generate_mxd.py`
3. The MXD and GDB are rebuilt from scratch.

**Edit in ArcMap → update Website:**
1. Make edits to the feature class in ArcMap
2. Export: File > Export Map > JSON  
   OR use ArcToolbox: Conversion Tools > JSON > Features To JSON
3. Save the output as `data/restaurants.geojson`
4. Refresh the browser.

---

## 5 — Customising the Website

All branding is in `index.html`:

| Setting | Where to change |
|---------|----------------|
| Hotel/guide name | `<title>` tag and `.panel-title` text |
| Colour scheme | `:root` CSS variables at top of `<style>` |
| Category colours | `CATEGORY_COLORS` object in `<script>` |
| Map centre | `center: [lat, lng]` in Leaflet map init |
| Default zoom | `zoom: 14` in Leaflet map init |
| Basemap style | `L.tileLayer(...)` URL (Stadia Maps — free, no key needed) |

---

## Notes

- The website works **offline** once loaded, but needs a server to serve the GeoJSON.
- No API keys are required for the map (uses Stadia Maps free tier).
- The MXD requires ArcMap to open; for ArcGIS Pro, use the `.aprx` block in the script.
- Coordinates are in WGS84 (EPSG:4326) throughout.
