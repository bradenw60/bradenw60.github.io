"""
generate_mxd.py
---------------
Generates (or updates) a Vancouver Restaurant Map ArcMap document (.mxd)
from the shared GeoJSON data file: ../data/restaurants.geojson

Requirements:
  - ArcGIS Desktop 10.x with arcpy (ArcMap) OR ArcGIS Pro with arcpy
  - Run from the ArcGIS Python command prompt or via ArcMap's Python window

Usage:
  1. Open ArcMap
  2. Open the Python Window (Geoprocessing > Python)
  3. Run:
        execfile(r'"C:\Users\Scutie\Desktop\Testingwebsite\arcgis\generate_mxd.py"')
  OR run from command line:
        "C:\\Python27\\ArcGIS10.x\\python.exe" generate_mxd.py

Output:
  - vancouver_restaurants.mxd  (in this arcgis/ folder)
  - vancouver_restaurants.gdb  (file geodatabase with restaurant points)

To EDIT restaurants:
  1. Edit ../data/restaurants.geojson
  2. Re-run this script to regenerate the MXD, OR
  3. Edit the feature class directly in ArcMap/ArcCatalog
     (but then sync back to GeoJSON manually if needed for the website)
"""

import arcpy
import json
import os
import sys

# ─────────────────────────────────────────────
# CONFIG — adjust these paths if needed
# ─────────────────────────────────────────────

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR  = os.path.dirname(SCRIPT_DIR)
GEOJSON_PATH = os.path.join(PROJECT_DIR, "data", "restaurants.geojson")
GDB_PATH     = os.path.join(SCRIPT_DIR, "vancouver_restaurants.gdb")
MXD_PATH     = os.path.join(SCRIPT_DIR, "vancouver_restaurants.mxd")
FC_NAME      = "restaurants"

# Map coordinate system: WGS84
SR = arcpy.SpatialReference(4326)

# Category → colour (RGB) for symbology
CATEGORY_COLOURS = {
    "Fine Dining":   (139, 69,  19),   # Rich brown
    "Seafood & Sushi": (30, 144, 255), # Dodger blue
    "Casual Fine":   (60, 179, 113),   # Medium sea green
    "Asian":         (255, 140,  0),   # Dark orange
    "European":      (147, 112, 219),  # Medium purple
    "Bar & Lounge":  (220,  20,  60),  # Crimson
}
DEFAULT_COLOUR = (128, 128, 128)       # Gray fallback


def load_geojson(path):
    with open(path, "r") as f:
        return json.load(f)


def create_geodatabase():
    gdb_folder = os.path.dirname(GDB_PATH)
    gdb_name   = os.path.basename(GDB_PATH)
    if arcpy.Exists(GDB_PATH):
        print("  Existing GDB found — deleting for fresh import...")
        arcpy.Delete_management(GDB_PATH)
    arcpy.CreateFileGDB_management(gdb_folder, gdb_name)
    print("  Created: {}".format(GDB_PATH))


def build_feature_class(geojson):
    fc = os.path.join(GDB_PATH, FC_NAME)
    arcpy.CreateFeatureclass_management(GDB_PATH, FC_NAME, "POINT",
                                        spatial_reference=SR)

    # Add fields
    fields = [
        ("RestID",    "SHORT",  None),
        ("Name",      "TEXT",   100),
        ("Cuisine",   "TEXT",   80),
        ("Category",  "TEXT",   60),
        ("Address",   "TEXT",   150),
        ("Phone",     "TEXT",   30),
        ("Price",     "TEXT",   10),
        ("Rating",    "FLOAT",  None),
        ("Hours",     "TEXT",   100),
        ("Notes",     "TEXT",   500),
        ("Website",   "TEXT",   150),
        ("WalkMins",  "SHORT",  None),
        ("Tags",      "TEXT",   200),
    ]
    for name, ftype, length in fields:
        if length:
            arcpy.AddField_management(fc, name, ftype, field_length=length)
        else:
            arcpy.AddField_management(fc, name, ftype)

    print("  Fields added.")

    # Insert rows
    insert_fields = ["SHAPE@XY", "RestID", "Name", "Cuisine", "Category",
                     "Address", "Phone", "Price", "Rating", "Hours",
                     "Notes", "Website", "WalkMins", "Tags"]
    with arcpy.da.InsertCursor(fc, insert_fields) as cur:
        for feat in geojson["features"]:
            p   = feat["properties"]
            lon = feat["geometry"]["coordinates"][0]
            lat = feat["geometry"]["coordinates"][1]
            tags = ", ".join(p.get("tags", []))
            cur.insertRow([
                (lon, lat),
                p.get("id"),
                p.get("name"),
                p.get("cuisine"),
                p.get("category"),
                p.get("address"),
                p.get("phone"),
                p.get("price"),
                p.get("rating"),
                p.get("hours"),
                p.get("notes"),
                p.get("website"),
                p.get("walk_minutes"),
                tags,
            ])
    print("  {} restaurants inserted.".format(len(geojson["features"])))
    return fc


def set_symbology_by_category(layer):
    """Apply unique-value symbology, one colour per Category field."""
    try:
        sym = layer.symbology
        sym.updateRenderer("UniqueValueRenderer")
        sym.renderer.fields = ["Category"]

        for grp in sym.renderer.groups:
            for item in grp.items:
                category = item.label
                r, g, b  = CATEGORY_COLOURS.get(category, DEFAULT_COLOUR)
                item.symbol.color       = {"RGB": [r, g, b, 255]}
                item.symbol.size        = 10
                item.symbol.outlineColor = {"RGB": [255, 255, 255, 255]}
                item.symbol.outlineWidth = 1.5

        layer.symbology = sym
        print("  Symbology applied.")
    except Exception as e:
        print("  Warning: could not apply symbology automatically — {}".format(e))
        print("  Apply it manually in ArcMap via Layer Properties > Symbology.")


def build_mxd(fc):
    """
    Create a new blank map document, add a basemap and the feature class,
    and save as .mxd.

    NOTE: arcpy.mapping (ArcMap 10.x) is used below.
    For ArcGIS Pro (.aprx), see the commented section at the bottom.
    """
    # --- ArcMap 10.x path ---
    mxd = arcpy.mapping.MapDocument("NEW_DOCUMENT")
    df  = arcpy.mapping.ListDataFrames(mxd)[0]
    df.name = "Vancouver Restaurants"

    # Add OpenStreetMap basemap (requires internet connection in ArcMap)
    try:
        arcpy.mapping.AddBasemap(mxd, "OpenStreetMap")
        print("  Basemap added.")
    except Exception as e:
        print("  Warning: could not add basemap — {}".format(e))

    # Add the restaurant feature class
    lyr = arcpy.MakeFeatureLayer_management(fc, "Restaurants").getOutput(0)
    arcpy.mapping.AddLayer(df, lyr, "TOP")

    # Apply symbology via .lyr file if it exists, otherwise use field-based
    lyr_file = os.path.join(SCRIPT_DIR, "restaurants_style.lyr")
    if arcpy.Exists(lyr_file):
        arcpy.ApplySymbologyFromLayer_management(lyr, lyr_file)
        print("  Symbology loaded from .lyr file.")
    else:
        # Basic: symbolise by Category using UpdateLayer
        src_lyr = arcpy.mapping.ListLayers(mxd, "Restaurants", df)[0]
        src_lyr.showLabels = True
        print("  Tip: save a .lyr file as 'restaurants_style.lyr' to persist symbology.")

    # Zoom to the layer extent
    df.extent = arcpy.mapping.ListLayers(mxd, "Restaurants", df)[0].getExtent()
    df.scale  = 50000

    # Save
    mxd.saveACopy(MXD_PATH)
    del mxd
    print("  Saved MXD: {}".format(MXD_PATH))


def main():
    print("\n=== Vancouver Restaurant Map — MXD Generator ===\n")

    if not os.path.exists(GEOJSON_PATH):
        print("ERROR: GeoJSON not found at:\n  {}".format(GEOJSON_PATH))
        sys.exit(1)

    print("[1/4] Loading GeoJSON...")
    geojson = load_geojson(GEOJSON_PATH)
    print("  {} restaurants loaded.".format(len(geojson["features"])))

    print("[2/4] Creating File Geodatabase...")
    create_geodatabase()

    print("[3/4] Building Feature Class...")
    fc = build_feature_class(geojson)

    print("[4/4] Building MXD...")
    build_mxd(fc)

    print("\n✓ Done!")
    print("  MXD  → {}".format(MXD_PATH))
    print("  GDB  → {}".format(GDB_PATH))
    print("\nTo update: edit ../data/restaurants.geojson and re-run this script.")
    print("To add a restaurant in ArcMap: edit the feature class, then export")
    print("  to JSON (File > Export > JSON) and replace ../data/restaurants.geojson.\n")


if __name__ == "__main__":
    main()


# =======================================================================
# ArcGIS PRO ALTERNATIVE (.aprx instead of .mxd)
# =======================================================================
# Uncomment and use the block below if you are on ArcGIS Pro 2.x/3.x
# instead of ArcMap. Run from the ArcGIS Pro Python command prompt.
#
# def build_aprx(fc):
#     import arcpy
#     aprx_path = os.path.join(SCRIPT_DIR, "vancouver_restaurants.aprx")
#     aprx = arcpy.mp.ArcGISProject("CURRENT")   # or pass a blank template path
#     m = aprx.listMaps()[0]
#     m.addDataFromPath(fc)
#     lyr = m.listLayers()[0]
#     lyr.name = "Vancouver Restaurants"
#     aprx.saveACopy(aprx_path)
#     print("Saved .aprx: {}".format(aprx_path))
