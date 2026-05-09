// productData.js — 80 realistic products across 10 categories
// Each product: [title, price, description, rating, imageId]
// imageId is the Unsplash photo ID used to build the URL

const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=600`;

const raw = {
  Smartphones: [
    ["iPhone 15 Pro Max", 159900, "Titanium design, A17 Pro chip, 48MP camera system.", 4.8, "1695048133142-1a20484d2569"],
    ["Samsung Galaxy S24 Ultra", 129999, "AI-powered Galaxy with S Pen, 200MP camera.", 4.7, "1520170350707-b2da59970118"],
    ["Google Pixel 8 Pro", 106990, "AI-first phone with Tensor G3 and advanced camera.", 4.6, "1598327105666-5b89351aff97"],
    ["OnePlus 12", 64999, "Snapdragon 8 Gen 3, Hasselblad camera, 100W charging.", 4.5, "1504274066651-8d31a536b11a"],
    ["Xiaomi 14 Pro", 79999, "Leica optics, Snapdragon 8 Gen 3, 120W HyperCharge.", 4.3, "1592899677977-9c10ca588bbd"],
    ["Sony Xperia 1 V", 94990, "4K OLED display, pro-level camera sensors.", 4.4, "1585060544812-6b45742d762f"],
    ["Nothing Phone 2", 44999, "Unique Glyph interface, clean OS, Snapdragon 8+.", 4.2, "1574944985070-8f3ebc6b79d2"],
    ["Motorola Edge 40 Pro", 49999, "Curved 165Hz display, 125W TurboPower charging.", 4.1, "4f7r1LuPYj8"],
  ],
  Laptops: [
    ["MacBook Pro 16 M3 Max", 349900, "M3 Max chip, 36GB RAM, Liquid Retina XDR display.", 4.9, "1517336714731-489689fd1ca8"],
    ["Dell XPS 15", 249990, "15.6\" 4K OLED, Intel i9, premium aluminum build.", 4.7, "1593642632823-8f785ba67e45"],
    ["Lenovo ThinkPad X1 Carbon", 165000, "Ultralight business laptop, legendary keyboard.", 4.6, "1603302576837-37561b2e2302"],
    ["ASUS ROG Zephyrus G14", 149990, "Portable gaming, RTX 4060, Ryzen 9 processor.", 4.5, "1593640408182-31c70c8268f5"],
    ["HP Spectre x360", 154990, "2-in-1 convertible, OLED touch, Intel Evo.", 4.4, "1496181133206-80ce9b88a853"],
    ["Microsoft Surface Laptop 5", 115990, "PixelSense touchscreen, Alcantara deck.", 4.3, "1525547719571-a2d4ac8945e2"],
    ["Razer Blade 15", 289990, "RTX 4070, 240Hz QHD display, CNC aluminum.", 4.5, "1629131726692-1accd0c53ce0"],
    ["Acer Swift 5", 94990, "Ultra-thin, 14\" 2K display, Intel i7, all-day battery.", 4.2, "1588872657578-7efd1f1555ed"],
  ],
  Headphones: [
    ["Sony WH-1000XM5", 29990, "Industry-leading noise cancelling, 30hr battery.", 4.8, "1505740420928-5e560c06d30e"],
    ["Bose QuietComfort Ultra", 35900, "Spatial audio, world-class ANC, plush comfort.", 4.7, "1546435770-a3e426bf472b"],
    ["Apple AirPods Max", 59900, "High-fidelity audio, Digital Crown, premium build.", 4.6, "1613040809024-b4ef7ba99bc3"],
    ["Sennheiser Momentum 4", 34990, "Audiophile sound, adaptive ANC, 60hr battery.", 4.7, "1618366712010-f4ae9c647dcb"],
    ["JBL Tour One M2", 24999, "True adaptive ANC, Hi-Res certified, 50hr battery.", 4.3, "1628126235206-5260b9ea6441"],
    ["Bose 700", 29900, "11 levels of noise cancelling, elegant design.", 4.5, "1484704849700-f032a568e944"],
    ["Audio-Technica ATH-M50xBT2", 18990, "Studio monitor quality in a wireless package.", 4.4, "1545127398-14699f92334b"],
    ["Beats Studio Pro", 27990, "Personalized spatial audio, USB-C, 40hr battery.", 4.2, "1524678606370-a47ad25cb82a"],
  ],
  Smartwatches: [
    ["Apple Watch Ultra 2", 89900, "Rugged titanium, precision GPS, 36hr battery.", 4.8, "1524805444758-089113d48a6d"],
    ["Samsung Galaxy Watch 6 Classic", 36999, "Rotating bezel, BioActive sensor, Wear OS.", 4.5, "1579586337278-3befd40fd17a"],
    ["Garmin Fenix 7X Solar", 93990, "Solar charging, topo maps, advanced training.", 4.7, "1508685096489-7aacd43bd3b1"],
    ["Google Pixel Watch 2", 39990, "Fitbit health, Google AI, domed AMOLED display.", 4.3, "1523275335684-37898b6baf30"],
    ["Fitbit Sense 2", 24999, "Stress management, ECG app, skin temperature.", 4.2, "1576243345690-4e4b79b63288"],
    ["Amazfit GTR 4", 16999, "Dual-band GPS, 150+ sports modes, 14-day battery.", 4.1, "x_jTtMOOMd4"],
    ["Suunto 9 Peak Pro", 44990, "Ultra-thin GPS watch, 40hr GPS battery.", 4.4, "1557438159-51eec7a6c9e8"],
    ["TicWatch Pro 5", 29999, "Dual display, Snapdragon W5+ Gen 1, Wear OS.", 4.0, "xpkmxDGPz0Y"],
  ],
  Accessories: [
    ["Logitech MX Master 3S", 10995, "Precision mouse, quiet clicks, ergonomic design.", 4.7, "1527864550417-7fd91fc51a46"],
    ["Anker 737 Power Bank 24K", 12999, "24,000mAh, 140W two-way fast charging.", 4.5, "1609081219090-a6d81d3085bf"],
    ["Keychron Q1 Pro Keyboard", 17999, "Wireless mechanical, CNC aluminum, 75% layout.", 4.6, "1595225476474-87563907a212"],
    ["Belkin MagSafe 3-in-1 Charger", 13990, "Charge iPhone, Watch, AirPods simultaneously.", 4.3, "1615526675159-e248c3021d3f"],
    ["Apple AirTag 4 Pack", 11900, "Precision finding, Find My network, replaceable battery.", 4.4, "1592890288564-76628a30a657"],
    ["CalDigit TS4 Thunderbolt Dock", 34990, "18 ports, 98W charging, Thunderbolt 4.", 4.6, "1584438784894-089d6a62b8fa"],
    ["Nomad Base One Charger", 8990, "MagSafe compatible, metal + glass build.", 4.2, "tVIqMgGlAG0"],
    ["Razer Viper V2 Pro Mouse", 12999, "Ultra-light 58g, 30K DPI, wireless gaming.", 4.5, "xPfj_Kdcal4"],
  ],
  Gaming: [
    ["PlayStation 5", 54990, "Ray tracing, 4K gaming, DualSense controller.", 4.8, "1606144042614-b2417e99c4e3"],
    ["Xbox Series X", 54990, "12 TF GPU, 1TB SSD, backward compatible.", 4.7, "1486401899868-0e435ed85128"],
    ["Nintendo Switch OLED", 32990, "7\" OLED screen, enhanced audio, wide stand.", 4.6, "1578303512597-81e6cc155b3e"],
    ["Steam Deck OLED", 49990, "Portable PC gaming, HDR OLED, SteamOS.", 4.5, "1612287230202-1ff1d85d1bdf"],
    ["Razer Kishi V2 Controller", 9999, "Universal mobile controller, console-quality.", 4.2, "1552820728-8b83bb6b773f"],
    ["Elgato Stream Deck MK.2", 14999, "15 LCD keys, customizable, one-touch streaming.", 4.4, "revxuIor0nY"],
    ["SteelSeries Arctis Nova Pro", 29990, "Hi-Fi gaming audio, ANC, hot-swap battery.", 4.6, "OODWPtfXAF0"],
    ["Corsair K100 RGB Keyboard", 22999, "OPX optical switches, iCUE control wheel.", 4.5, "1587829741301-dc798b83add3"],
  ],
  Cameras: [
    ["Sony A7 IV", 229990, "33MP full-frame, 4K60, real-time Eye AF.", 4.8, "1516035069371-29a1b244cc32"],
    ["Canon EOS R6 Mark II", 215990, "24.2MP, 40fps burst, 6K oversampled 4K.", 4.7, "1502920917128-1aa500764cbd"],
    ["Fujifilm X-T5", 149990, "40MP APS-C, film simulations, retro body.", 4.6, "1452780212940-6f5c0d14d848"],
    ["Nikon Z6 III", 224990, "Partially stacked CMOS, 6K, pro video features.", 4.5, "1512790182412-b19e6d62bc39"],
    ["GoPro Hero 12 Black", 39990, "5.3K60, HyperSmooth 6.0, Max Lens Mod 2.0.", 4.4, "1516961642265-531546e84af2"],
    ["DJI Osmo Action 4", 32990, "1/1.3\" sensor, 4K120, dual touchscreens.", 4.3, "1500634245200-e5245c7574ef"],
    ["Panasonic Lumix S5 II", 184990, "Phase-detect AF, 6K, dual image stabilization.", 4.5, "1516724562728-afc824a36e84"],
    ["Leica Q3", 599900, "60MP full-frame, Summilux 28mm f/1.7, built-in EVF.", 4.9, "GG0jOrmwqtw"],
  ],
  Speakers: [
    ["Sonos Era 300", 44900, "Spatial audio, Dolby Atmos, Trueplay tuning.", 4.7, "VkuuTRkcRqw"],
    ["JBL Charge 5", 14999, "IP67 waterproof, 20hr battery, powerbank feature.", 4.5, "1608043152269-423dbba4e7e1"],
    ["Bose SoundLink Flex", 12900, "Rugged portable, deep bass, PositionIQ.", 4.4, "1558089687-f282ffcbc126"],
    ["Marshall Stanmore III", 36999, "Iconic design, Bluetooth 5.2, dynamic loudness.", 4.6, "TuOiIpkIea8"],
    ["Apple HomePod 2nd Gen", 32900, "Room-sensing, spatial audio, smart home hub.", 4.3, "6xqAK6oAeHA"],
    ["Bang & Olufsen Beosound A1", 25900, "Portable, Alexa built-in, IP67, 18hr battery.", 4.5, "1560343090-f0409e92791a"],
    ["UE Megaboom 3", 17999, "360° sound, IP67, Magic Button, 20hr battery.", 4.4, "KSyemQIWwP8"],
    ["Harman Kardon Aura Studio 3", 24990, "Ambient lighting, 360° sound, iconic design.", 4.3, "v9eNihIWh8k"],
  ],
  Monitors: [
    ["LG UltraGear 27GP850-B", 34990, "27\" QHD Nano IPS, 165Hz, 1ms, HDR 400.", 4.6, "1527443224154-c4a3942d3acf"],
    ["Samsung Odyssey G7", 59990, "32\" QHD curved, 240Hz, 1ms, QLED.", 4.5, "1542831371-29b0f74f9713"],
    ["Dell UltraSharp U2723QE", 52990, "27\" 4K IPS Black, USB-C hub, factory calibrated.", 4.7, "1593062096033-9a26b09da705"],
    ["ASUS ProArt PA278QV", 29990, "27\" QHD, Calman verified, factory calibrated.", 4.4, "1550745165-9bc0b252726f"],
    ["BenQ PD2706U", 54990, "27\" 4K, USB-C 96W, Mac-ready, AQCOLOR.", 4.5, "1517059224940-d4af9eec41b7"],
    ["Apple Studio Display", 159900, "27\" 5K Retina, A13 chip, studio-quality camera.", 4.6, "1611186871348-b1ce696e52c9"],
    ["Alienware AW3423DWF", 99990, "34\" QD-OLED curved, 165Hz, true blacks.", 4.7, "1614624532983-4ce03382d63d"],
    ["LG 34WN80C-B", 42990, "34\" UltraWide QHD IPS, USB-C 60W, HDR 10.", 4.3, "Acfgb7bc-Bc"],
  ],
  "Storage Devices": [
    ["Samsung T7 Shield 2TB", 14999, "Rugged portable SSD, 1,050MB/s, IP65.", 4.6, "1597848212624-a19eb35e2651"],
    ["WD Black SN850X 2TB", 16999, "PCIe Gen4 NVMe, 7,300MB/s read, heatsink.", 4.7, "1563206767-5b18f218e8de"],
    ["Seagate Expansion 4TB", 8999, "Portable HDD, drag-and-drop, USB 3.0.", 4.2, "1601737487795-dab272f52420"],
    ["SanDisk Extreme Pro SSD 2TB", 18999, "2,000MB/s, IP55, forged aluminum.", 4.5, "1618410320928-25228d811631"],
    ["Kingston XS2000 2TB", 13999, "Pocket-sized SSD, 2,000MB/s, USB 3.2.", 4.3, "1628557044797-f21a177c37ec"],
    ["Crucial X9 Pro 2TB", 12499, "Compact SSD, 1,050MB/s, works with Mac/PC.", 4.4, "1612815154858-60aa4c59eaa6"],
    ["LaCie Rugged Mini 4TB", 11999, "Drop/crush/rain resistant portable HDD.", 4.2, "1544654803-b69140b285a1"],
    ["Samsung 990 Pro 2TB", 18999, "PCIe Gen4 NVMe, 7,450MB/s, PS5 compatible.", 4.8, "1597872200969-2b65d56bd16b"],
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
