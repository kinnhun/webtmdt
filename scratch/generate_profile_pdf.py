import pymupdf as fitz
import os

pdf_path = r"d:\mercy\webtmdt\public\DHT_Company_Profile_2026.pdf"
os.makedirs(os.path.dirname(pdf_path), exist_ok=True)

doc = fitz.open()

# ── Color Palette (Brand Master 2026) ──
C_FOREST = (23/255, 60/255, 44/255)      # #173C2C
C_TEAK   = (185/255, 120/255, 70/255)    # #B97846
C_SAND   = (243/255, 239/255, 231/255)   # #F3EFE7
C_CHARCOAL = (31/255, 39/255, 35/255)    # #1F2723
C_MUTED  = (100/255, 116/255, 139/255)   # #64748B
C_WHITE  = (1, 1, 1)
C_LIGHT_BG = (248/255, 250/255, 252/255)

# ══════════════════════════════════════════════════════════════════
# PAGE 1: Corporate Overview & Key Manufacturing Metrics
# ══════════════════════════════════════════════════════════════════
p1 = doc.new_page(width=595.32, height=841.92) # A4 Portrait

# Top decorative header banner
p1.draw_rect(fitz.Rect(0, 0, 595.32, 130), color=None, fill=C_FOREST)
p1.draw_rect(fitz.Rect(0, 130, 595.32, 136), color=None, fill=C_TEAK)

# Header Title
p1.insert_text(fitz.Point(40, 50), "DHT FURNITURE VIETNAM", fontsize=24, fontname="helv", color=C_WHITE)
p1.insert_text(fitz.Point(40, 75), "COMPANY PROFILE 2026", fontsize=16, fontname="helv", color=C_TEAK)
p1.insert_text(fitz.Point(40, 98), "Vietnamese Furniture Manufacturer & Exporter | Family-Owned Group", fontsize=10, fontname="helv", color=C_SAND)

# Executive Positioning Statement
p1.draw_rect(fitz.Rect(40, 155, 555.32, 225), color=C_SAND, fill=C_SAND)
p1.insert_text(fitz.Point(55, 175), "CORPORATE POSITIONING", fontsize=9, fontname="helv", color=C_TEAK)
positioning_lines = [
    "DHT Furniture Vietnam operates as part of a family-owned furniture group with 11 production facilities across",
    "Vietnam. From initial concept development and technical sampling to rigorous quality assurance and global export",
    "coordination, our team supports scalable outdoor, indoor, and project furniture programmes tailored to international markets."
]
y_text = 192
for line in positioning_lines:
    p1.insert_text(fitz.Point(55, y_text), line, fontsize=9.5, fontname="helv", color=C_CHARCOAL)
    y_text += 14

# Section 1: Manufacturing Group Footprint (4 KPI Cards)
p1.insert_text(fitz.Point(40, 250), "MANUFACTURING FOOTPRINT & SCALE", fontsize=12, fontname="helv", color=C_FOREST)
p1.draw_line(fitz.Point(40, 256), fitz.Point(555.32, 256), color=C_TEAK, width=1.5)

cards = [
    ("11", "Production Facilities", "10 Furniture + 1 Panel Facility"),
    ("543,380 m2", "Manufacturing Footprint", "283,380 m2 Finished + 260,000 m2 Panel"),
    ("~2,400", "Group Personnel", "Skilled Artisans & Factory Workforce"),
    ("60-70", "Containers / Month", "Reference Facility Output (Outdoor)")
]

col_w = (555.32 - 40 - 30) / 4
for i, (kpi, label, sub) in enumerate(cards):
    x0 = 40 + i * (col_w + 10)
    x1 = x0 + col_w
    p1.draw_rect(fitz.Rect(x0, 268, x1, 345), color=C_SAND, fill=C_LIGHT_BG)
    p1.draw_rect(fitz.Rect(x0, 268, x1, 271), color=None, fill=C_FOREST)
    p1.insert_text(fitz.Point(x0 + 8, 294), kpi, fontsize=15, fontname="helv", color=C_FOREST)
    p1.insert_text(fitz.Point(x0 + 8, 312), label, fontsize=8.5, fontname="helv", color=C_CHARCOAL)
    p1.insert_text(fitz.Point(x0 + 8, 328), sub, fontsize=7, fontname="helv", color=C_MUTED)

# Section 2: Facility Breakdown Table
p1.insert_text(fitz.Point(40, 375), "FACILITY ARCHITECTURE", fontsize=12, fontname="helv", color=C_FOREST)
p1.draw_line(fitz.Point(40, 381), fitz.Point(555.32, 381), color=C_TEAK, width=1.5)

p1.draw_rect(fitz.Rect(40, 395, 555.32, 420), color=None, fill=C_FOREST)
p1.insert_text(fitz.Point(50, 411), "Division", fontsize=9, fontname="helv", color=C_WHITE)
p1.insert_text(fitz.Point(180, 411), "Scope & Specialization", fontsize=9, fontname="helv", color=C_WHITE)
p1.insert_text(fitz.Point(380, 411), "Footprint", fontsize=9, fontname="helv", color=C_WHITE)
p1.insert_text(fitz.Point(470, 411), "Location", fontsize=9, fontname="helv", color=C_WHITE)

rows = [
    ("10 Furniture Facilities", "Outdoor lounge, dining, tables, chairs & mixed material lines", "283,380 m2", "Binh Duong, Dong Nai"),
    ("1 Panel & Slicing Facility", "Engineered-wood panels, primary timber processing & veneers", "260,000 m2", "Phu Tho Province"),
    ("DHT Central Office", "Commercial sales, OEM coordination, QA/QC central team", "~20 Specialists", "Ho Chi Minh City / Hanoi"),
]

row_y = 435
for div, scope, fp, loc in rows:
    p1.draw_line(fitz.Point(40, row_y + 12), fitz.Point(555.32, row_y + 12), color=C_SAND, width=0.8)
    p1.insert_text(fitz.Point(50, row_y + 4), div, fontsize=8.5, fontname="helv", color=C_FOREST)
    p1.insert_text(fitz.Point(180, row_y + 4), scope, fontsize=8, fontname="helv", color=C_CHARCOAL)
    p1.insert_text(fitz.Point(380, row_y + 4), fp, fontsize=8, fontname="helv", color=C_CHARCOAL)
    p1.insert_text(fitz.Point(470, row_y + 4), loc, fontsize=8, fontname="helv", color=C_MUTED)
    row_y += 28

# Section 3: Timber Sourcing & Certifications
p1.insert_text(fitz.Point(40, 525), "SUSTAINABLE SOURCING & FSC COMPLIANCE", fontsize=12, fontname="helv", color=C_FOREST)
p1.draw_line(fitz.Point(40, 531), fitz.Point(555.32, 531), color=C_TEAK, width=1.5)

materials = [
    ("FSC Acacia Wood", "Acacia hybrid sourced from certified sustainable plantations in Vietnam. Kiln-dried to 8-12% MC."),
    ("FSC Eucalyptus Wood", "Eucalyptus grandis imported from certified forests in Uruguay. Dense grain for outdoor resilience."),
    ("FSC Teak (Tectona grandis)", "Premium grade teak imported from responsibly managed Mato Grosso plantations in Brazil."),
    ("Powder-Coated Aluminium", "Architectural grade alloy with multi-stage pre-treatment and durable exterior polyester coating.")
]

mat_y = 548
for title, desc in materials:
    p1.draw_rect(fitz.Rect(40, mat_y, 45, mat_y + 5), color=None, fill=C_TEAK)
    p1.insert_text(fitz.Point(52, mat_y + 6), title, fontsize=9, fontname="helv", color=C_FOREST)
    p1.insert_text(fitz.Point(52, mat_y + 18), desc, fontsize=8, fontname="helv", color=C_CHARCOAL)
    mat_y += 30

# Section 4: Operational Lead Times & Capabilities
p1.insert_text(fitz.Point(40, 680), "DEVELOPMENT LEAD TIMES & CAPABILITIES", fontsize=12, fontname="helv", color=C_FOREST)
p1.draw_line(fitz.Point(40, 686), fitz.Point(555.32, 686), color=C_TEAK, width=1.5)

lead_times = [
    ("Sample Prototyping", "Typical 7-14 days post-drawing & material confirmation"),
    ("New Order Production", "Typical 60-90 days depending on testing & programme scope"),
    ("Repeat Order Run", "Typical 45-60 days for established collection programmes"),
    ("Container Loading", "Flexible mixed-container loading across collection items")
]

lt_y = 702
for title, desc in lead_times:
    p1.insert_text(fitz.Point(45, lt_y), "•", fontsize=10, fontname="helv", color=C_TEAK)
    p1.insert_text(fitz.Point(55, lt_y), title + ":", fontsize=8.5, fontname="helv", color=C_FOREST)
    p1.insert_text(fitz.Point(175, lt_y), desc, fontsize=8.5, fontname="helv", color=C_CHARCOAL)
    lt_y += 18

# Bottom Footer
p1.draw_rect(fitz.Rect(0, 800, 595.32, 841.92), color=None, fill=C_FOREST)
p1.insert_text(fitz.Point(40, 822), "DHT Furniture Vietnam JSC  |  DHT Company Profile 2026", fontsize=8, fontname="helv", color=C_SAND)
p1.insert_text(fitz.Point(420, 822), "Official Publication  |  Page 1 of 2", fontsize=8, fontname="helv", color=C_SAND)

# ══════════════════════════════════════════════════════════════════
# PAGE 2: Product Ranges, Quality Assurance & Contact Info
# ══════════════════════════════════════════════════════════════════
p2 = doc.new_page(width=595.32, height=841.92)

# Top banner
p2.draw_rect(fitz.Rect(0, 0, 595.32, 70), color=None, fill=C_FOREST)
p2.draw_rect(fitz.Rect(0, 70, 595.32, 74), color=None, fill=C_TEAK)
p2.insert_text(fitz.Point(40, 42), "DHT FURNITURE VIETNAM — PROGRAMMES & ENGAGEMENT", fontsize=16, fontname="helv", color=C_WHITE)

# Section: Product Scope
p2.insert_text(fitz.Point(40, 105), "CORE PRODUCT PROGRAMMES", fontsize=12, fontname="helv", color=C_FOREST)
p2.draw_line(fitz.Point(40, 111), fitz.Point(555.32, 111), color=C_TEAK, width=1.5)

programmes = [
    ("Outdoor Lounge & Sofa Collections", "Modular seating, deep outdoor foam, weather-resistant rope and FSC teak/aluminium frames designed for hospitality and retail buyers."),
    ("Outdoor Dining Sets & Benches", "Solid FSC teak and acacia dining sets with powder-coated architectural metal accents. Engineered for structural endurance."),
    ("Sunloungers & Daybeds", "Ergonomic multi-position loungers and daybeds crafted from kiln-dried timber and exterior textilene/olefin fabrics."),
    ("Indoor Furniture & Custom Project OEM", "Contemporary living, dining, and bedroom furniture tailored to architectural developer briefs and bespoke client specifications.")
]

prog_y = 128
for p_title, p_desc in programmes:
    p2.draw_rect(fitz.Rect(40, prog_y, 555.32, prog_y + 36), color=C_SAND, fill=C_LIGHT_BG)
    p2.draw_rect(fitz.Rect(40, prog_y, 44, prog_y + 36), color=None, fill=C_FOREST)
    p2.insert_text(fitz.Point(52, prog_y + 15), p_title, fontsize=9, fontname="helv", color=C_FOREST)
    p2.insert_text(fitz.Point(52, prog_y + 28), p_desc, fontsize=7.5, fontname="helv", color=C_CHARCOAL)
    prog_y += 44

# Section: Quality Assurance & Factory Verification
p2.insert_text(fitz.Point(40, 325), "QUALITY MANAGEMENT & COMPLIANCE", fontsize=12, fontname="helv", color=C_FOREST)
p2.draw_line(fitz.Point(40, 331), fitz.Point(555.32, 331), color=C_TEAK, width=1.5)

qa_points = [
    ("Incoming Raw Material Audit:", "Moisture content inspection (8-12%), timber grain grade verification, FSC chain-of-custody."),
    ("In-Process Quality Control (IPQC):", "Dimension precision checks, joint mortise & tenon integrity, and surface sand-prep."),
    ("Finish & Coating Integrity:", "Multi-layer exterior PU, UV protective oils, and salt-spray corrosion resistance tests."),
    ("Pre-Shipment Inspection (PSI):", "AQL standard pre-shipment sampling, carton drop testing, and barcode validation.")
]

qa_y = 350
for title, desc in qa_points:
    p2.insert_text(fitz.Point(45, qa_y), "✓", fontsize=9, fontname="helv", color=C_TEAK)
    p2.insert_text(fitz.Point(58, qa_y), title, fontsize=8.5, fontname="helv", color=C_FOREST)
    p2.insert_text(fitz.Point(215, qa_y), desc, fontsize=8.5, fontname="helv", color=C_CHARCOAL)
    qa_y += 20

# Section: Factory Visits & Commercial Inquiry
p2.draw_rect(fitz.Rect(40, 450, 555.32, 545), color=C_SAND, fill=C_SAND)
p2.insert_text(fitz.Point(55, 475), "FACTORY VISITS & ON-SITE INSPECTIONS", fontsize=10, fontname="helv", color=C_TEAK)
visit_lines = [
    "To protect proprietary client designs and production confidentiality, factory visits across our 11 manufacturing",
    "facilities are arranged strictly by appointment following an initial review of your product scope and volume requirements.",
    "Showroom visits in Ho Chi Minh City can be scheduled with our commercial department at any time."
]
vy = 494
for line in visit_lines:
    p2.insert_text(fitz.Point(55, vy), line, fontsize=8.5, fontname="helv", color=C_CHARCOAL)
    vy += 15

# Section: Official Contacts Box
p2.insert_text(fitz.Point(40, 575), "OFFICIAL CORPORATE CONTACTS", fontsize=12, fontname="helv", color=C_FOREST)
p2.draw_line(fitz.Point(40, 581), fitz.Point(555.32, 581), color=C_TEAK, width=1.5)

p2.draw_rect(fitz.Rect(40, 595, 555.32, 765), color=C_FOREST, fill=C_LIGHT_BG)

p2.insert_text(fitz.Point(60, 620), "DHT Furniture Vietnam Joint Stock Company (DHT Furniture Vietnam JSC)", fontsize=10, fontname="helv", color=C_FOREST)
p2.insert_text(fitz.Point(60, 638), "General & Commercial Inquiries: sales@dhtcompany.com", fontsize=9, fontname="helv", color=C_CHARCOAL)

contacts = [
    ("Sales & International Export Hotline:", "+84 932 058 545"),
    ("Showroom & Factory Visit Scheduling:", "+84 907 386 898"),
    ("Production & Factory Operations:", "+84 902 907 399"),
    ("Corporate Website:", "https://dhtcompany.com"),
    ("Key Manufacturing Hubs:", "Binh Duong, Dong Nai, Phu Tho & Hanoi, Vietnam")
]

cy = 662
for lbl, val in contacts:
    p2.insert_text(fitz.Point(60, cy), lbl, fontsize=8.5, fontname="helv", color=C_MUTED)
    p2.insert_text(fitz.Point(260, cy), val, fontsize=8.5, fontname="helv", color=C_FOREST)
    cy += 18

p2.insert_text(fitz.Point(60, 752), "CONFIDENTIAL & PROPRIETARY — DHT FURNITURE VIETNAM 2026 EDITION", fontsize=7.5, fontname="helv", color=C_MUTED)

# Bottom Footer
p2.draw_rect(fitz.Rect(0, 800, 595.32, 841.92), color=None, fill=C_FOREST)
p2.insert_text(fitz.Point(40, 822), "DHT Furniture Vietnam JSC  |  DHT Company Profile 2026", fontsize=8, fontname="helv", color=C_SAND)
p2.insert_text(fitz.Point(420, 822), "Official Publication  |  Page 2 of 2", fontsize=8, fontname="helv", color=C_SAND)

doc.save(pdf_path)
doc.close()

print(f"SUCCESS: Generated {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
