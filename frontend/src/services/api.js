import axios from 'axios';

const API_BASE_URL = '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchDashboard = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data.data;
  } catch (error) {
    console.warn('[API Client] Backend unreachable, returning fallback mock dataset.', error);
    return getFallbackDashboard();
  }
};

export const fetchDrones = async (params = {}) => {
  try {
    const response = await apiClient.get('/drones', { params });
    return response.data.data;
  } catch (error) {
    return getFallbackDrones();
  }
};

export const fetchVisionDetections = async (params = {}) => {
  try {
    const response = await apiClient.get('/vision/detections', { params });
    return response.data.data;
  } catch (error) {
    return getFallbackVisionDetections();
  }
};

export const fetchCoralReefs = async () => {
  try {
    const response = await apiClient.get('/coral/reefs');
    return response.data.data;
  } catch (error) {
    return getFallbackCoralReefs();
  }
};

export const fetchSpecies = async (params = {}) => {
  try {
    const response = await apiClient.get('/species', { params });
    return response.data.data;
  } catch (error) {
    return getFallbackSpecies();
  }
};

export const fetchSectors = async () => {
  try {
    const response = await apiClient.get('/atlas/sectors');
    return response.data.data;
  } catch (error) {
    return getFallbackSectors();
  }
};

export const fetchRiskForecast = async () => {
  try {
    const response = await apiClient.get('/risk/forecast');
    return response.data.data;
  } catch (error) {
    return getFallbackRiskForecast();
  }
};

export const fetchAnalytics = async () => {
  try {
    const response = await apiClient.get('/analytics');
    return response.data.data;
  } catch (error) {
    return getFallbackAnalytics();
  }
};

export const fetchAlerts = async (params = {}) => {
  try {
    const response = await apiClient.get('/alerts', { params });
    return response.data.data;
  } catch (error) {
    return getFallbackAlerts();
  }
};

export const markAlertRead = async (id) => {
  try {
    const response = await apiClient.patch(`/alerts/${id}/read`);
    return response.data.data;
  } catch (error) {
    return { id, read: true };
  }
};

export const fetchWeather = async () => {
  try {
    const response = await apiClient.get('/weather');
    return response.data.data;
  } catch (error) {
    return getFallbackWeather();
  }
};

export const fetchProfile = async () => {
  try {
    const response = await apiClient.get('/profile');
    return response.data.data;
  } catch (error) {
    return getFallbackProfile();
  }
};

export const fetchSettings = async () => {
  try {
    const response = await apiClient.get('/settings');
    return response.data.data;
  } catch (error) {
    return getFallbackSettings();
  }
};

// Fallback Mock Implementations
function getFallbackDashboard() {
  return {
    kpis: {
      activeDrones: 18,
      activeDronesDelta: "+2 Today",
      pollutionHotspots: 142,
      pollutionHotspotsDelta: "-8% this week",
      coralHealthIndex: 84.2,
      coralHealthDelta: "+1.4% vs last mo",
      waterQualityScore: 91,
      waterQualityDelta: "Optimal Grade A",
      environmentalRisk: "Low-Moderate",
      riskIndexScore: 32,
      speciesTracked: 1420
    },
    dronesSummary: getFallbackDrones().slice(0, 4),
    topDetections: getFallbackVisionDetections().slice(0, 3),
    coralSummary: getFallbackCoralReefs(),
    liveFeed: [
      { id: "EV-901", time: "18:24:10", type: "POLLUTION_DETECTED", title: "Ghost Net Detected", sector: "Sector SEC-B4", confidence: "96.4%", severity: "CRITICAL" },
      { id: "EV-902", time: "18:20:05", type: "DRONE_TELEMETRY", title: "Drone DR-003 reached waypoint", sector: "Abyssal Trench SEC-C1", confidence: "100%", severity: "INFO" },
      { id: "EV-903", time: "18:15:30", type: "CORAL_ALERT", title: "Coral thermal threshold alert", sector: "Sector SEC-C1", confidence: "92.0%", severity: "WARNING" }
    ],
    weather: getFallbackWeather(),
    riskIndexScore: 32
  };
}

function getFallbackDrones() {
  return [
    {
      id: "DR-001",
      name: "Triton Sentinel I",
      model: "AUV-X5 Deep Explorer",
      status: "ACTIVE",
      battery: 88,
      depth: 284,
      maxDepth: 1200,
      speed: 3.4,
      heading: 142,
      signal: 96,
      signalStatus: "EXCELLENT",
      mission: "Plastic Pollution Survey",
      sector: "SEC-B4",
      latitude: 12.92453,
      longitude: 73.14482,
      cameraStatus: "ONLINE",
      temperature: 18.4,
      salinity: 35.2,
      oxygenLevel: 6.8,
      remainingTimeMin: 142,
      streamUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-002",
      name: "Nautilus Scan II",
      model: "Glider-7 Micro-Sub",
      status: "ACTIVE",
      battery: 64,
      depth: 512,
      maxDepth: 2000,
      speed: 2.1,
      heading: 210,
      signal: 84,
      signalStatus: "GOOD",
      mission: "Coral Reef Bleaching Audit",
      sector: "SEC-A2",
      latitude: 14.1124,
      longitude: 72.8441,
      cameraStatus: "ONLINE",
      temperature: 16.1,
      salinity: 35.5,
      oxygenLevel: 6.2,
      remainingTimeMin: 98,
      streamUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-003",
      name: "Abyssal Watcher III",
      model: "ROV-Titan Trench Probe",
      status: "ACTIVE",
      battery: 92,
      depth: 1840,
      maxDepth: 4000,
      speed: 1.8,
      heading: 45,
      signal: 78,
      signalStatus: "STABLE",
      mission: "Hydrothermal Vent Analysis",
      sector: "SEC-C1",
      latitude: 11.4589,
      longitude: 74.2210,
      cameraStatus: "ONLINE",
      temperature: 4.2,
      salinity: 36.1,
      oxygenLevel: 4.5,
      remainingTimeMin: 210,
      streamUrl: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-004",
      name: "Poseidon EcoScan IV",
      model: "AUM-Spectra 3000",
      status: "CHARGING",
      battery: 28,
      depth: 0,
      maxDepth: 800,
      speed: 0.0,
      heading: 0,
      signal: 100,
      signalStatus: "EXCELLENT",
      mission: "Docked at Vessel Research Alpha",
      sector: "SEC-B4",
      latitude: 12.9110,
      longitude: 73.1200,
      cameraStatus: "STANDBY",
      temperature: 26.5,
      salinity: 34.9,
      oxygenLevel: 7.2,
      remainingTimeMin: 0,
      streamUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-005",
      name: "Leviathan Scout V",
      model: "Bionic Stingray-X",
      status: "ACTIVE",
      battery: 77,
      depth: 145,
      maxDepth: 600,
      speed: 4.2,
      heading: 315,
      signal: 91,
      signalStatus: "EXCELLENT",
      mission: "Blue Whale Pod Telemetry",
      sector: "SEC-A3",
      latitude: 13.8812,
      longitude: 71.9421,
      cameraStatus: "ONLINE",
      temperature: 22.8,
      salinity: 35.0,
      oxygenLevel: 7.0,
      remainingTimeMin: 165,
      streamUrl: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-006",
      name: "Oceanus Patrol VI",
      model: "Drone-Interceptor 900",
      status: "MAINTENANCE",
      battery: 100,
      depth: 0,
      maxDepth: 1500,
      speed: 0.0,
      heading: 0,
      signal: 100,
      signalStatus: "STABLE",
      mission: "Scheduled Thruster Calibration",
      sector: "SEC-BASE",
      latitude: 12.8900,
      longitude: 73.0500,
      cameraStatus: "OFFLINE",
      temperature: 27.1,
      salinity: 34.8,
      oxygenLevel: 7.4,
      remainingTimeMin: 0,
      streamUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-007",
      name: "AeroSkimmer Hydro-Jet VII",
      model: "Skimmer-V3 Surface Craft",
      status: "ACTIVE",
      battery: 95,
      depth: 0,
      maxDepth: 50,
      speed: 6.8,
      heading: 180,
      signal: 99,
      signalStatus: "EXCELLENT",
      mission: "Surface Micro-Plastic Skimming",
      sector: "SEC-B4",
      latitude: 12.9410,
      longitude: 73.1820,
      cameraStatus: "ONLINE",
      temperature: 28.1,
      salinity: 35.1,
      oxygenLevel: 7.1,
      remainingTimeMin: 240,
      streamUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "DR-008",
      name: "Abyss Crawler VIII",
      model: "Benthic Crawler Probe",
      status: "ACTIVE",
      battery: 81,
      depth: 2150,
      maxDepth: 5000,
      speed: 1.2,
      heading: 90,
      signal: 76,
      signalStatus: "STABLE",
      mission: "Benthic Sediment Heavy Metal Assay",
      sector: "SEC-C1",
      latitude: 11.4710,
      longitude: 74.2380,
      cameraStatus: "ONLINE",
      temperature: 3.8,
      salinity: 36.3,
      oxygenLevel: 4.2,
      remainingTimeMin: 180,
      streamUrl: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80"
    }
  ];
}

function getFallbackVisionDetections() {
  return [
    {
      id: "DET-2013",
      type: "Abandoned Ghost Fishing Net",
      category: "PLASTIC_DEBRIS",
      confidence: 96.4,
      severity: "CRITICAL",
      sector: "SEC-B4",
      latitude: 12.9281,
      longitude: 73.1499,
      droneId: "DR-001",
      timestamp: "2026-07-23T18:15:32Z",
      dimensions: "14m x 6m",
      estimatedMassKg: 180,
      imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 22, y: 18, width: 55, height: 60 },
      recommendation: "Deploy Vessel Alpha Recovery Team with winch gear to prevent marine entanglement.",
      status: "PENDING_RECOVERY"
    },
    {
      id: "DET-2014",
      type: "Micro-Plastic Accumulation Slick",
      category: "MICROPLASTIC",
      confidence: 91.2,
      severity: "HIGH",
      sector: "SEC-A2",
      latitude: 14.1205,
      longitude: 72.8512,
      droneId: "DR-002",
      timestamp: "2026-07-23T17:42:10Z",
      dimensions: "450m radius",
      estimatedMassKg: 620,
      imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 10, y: 15, width: 75, height: 70 },
      recommendation: "Notify Ocean Skimmer Drone Fleet DR-004 for automated surface skim collection.",
      status: "INVESTIGATING"
    },
    {
      id: "DET-2015",
      type: "Industrial Chemical Drum Barrel",
      category: "CHEMICAL_SPILL",
      confidence: 88.9,
      severity: "HIGH",
      sector: "SEC-C1",
      latitude: 11.4610,
      longitude: 74.2100,
      droneId: "DR-003",
      timestamp: "2026-07-23T16:30:00Z",
      dimensions: "1.2m x 0.8m",
      estimatedMassKg: 95,
      imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 40, y: 40, width: 25, height: 30 },
      recommendation: "High toxicity potential. Dispatch hazardous containment drone immediately.",
      status: "ACTION_REQUIRED"
    },
    {
      id: "DET-2017",
      type: "Submerged Freight Shipping Container",
      category: "HAZARDOUS",
      confidence: 94.6,
      severity: "CRITICAL",
      sector: "SEC-B4",
      latitude: 12.9610,
      longitude: 73.1900,
      droneId: "DR-007",
      timestamp: "2026-07-23T14:12:00Z",
      dimensions: "12m x 2.4m",
      estimatedMassKg: 3800,
      imageUrl: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 15, y: 25, width: 60, height: 50 },
      recommendation: "Issue commercial navigation hazard warning flag and dispatch salvage barge.",
      status: "ALERT_FLAGGED"
    },
    {
      id: "DET-2018",
      type: "Polyethylene Macro-Packaging Patch",
      category: "PLASTIC_DEBRIS",
      confidence: 89.4,
      severity: "HIGH",
      sector: "SEC-A2",
      latitude: 14.1350,
      longitude: 72.8620,
      droneId: "DR-002",
      timestamp: "2026-07-23T13:30:00Z",
      dimensions: "65m x 20m",
      estimatedMassKg: 420,
      imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 20, y: 20, width: 50, height: 45 },
      recommendation: "Schedule automated skimmer intercept by AeroSkimmer DR-007.",
      status: "PENDING_RECOVERY"
    },
    {
      id: "DET-2019",
      type: "Abandoned Nylon Trawling Wire Cluster",
      category: "PLASTIC_DEBRIS",
      confidence: 98.1,
      severity: "CRITICAL",
      sector: "SEC-C1",
      latitude: 11.4810,
      longitude: 74.2410,
      droneId: "DR-008",
      timestamp: "2026-07-23T12:05:00Z",
      dimensions: "28m length",
      estimatedMassKg: 290,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 35, y: 15, width: 45, height: 65 },
      recommendation: "Entanglement risk for abyssal fauna. Dispatch ROV trench cutter unit.",
      status: "ACTION_REQUIRED"
    },
    {
      id: "DET-2020",
      type: "Commercial Tanker Bilge Discharge",
      category: "CHEMICAL_SPILL",
      confidence: 93.8,
      severity: "HIGH",
      sector: "SEC-A3",
      latitude: 13.9100,
      longitude: 71.9700,
      droneId: "DR-005",
      timestamp: "2026-07-23T11:45:00Z",
      dimensions: "1.2km length",
      estimatedMassKg: 1100,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 10, y: 30, width: 80, height: 40 },
      recommendation: "Transmit automatic IMO environmental violation penalty log.",
      status: "INVESTIGATING"
    }
  ];
}

function getFallbackCoralReefs() {
  return [
    {
      id: "CRL-01",
      name: "Triton Barrier Reef Sanctuary",
      sector: "SEC-A2",
      latitude: 14.1100,
      longitude: 72.8400,
      healthScore: 88.5,
      bleachingRisk: "LOW",
      bleachingPercent: 4.2,
      surfaceTempC: 27.8,
      trend: "IMPROVING",
      status: "PROTECTED_HEALTHY",
      imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRL-02",
      name: "Coral Atoll Sector Blue",
      sector: "SEC-B4",
      latitude: 12.9300,
      longitude: 73.1500,
      healthScore: 74.1,
      bleachingRisk: "MODERATE",
      bleachingPercent: 14.8,
      surfaceTempC: 29.4,
      trend: "STABLE",
      status: "MONITORING_REQUIRED",
      imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRL-03",
      name: "Southern Shelf Deep Reef",
      sector: "SEC-C1",
      latitude: 11.4500,
      longitude: 74.2100,
      healthScore: 61.2,
      bleachingRisk: "HIGH",
      bleachingPercent: 28.6,
      surfaceTempC: 30.2,
      trend: "DECLINING",
      status: "CRITICAL_BLEACHING",
      imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRL-04",
      name: "Pacific Equatorial Coral Atoll",
      sector: "SEC-A3",
      latitude: 13.8900,
      longitude: 71.9500,
      healthScore: 92.4,
      bleachingRisk: "LOW",
      bleachingPercent: 2.1,
      surfaceTempC: 26.9,
      trend: "IMPROVING",
      status: "PROTECTED_HEALTHY",
      imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRL-05",
      name: "Abyssal Slope Marine Reserve",
      sector: "SEC-C1",
      latitude: 11.4700,
      longitude: 74.2300,
      healthScore: 52.1,
      bleachingRisk: "HIGH",
      bleachingPercent: 34.2,
      surfaceTempC: 30.5,
      trend: "DECLINING",
      status: "CRITICAL_BLEACHING",
      imageUrl: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRL-06",
      name: "Barrier Lagoon Sanctuary Alpha",
      sector: "SEC-B4",
      latitude: 12.9400,
      longitude: 73.1600,
      healthScore: 81.0,
      bleachingRisk: "MODERATE",
      bleachingPercent: 9.4,
      surfaceTempC: 28.2,
      trend: "IMPROVING",
      status: "PROTECTED_HEALTHY",
      imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
    }
  ];
}

function getFallbackSpecies() {
  return [
    {
      id: "SPC-001",
      commonName: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      status: "ENDANGERED",
      populationEstimate: 12500,
      populationTrend: "INCREASING",
      primaryHabitat: "Epipelagic / Mesopelagic",
      sector: "SEC-A3",
      taggedIndividuals: 48,
      migrationStatus: "Northbound Annual Migration",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      description: "The largest marine mammal known. Pod tracks show healthy feeding behavior near nutrient upwellings."
    },
    {
      id: "SPC-002",
      commonName: "Hawksbill Sea Turtle",
      scientificName: "Eretmochelys imbricata",
      status: "CRITICALLY_ENDANGERED",
      populationEstimate: 23000,
      populationTrend: "STABLE",
      primaryHabitat: "Coral Reefs & Seagrass Beds",
      sector: "SEC-A2",
      taggedIndividuals: 112,
      migrationStatus: "Nesting Season Active",
      threatLevel: "HIGH",
      imageUrl: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=800&q=80",
      description: "Vulnerable to ghost nets and ocean plastic pollution. Monitored continuously by Triton DR-002."
    },
    {
      id: "SPC-003",
      commonName: "Oceanic Manta Ray",
      scientificName: "Mobula birostris",
      status: "VULNERABLE",
      populationEstimate: 45000,
      populationTrend: "INCREASING",
      primaryHabitat: "Coastal Reef Edges",
      sector: "SEC-B4",
      taggedIndividuals: 84,
      migrationStatus: "Local Feeding Aggregation",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      description: "Aggregating near Sector B4 cleaning stations. Zero plastic ingestions detected this quarter."
    },
    {
      id: "SPC-004",
      commonName: "Giant Deep-Sea Squid",
      scientificName: "Architeuthis dux",
      status: "LEAST_CONCERN",
      populationEstimate: 120000,
      populationTrend: "STABLE",
      primaryHabitat: "Bathypelagic / Abyssal",
      sector: "SEC-C1",
      taggedIndividuals: 12,
      migrationStatus: "Deep Trench Resident",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=800&q=80",
      description: "Bioluminescent signaling detected at 1,840 meters depth by ROV Abyssal Watcher."
    },
    {
      id: "SPC-005",
      commonName: "Great White Shark",
      scientificName: "Carcharodon carcharias",
      status: "VULNERABLE",
      populationEstimate: 3500,
      populationTrend: "STABLE",
      primaryHabitat: "Epipelagic Coastal & Oceanic",
      sector: "SEC-A3",
      taggedIndividuals: 64,
      migrationStatus: "Continental Shelf Patrol",
      threatLevel: "HIGH",
      imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80",
      description: "Apex predator telemetry acoustic signal detected near upwelling boundary. Tagged by DR-005."
    },
    {
      id: "SPC-006",
      commonName: "Emperor Penguin",
      scientificName: "Aptenodytes forsteri",
      status: "NEAR_THREATENED",
      populationEstimate: 595000,
      populationTrend: "DECREASING",
      primaryHabitat: "Pelagic Ocean & Ice Shelves",
      sector: "SEC-C1",
      taggedIndividuals: 140,
      migrationStatus: "Southern Pelagic Foraging Run",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80",
      description: "Deep diving telemetry recorded at 420 meters depth during krill foraging."
    },
    {
      id: "SPC-007",
      commonName: "Scalloped Hammerhead Shark",
      scientificName: "Sphyrna lewini",
      status: "CRITICALLY_ENDANGERED",
      populationEstimate: 18000,
      populationTrend: "DECREASING",
      primaryHabitat: "Seamounts & Reef Slopes",
      sector: "SEC-A2",
      taggedIndividuals: 38,
      migrationStatus: "Seamount Aggregation Active",
      threatLevel: "CRITICAL",
      imageUrl: "https://images.unsplash.com/photo-1564731071754-001b53a902fb?auto=format&fit=crop&w=800&q=80",
      description: "Schooling behavior registered around North Barrier seamount by acoustic hydrophone array."
    },
    {
      id: "SPC-008",
      commonName: "Humpback Whale",
      scientificName: "Megaptera novaeangliae",
      status: "LEAST_CONCERN",
      populationEstimate: 84000,
      populationTrend: "INCREASING",
      primaryHabitat: "Coastal Bays & Open Ocean",
      sector: "SEC-B4",
      taggedIndividuals: 96,
      migrationStatus: "Tropical Breeding Grounds",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1454991727061-be514eae86f7?auto=format&fit=crop&w=800&q=80",
      description: "Acoustic hydrophone pods recorded complex courtship vocalizations in Sector B4."
    },
    {
      id: "SPC-009",
      commonName: "Ocean Sunfish (Mola Mola)",
      scientificName: "Mola mola",
      status: "VULNERABLE",
      populationEstimate: 62000,
      populationTrend: "STABLE",
      primaryHabitat: "Epipelagic Surface Basking",
      sector: "SEC-B4",
      taggedIndividuals: 29,
      migrationStatus: "Surface Thermal Basking",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      description: "Heavy surface sunbasking observed by Triton DR-001 optical camera suite."
    },
    {
      id: "SPC-010",
      commonName: "Common Bottlenose Dolphin",
      scientificName: "Tursiops truncatus",
      status: "LEAST_CONCERN",
      populationEstimate: 600000,
      populationTrend: "STABLE",
      primaryHabitat: "Coastal Reef Sanctuaries",
      sector: "SEC-A2",
      taggedIndividuals: 210,
      migrationStatus: "Resident Pod Play Behavior",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80",
      description: "Pod of 18 dolphins riding bow waves of Research Vessel Alpha near Triton Sanctuary."
    },
    {
      id: "SPC-011",
      commonName: "Whale Shark",
      scientificName: "Rhincodon typus",
      status: "ENDANGERED",
      populationEstimate: 7100,
      populationTrend: "DECREASING",
      primaryHabitat: "Epipelagic Tropical & Warm Temperate",
      sector: "SEC-B4",
      taggedIndividuals: 55,
      migrationStatus: "Plankton Bloom Following",
      threatLevel: "HIGH",
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
      description: "Largest living fish species. Satellite tag shows 2,400km migration path following plankton blooms."
    },
    {
      id: "SPC-012",
      commonName: "Clownfish (Ocellaris)",
      scientificName: "Amphiprion ocellaris",
      status: "LEAST_CONCERN",
      populationEstimate: 850000,
      populationTrend: "STABLE",
      primaryHabitat: "Anemone Reef Colonies",
      sector: "SEC-A2",
      taggedIndividuals: 320,
      migrationStatus: "Sedentary Reef Resident",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80",
      description: "Symbiotic anemone colony health index at 94.2%. Population density optimal for reef zone A2."
    },
    {
      id: "SPC-013",
      commonName: "Leatherback Sea Turtle",
      scientificName: "Dermochelys coriacea",
      status: "CRITICALLY_ENDANGERED",
      populationEstimate: 34000,
      populationTrend: "DECREASING",
      primaryHabitat: "Open Ocean Pelagic",
      sector: "SEC-A3",
      taggedIndividuals: 78,
      migrationStatus: "Trans-Oceanic Nesting Migration",
      threatLevel: "CRITICAL",
      imageUrl: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
      description: "GPS satellite tag recorded 11,000km trans-Atlantic crossing. Nesting beach landfall in 14 days."
    },
    {
      id: "SPC-014",
      commonName: "Orca (Killer Whale)",
      scientificName: "Orcinus orca",
      status: "DATA_DEFICIENT",
      populationEstimate: 50000,
      populationTrend: "STABLE",
      primaryHabitat: "All Ocean Zones",
      sector: "SEC-C1",
      taggedIndividuals: 180,
      migrationStatus: "Resident Pod — Hunting Formation",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=800&q=80",
      description: "Apex predator pod of 9 individuals detected in coordinated hunting formation near deep trench."
    },
    {
      id: "SPC-015",
      commonName: "Dugong",
      scientificName: "Dugong dugon",
      status: "VULNERABLE",
      populationEstimate: 30000,
      populationTrend: "DECREASING",
      primaryHabitat: "Shallow Seagrass Meadows",
      sector: "SEC-A2",
      taggedIndividuals: 42,
      migrationStatus: "Seasonal Grazing Rotation",
      threatLevel: "HIGH",
      imageUrl: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80",
      description: "Seagrass bed consumption monitoring shows healthy grazing patterns in sanctuary zone."
    },
    {
      id: "SPC-016",
      commonName: "Moon Jellyfish",
      scientificName: "Aurelia aurita",
      status: "LEAST_CONCERN",
      populationEstimate: 9500000,
      populationTrend: "INCREASING",
      primaryHabitat: "Coastal Epipelagic",
      sector: "SEC-B4",
      taggedIndividuals: 0,
      migrationStatus: "Bloom Event — Current Drifting",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      description: "Massive bloom event detected spanning 12km². Autonomous camera confirmed species via morphology AI."
    },
    {
      id: "SPC-017",
      commonName: "Giant Pacific Octopus",
      scientificName: "Enteroctopus dofleini",
      status: "LEAST_CONCERN",
      populationEstimate: 280000,
      populationTrend: "STABLE",
      primaryHabitat: "Rocky Benthic Substrate",
      sector: "SEC-C1",
      taggedIndividuals: 8,
      migrationStatus: "Den Residence — Brooding",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=800&q=80",
      description: "Female specimen observed guarding egg clutch at 890m depth. Estimated 56,000 eggs in den."
    },
    {
      id: "SPC-018",
      commonName: "Sea Otter",
      scientificName: "Enhydra lutris",
      status: "ENDANGERED",
      populationEstimate: 106000,
      populationTrend: "INCREASING",
      primaryHabitat: "Coastal Kelp Forest Canopy",
      sector: "SEC-A3",
      taggedIndividuals: 95,
      migrationStatus: "Kelp Raft Resident",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80",
      description: "Raft of 24 individuals observed. Keystone species vital for kelp forest ecosystem equilibrium."
    },
    {
      id: "SPC-019",
      commonName: "Narwhal",
      scientificName: "Monodon monoceros",
      status: "NEAR_THREATENED",
      populationEstimate: 80000,
      populationTrend: "STABLE",
      primaryHabitat: "Arctic Pelagic & Pack Ice",
      sector: "SEC-C1",
      taggedIndividuals: 62,
      migrationStatus: "Polar Deep Dive Cycle",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      description: "Acoustic monitoring captured echolocation click trains at 1,500m depth under pack ice."
    },
    {
      id: "SPC-020",
      commonName: "Blue-Ringed Octopus",
      scientificName: "Hapalochlaena lunulata",
      status: "LEAST_CONCERN",
      populationEstimate: 410000,
      populationTrend: "STABLE",
      primaryHabitat: "Shallow Reef Tide Pools",
      sector: "SEC-A2",
      taggedIndividuals: 15,
      migrationStatus: "Territorial Reef Patrol",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
      description: "Bioluminescent ring display captured on VisionAI infrared. Venomous — exclusion zone active."
    }
  ];
}

function getFallbackSectors() {
  return [
    { id: "SEC-A2", name: "North Barrier Coral Trench", bounds: [[14.05, 72.75], [14.25, 72.95]], center: [14.15, 72.85], riskLevel: "LOW", activeDronesCount: 2, coralCoveragePct: 68.4, waterTempC: 27.8, imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80" },
    { id: "SEC-B4", name: "Central Equatorial Ridge", bounds: [[12.85, 73.05], [13.05, 73.25]], center: [12.95, 73.15], riskLevel: "MODERATE", activeDronesCount: 3, coralCoveragePct: 45.2, waterTempC: 28.5, imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80" },
    { id: "SEC-C1", name: "Southern Abyssal Trench", bounds: [[11.35, 74.10], [11.55, 74.30]], center: [11.45, 74.20], riskLevel: "HIGH", activeDronesCount: 1, coralCoveragePct: 12.1, waterTempC: 30.1, imageUrl: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=800&q=80" },
    { id: "SEC-A3", name: "Blue Whale Sanctuary Arc", bounds: [[13.75, 71.85], [13.95, 72.05]], center: [13.85, 71.95], riskLevel: "LOW", activeDronesCount: 2, coralCoveragePct: 74.5, waterTempC: 26.8, imageUrl: "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?auto=format&fit=crop&w=800&q=80" },
    { id: "SEC-BASE", name: "GORI Research Command Base", bounds: [[12.80, 72.95], [12.95, 73.10]], center: [12.88, 73.02], riskLevel: "LOW", activeDronesCount: 4, coralCoveragePct: 88.0, waterTempC: 27.1, imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" }
  ];
}

function getFallbackRiskForecast() {
  return {
    overallRiskScore: 32,
    riskRating: "LOW_TO_MODERATE",
    aiConfidence: 94.8,
    forecasts: {
      pollutionDispersalRisk: 28,
      coralBleachingProbability: 18,
      stormImpactSeverity: 14,
      speciesHabitatLoss: 12
    },
    recommendations: [
      { id: "REC-01", title: "Deploy Automated Skim Drones in Sector B4", priority: "HIGH", impact: "Reduces surface microplastic aggregation by 35% within 48 hours." },
      { id: "REC-02", title: "Activate Deep Thermal Shading Net in Sector C1", priority: "MEDIUM", impact: "Mitigates surface thermal stress on bleaching barrier reefs." }
    ]
  };
}

function getFallbackAnalytics() {
  return {
    pollutionTrend: [
      { month: "Jan", plastics: 240, oilSlicks: 45, ghostNets: 18 },
      { month: "Feb", plastics: 210, oilSlicks: 38, ghostNets: 15 },
      { month: "Mar", plastics: 195, oilSlicks: 30, ghostNets: 12 },
      { month: "Apr", plastics: 180, oilSlicks: 25, ghostNets: 14 },
      { month: "May", plastics: 160, oilSlicks: 22, ghostNets: 10 },
      { month: "Jun", plastics: 142, oilSlicks: 18, ghostNets: 8 }
    ],
    coralHealthMonthly: [
      { month: "Jan", index: 81.2, bleachingRisk: 12.4 },
      { month: "Feb", index: 82.0, bleachingRisk: 10.8 },
      { month: "Mar", index: 82.8, bleachingRisk: 9.5 },
      { month: "Apr", index: 83.1, bleachingRisk: 8.9 },
      { month: "May", index: 83.9, bleachingRisk: 7.2 },
      { month: "Jun", index: 84.2, bleachingRisk: 6.8 }
    ],
    speciesGrowth: [
      { year: "2022", blueWhales: 38, seaTurtles: 82, mantaRays: 60 },
      { year: "2023", blueWhales: 41, seaTurtles: 94, mantaRays: 72 },
      { year: "2024", blueWhales: 44, seaTurtles: 101, mantaRays: 78 },
      { year: "2025", blueWhales: 46, seaTurtles: 108, mantaRays: 81 },
      { year: "2026", blueWhales: 48, seaTurtles: 112, mantaRays: 84 }
    ],
    droneMissionsCompleted: [
      { category: "Plastic Survey", count: 142 },
      { category: "Reef Bleaching", count: 98 },
      { category: "Species Tagging", count: 76 }
    ]
  };
}

function getFallbackAlerts() {
  return [
    { id: "ALR-0098", title: "Ghost Net Entanglement Risk Flagged", category: "POLLUTION", severity: "CRITICAL", sector: "SEC-B4", timestamp: "2026-07-23T18:15:32Z", read: false, description: "Drone DR-001 identified a 14m commercial fishing net near sea turtle migration route.", imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80" },
    { id: "ALR-0099", title: "Thermal Stress Spike in Reef Sector C1", category: "CORAL_BLEACHING", severity: "WARNING", sector: "SEC-C1", timestamp: "2026-07-23T17:40:00Z", read: false, description: "Surface temperature exceeded 30.0°C threshold for 48 consecutive hours.", imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80" },
    { id: "ALR-0100", title: "Drone DR-004 Low Battery Warning", category: "TELEMETRY", severity: "INFO", sector: "SEC-B4", timestamp: "2026-07-23T16:30:00Z", read: true, description: "Drone DR-004 battery dropped below 30%. Initiating automatic return to charging dock.", imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80" },
    { id: "ALR-0101", title: "Submerged Container Collision Risk", category: "HAZARDOUS", severity: "CRITICAL", sector: "SEC-B4", timestamp: "2026-07-23T14:12:00Z", read: false, description: "Sonar scan identified 12m steel shipping container floating at 8m depth in shipping lane.", imageUrl: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=800&q=80" },
    { id: "ALR-0102", title: "Scalloped Hammerhead Pod Influx", category: "SPECIES", severity: "INFO", sector: "SEC-A2", timestamp: "2026-07-23T11:20:00Z", read: false, description: "38 Hammerhead acoustic tags detected near seamount cleaning sanctuary.", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" },
    { id: "ALR-0103", title: "Industrial Oil Sheen Detection", category: "POLLUTION", severity: "WARNING", sector: "SEC-A3", timestamp: "2026-07-23T11:45:00Z", read: true, description: "Drone DR-005 optical camera flagged 1.2km surface oil sheen trailing commercial vessel.", imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80" }
  ];
}

function getFallbackWeather() {
  return {
    sector: "SEC-B4",
    waveHeightMeters: 1.4,
    wavePeriodSec: 7.2,
    windSpeedKnots: 12.8,
    windDirection: "NE",
    airTempC: 28.5,
    waterTempC: 27.2,
    salinityPSU: 35.1,
    pHLevel: 8.12,
    dissolvedOxygenMgL: 6.9,
    visibilityMeters: 28.0,
    stormProbabilityPct: 8.5
  };
}

function getFallbackProfile() {
  return {
    id: "USR-9901",
    name: "Dr. Elena Rostova",
    role: "Lead Oceanographer & Chief Marine Scientist",
    organization: "Global Oceanographic Research Institute (GORI)",
    email: "elena.rostova@oceaneye.org",
    location: "Kiel Marine Station / Offshore Vessel Alpha",
    missionHours: 1420,
    reportsGenerated: 86,
    certifications: [
      "Deep Sea Submersible Mission Commander (FAA/IMO)",
      "AI Computer Vision Marine Specialist Level III",
      "GIS Marine Ecosystem Analyst"
    ]
  };
}

function getFallbackSettings() {
  return {
    theme: "dark",
    autoRefreshIntervalSec: 15,
    notificationsEnabled: true,
    audioAlerts: true,
    units: {
      depth: "feet",
      temperature: "celsius",
      speed: "knots"
    },
    mapProvider: "CartoDB Dark Matter",
    developerMode: true,
    apiKey: "oe_live_99841029837410928374"
  };
}
