// productData.js — 80 realistic products across 10 categories
// Each product: [title, price, description, rating, imageId]
// imageId is the Unsplash photo ID used to build the URL

const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=600`;

const raw = {

  Smartphones: [
    ["iPhone 15 Pro Max", 1199, "Titanium design, A17 Pro chip, 48MP camera system.", 4.8, "1695048133142-1a20484d2569"],
    ["Samsung Galaxy S24 Ultra", 1299, "AI-powered Galaxy with S Pen, 200MP camera.", 4.7, "1610945265295-0d97e6e9c0d3"],
    ["Google Pixel 8 Pro", 999, "AI-first phone with Tensor G3 and advanced camera.", 4.6, "1598327105666-5b89351aff97"],
    ["OnePlus 12", 799, "Snapdragon 8 Gen 3, Hasselblad camera, 100W charging.", 4.5, "1511707171634-5f897ff02aa6"],
    ["Xiaomi 14 Pro", 699, "Leica optics, Snapdragon 8 Gen 3, 120W HyperCharge.", 4.3, "1592899677977-9c10ca588bbd"],
    ["Sony Xperia 1 V", 1099, "4K OLED display, pro-level camera sensors.", 4.4, "1585060544812-6b45742d762f"],
    ["Nothing Phone 2", 599, "Unique Glyph interface, clean OS, Snapdragon 8+.", 4.2, "1574944985070-8f3ebc6b79d2"],
    ["Motorola Edge 40 Pro", 649, "Curved 165Hz display, 125W TurboPower charging.", 4.1, "1556656722-a1e09f79a5b2"],
  ],
  Laptops: [
    ["MacBook Pro 16 M3 Max", 2499, "M3 Max chip, 36GB RAM, Liquid Retina XDR display.", 4.9, "1517336714731-489689fd1ca8"],
    ["Dell XPS 15", 1899, "15.6\" 4K OLED, Intel i9, premium aluminum build.", 4.7, "1593642632823-8f785ba67e45"],
    ["Lenovo ThinkPad X1 Carbon", 1499, "Ultralight business laptop, legendary keyboard.", 4.6, "1603302576837-37561b2e2302"],
    ["ASUS ROG Zephyrus G14", 1399, "Portable gaming, RTX 4060, Ryzen 9 processor.", 4.5, "1593640408182-31c70c8268f5"],
    ["HP Spectre x360", 1599, "2-in-1 convertible, OLED touch, Intel Evo.", 4.4, "1496181133206-80ce9b88a853"],
    ["Microsoft Surface Laptop 5", 1299, "PixelSense touchscreen, Alcantara deck.", 4.3, "1525547719571-a2d4ac8945e2"],
    ["Razer Blade 15", 2199, "RTX 4070, 240Hz QHD display, CNC aluminum.", 4.5, "1629131726692-1accd0c53ce0"],
    ["Acer Swift 5", 1099, "Ultra-thin, 14\" 2K display, Intel i7, all-day battery.", 4.2, "1588872657578-7efd1f1555ed"],
  ],
  Headphones: [
    ["Sony WH-1000XM5", 349, "Industry-leading noise cancelling, 30hr battery.", 4.8, "1505740420928-5e560c06d30e"],
    ["Bose QuietComfort Ultra", 429, "Spatial audio, world-class ANC, plush comfort.", 4.7, "1546435770-a3e426bf472b"],
    ["Apple AirPods Max", 549, "High-fidelity audio, Digital Crown, premium build.", 4.6, "1613040809024-b4ef7ba99bc3"],
    ["Sennheiser Momentum 4", 349, "Audiophile sound, adaptive ANC, 60hr battery.", 4.7, "1618366712010-f4ae9c647dcb"],
    ["JBL Tour One M2", 299, "True adaptive ANC, Hi-Res certified, 50hr battery.", 4.3, "1583394838223-afd64e72b4b0"],
    ["Bose 700", 379, "11 levels of noise cancelling, elegant design.", 4.5, "1484704849700-f032a568e944"],
    ["Audio-Technica ATH-M50xBT2", 199, "Studio monitor quality in a wireless package.", 4.4, "1545127398-14699f92334b"],
    ["Beats Studio Pro", 349, "Personalized spatial audio, USB-C, 40hr battery.", 4.2, "1524678606370-a47ad25cb82a"],
  ],
  Smartwatches: [
    ["Apple Watch Ultra 2", 799, "Rugged titanium, precision GPS, 36hr battery.", 4.8, "1434493789847-2a75b0b74e93"],
    ["Samsung Galaxy Watch 6 Classic", 399, "Rotating bezel, BioActive sensor, Wear OS.", 4.5, "1579586337278-3befd40fd17a"],
    ["Garmin Fenix 7X Solar", 899, "Solar charging, topo maps, advanced training.", 4.7, "1508685096489-7aacd43bd3b1"],
    ["Google Pixel Watch 2", 349, "Fitbit health, Google AI, domed AMOLED display.", 4.3, "1523275335684-37898b6baf30"],
    ["Fitbit Sense 2", 249, "Stress management, ECG app, skin temperature.", 4.2, "1576243345690-4e4b79b63288"],
    ["Amazfit GTR 4", 199, "Dual-band GPS, 150+ sports modes, 14-day battery.", 4.1, "1510017803395-36b6e7e3d22e"],
    ["Suunto 9 Peak Pro", 499, "Ultra-thin GPS watch, 40hr GPS battery.", 4.4, "1557438159-51eec7a6c9e8"],
    ["TicWatch Pro 5", 329, "Dual display, Snapdragon W5+ Gen 1, Wear OS.", 4.0, "1550009158-9ebf5e3c0a2e"],
  ],
  Accessories: [
    ["Logitech MX Master 3S", 99, "Precision mouse, quiet clicks, ergonomic design.", 4.7, "1527864550417-7fd91fc51a46"],
    ["Anker 737 Power Bank 24K", 149, "24,000mAh, 140W two-way fast charging.", 4.5, "1609081219090-a6d81d3085bf"],
    ["Keychron Q1 Pro Keyboard", 199, "Wireless mechanical, CNC aluminum, 75% layout.", 4.6, "1595225476474-87563907a212"],
    ["Belkin MagSafe 3-in-1 Charger", 149, "Charge iPhone, Watch, AirPods simultaneously.", 4.3, "1615526675159-e248c3021d3f"],
    ["Apple AirTag 4 Pack", 99, "Precision finding, Find My network, replaceable battery.", 4.4, "1592890288564-76628a30a657"],
    ["CalDigit TS4 Thunderbolt Dock", 359, "18 ports, 98W charging, Thunderbolt 4.", 4.6, "1625842268223-42889941744e"],
    ["Nomad Base One Charger", 89, "MagSafe compatible, metal + glass build.", 4.2, "1616763355548-1b3825305841"],
    ["Razer Viper V2 Pro Mouse", 149, "Ultra-light 58g, 30K DPI, wireless gaming.", 4.5, "1563297007-8f64fefe3f4d"],
  ],
  Gaming: [
    ["PlayStation 5", 499, "Ray tracing, 4K gaming, DualSense controller.", 4.8, "1606144042614-b2417e99c4e3"],
    ["Xbox Series X", 499, "12 TF GPU, 1TB SSD, backward compatible.", 4.7, "1621259182978-fbf93caace7a"],
    ["Nintendo Switch OLED", 349, "7\" OLED screen, enhanced audio, wide stand.", 4.6, "1578303512597-81e6cc155b3e"],
    ["Steam Deck OLED", 549, "Portable PC gaming, HDR OLED, SteamOS.", 4.5, "1612287230202-1ff1d85d1bdf"],
    ["Razer Kishi V2 Controller", 99, "Universal mobile controller, console-quality.", 4.2, "1580327344013-420f21556528"],
    ["Elgato Stream Deck MK.2", 149, "15 LCD keys, customizable, one-touch streaming.", 4.4, "1616588589676-62b3ffd7ff72"],
    ["SteelSeries Arctis Nova Pro", 349, "Hi-Fi gaming audio, ANC, hot-swap battery.", 4.6, "1558742619-fd82741daa55"],
    ["Corsair K100 RGB Keyboard", 229, "OPX optical switches, iCUE control wheel.", 4.5, "1587829741301-dc798b83add3"],
  ],
  Cameras: [
    ["Sony A7 IV", 2499, "33MP full-frame, 4K60, real-time Eye AF.", 4.8, "1516035069371-29a1b244cc32"],
    ["Canon EOS R6 Mark II", 2299, "24.2MP, 40fps burst, 6K oversampled 4K.", 4.7, "1502920917128-1aa500764cbd"],
    ["Fujifilm X-T5", 1699, "40MP APS-C, film simulations, retro body.", 4.6, "1452780212940-6f5c0d14d848"],
    ["Nikon Z6 III", 2499, "Partially stacked CMOS, 6K, pro video features.", 4.5, "1495707902641-32ee59abf7f7"],
    ["GoPro Hero 12 Black", 399, "5.3K60, HyperSmooth 6.0, Max Lens Mod 2.0.", 4.4, "1516961642265-531546e84af2"],
    ["DJI Osmo Action 4", 349, "1/1.3\" sensor, 4K120, dual touchscreens.", 4.3, "1533310266094-8898a5f7017d"],
    ["Panasonic Lumix S5 II", 1999, "Phase-detect AF, 6K, dual image stabilization.", 4.5, "1520390138845-fd82a4f032f4"],
    ["Leica Q3", 5995, "60MP full-frame, Summilux 28mm f/1.7, built-in EVF.", 4.9, "1617005082133-18e12581f227"],
  ],
  Speakers: [
    ["Sonos Era 300", 449, "Spatial audio, Dolby Atmos, Trueplay tuning.", 4.7, "1545454675-9e93cce6b132"],
    ["JBL Charge 5", 179, "IP67 waterproof, 20hr battery, powerbank feature.", 4.5, "1608043152269-423dbba4e7e1"],
    ["Bose SoundLink Flex", 149, "Rugged portable, deep bass, PositionIQ.", 4.4, "1558089687-f282ffcbc126"],
    ["Marshall Stanmore III", 379, "Iconic design, Bluetooth 5.2, dynamic loudness.", 4.6, "1507646227500-4d389d6b03aa"],
    ["Apple HomePod 2nd Gen", 299, "Room-sensing, spatial audio, smart home hub.", 4.3, "1543512214277-4d5349a22e8c"],
    ["Bang & Olufsen Beosound A1", 279, "Portable, Alexa built-in, IP67, 18hr battery.", 4.5, "1560343090-f0409e92791a"],
    ["UE Megaboom 3", 199, "360° sound, IP67, Magic Button, 20hr battery.", 4.4, "1519677100203-a9e07e0c4e3e"],
    ["Harman Kardon Aura Studio 3", 229, "Ambient lighting, 360° sound, iconic design.", 4.3, "1596455397616-2636879f1e0b"],
  ],
  Monitors: [
    ["LG UltraGear 27GP850-B", 449, "27\" QHD Nano IPS, 165Hz, 1ms, HDR 400.", 4.6, "1527443224154-c4a3942d3acf"],
    ["Samsung Odyssey G7", 699, "32\" QHD curved, 240Hz, 1ms, QLED.", 4.5, "1585792180666-f7fbdb0e7887"],
    ["Dell UltraSharp U2723QE", 619, "27\" 4K IPS Black, USB-C hub, factory calibrated.", 4.7, "1593062096033-9a26b09da705"],
    ["ASUS ProArt PA278QV", 349, "27\" QHD, Calman verified, factory calibrated.", 4.4, "1550745165-9bc0b252726f"],
    ["BenQ PD2706U", 629, "27\" 4K, USB-C 96W, Mac-ready, AQCOLOR.", 4.5, "1586210434560-c8e2f3a3d6b5"],
    ["Apple Studio Display", 1599, "27\" 5K Retina, A13 chip, studio-quality camera.", 4.6, "1611186871348-b1ce696e52c9"],
    ["Alienware AW3423DWF", 1099, "34\" QD-OLED curved, 165Hz, true blacks.", 4.7, "1614624532983-4ce03382d63d"],
    ["LG 34WN80C-B", 499, "34\" UltraWide QHD IPS, USB-C 60W, HDR 10.", 4.3, "1551645661-2a555842bab1"],
  ],
  "Storage Devices": [
    ["Samsung T7 Shield 2TB", 159, "Rugged portable SSD, 1,050MB/s, IP65.", 4.6, "1597848212624-a19eb35e2651"],
    ["WD Black SN850X 2TB", 189, "PCIe Gen4 NVMe, 7,300MB/s read, heatsink.", 4.7, "1531492746076-161ca9bcad09"],
    ["Seagate Expansion 4TB", 99, "Portable HDD, drag-and-drop, USB 3.0.", 4.2, "1601737487795-dab272f52420"],
    ["SanDisk Extreme Pro SSD 2TB", 179, "2,000MB/s, IP55, forged aluminum.", 4.5, "1618410320928-25228d811631"],
    ["Kingston XS2000 2TB", 149, "Pocket-sized SSD, 2,000MB/s, USB 3.2.", 4.3, "1628557044797-f21a177c37ec"],
    ["Crucial X9 Pro 2TB", 139, "Compact SSD, 1,050MB/s, works with Mac/PC.", 4.4, "1612815154858-60aa4c59eaa6"],
    ["LaCie Rugged Mini 4TB", 129, "Drop/crush/rain resistant portable HDD.", 4.2, "1597848212624-a19eb35e2652"],
    ["Samsung 990 Pro 2TB", 209, "PCIe Gen4 NVMe, 7,450MB/s, PS5 compatible.", 4.8, "1597872200969-2b65d56bd16b"],
  ],
};

// Build the full products array
const products = [];
for (const [category, items] of Object.entries(raw)) {
  for (const [title, price, description, rating, imageId] of items) {
    products.push({ title, price, description, rating, category, image: IMG(imageId) });
  }
}

module.exports = products;