/**
 * OceanEye Central Interconnected Mock Dataset
 * Contains linked data for Drones, VisionAI Detections, Coral Reefs,
 * Species Census, GIS Sectors, Alerts, Analytics, and Weather.
 */

const mockStore = {
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
    speciesTracked: 1420,
    activeMissions: 6,
    satelliteCoverage: "99.4%"
  },

  drones: [
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
      lastMaintenance: "2026-07-01T00:00:00Z",
      streamUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
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
      lastMaintenance: "2026-06-20T00:00:00Z",
      streamUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
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
      lastMaintenance: "2026-07-10T00:00:00Z",
      streamUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
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
      lastMaintenance: "2026-07-18T00:00:00Z",
      streamUrl: ""
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
      lastMaintenance: "2026-07-15T00:00:00Z",
      streamUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
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
      lastMaintenance: "2026-07-23T00:00:00Z",
      streamUrl: ""
    }
  ],

  visionDetections: [
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
      type: "Benthic Fuel Oil Residue",
      category: "CHEMICAL_SPILL",
      confidence: 88.7,
      severity: "HIGH",
      sector: "SEC-C1",
      latitude: 11.4620,
      longitude: 74.2255,
      droneId: "DR-003",
      timestamp: "2026-07-23T16:20:00Z",
      dimensions: "80m x 25m",
      estimatedMassKg: 340,
      imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 30, y: 35, width: 40, height: 45 },
      recommendation: "Issue environmental warning flag for commercial shipping vessel cargo leak.",
      status: "ALERT_FLAGGED"
    },
    {
      id: "DET-2016",
      type: "Industrial Chemical Drum Discard",
      category: "HAZARDOUS",
      confidence: 97.8,
      severity: "CRITICAL",
      sector: "SEC-A3",
      latitude: 13.8890,
      longitude: 71.9480,
      droneId: "DR-005",
      timestamp: "2026-07-23T15:05:45Z",
      dimensions: "1.2m x 0.8m",
      estimatedMassKg: 210,
      imageUrl: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=800&q=80",
      boundingBox: { x: 40, y: 40, width: 25, height: 30 },
      recommendation: "High toxicity potential. Dispatch hazardous containment drone immediately.",
      status: "ACTION_REQUIRED"
    }
  ],

  coralReefs: [
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
      historicalTempAvg: 26.5,
      pHLevel: 8.14,
      turbidityNTU: 1.2,
      speciesDiversityIndex: 9.4,
      lastInspectionDate: "2026-07-22T00:00:00Z",
      trend: "IMPROVING",
      status: "PROTECTED_HEALTHY",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
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
      historicalTempAvg: 27.1,
      pHLevel: 8.08,
      turbidityNTU: 2.8,
      speciesDiversityIndex: 8.1,
      lastInspectionDate: "2026-07-23T00:00:00Z",
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
      historicalTempAvg: 27.4,
      pHLevel: 7.98,
      turbidityNTU: 4.1,
      speciesDiversityIndex: 6.8,
      lastInspectionDate: "2026-07-21T00:00:00Z",
      trend: "DECLINING",
      status: "CRITICAL_BLEACHING",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    }
  ],

  species: [
    {
      id: "SPC-001",
      commonName: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      status: "ENDANGERED",
      populationEstimate: 12500,
      populationTrend: "INCREASING",
      primaryHabitat: "Epipelagic / Mesopelagic",
      sector: "SEC-A3",
      lastSighting: "2026-07-23T15:05:45Z",
      taggedIndividuals: 48,
      migrationStatus: "Northbound Annual Migration",
      threatLevel: "MODERATE",
      imageUrl: "https://images.unsplash.com/photo-1568430460464-02c34c449339?auto=format&fit=crop&w=800&q=80",
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
      lastSighting: "2026-07-23T17:10:00Z",
      taggedIndividuals: 112,
      migrationStatus: "Nesting Season Active",
      threatLevel: "HIGH",
      imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
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
      lastSighting: "2026-07-23T18:02:12Z",
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
      lastSighting: "2026-07-23T16:20:00Z",
      taggedIndividuals: 12,
      migrationStatus: "Deep Trench Resident",
      threatLevel: "LOW",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      description: "Bioluminescent signaling detected at 1,840 meters depth by ROV Abyssal Watcher."
    }
  ],

  sectors: [
    {
      id: "SEC-A2",
      name: "North Barrier Coral Trench",
      bounds: [
        [14.05, 72.75],
        [14.25, 72.95]
      ],
      center: [14.15, 72.85],
      riskLevel: "LOW",
      activeDronesCount: 2,
      coralCoveragePct: 68.4,
      waterTempC: 27.8,
      notes: "High coral diversity zone. Protected marine sanctuary boundary."
    },
    {
      id: "SEC-B4",
      name: "Central Equatorial Ridge",
      bounds: [
        [12.85, 73.05],
        [13.05, 73.25]
      ],
      center: [12.95, 73.15],
      riskLevel: "MODERATE",
      activeDronesCount: 3,
      coralCoveragePct: 45.2,
      waterTempC: 28.5,
      notes: "Commercial shipping overlap zone. High surveillance priority."
    },
    {
      id: "SEC-C1",
      name: "Southern Abyssal Trench",
      bounds: [
        [11.35, 74.10],
        [11.55, 74.30]
      ],
      center: [11.45, 74.20],
      riskLevel: "HIGH",
      activeDronesCount: 1,
      coralCoveragePct: 12.1,
      waterTempC: 30.1,
      notes: "Deep trench thermal anomaly area with chemical vessel traffic."
    }
  ],

  alerts: [
    {
      id: "ALR-0098",
      title: "Ghost Net Entanglement Risk Flagged",
      category: "POLLUTION",
      severity: "CRITICAL",
      sector: "SEC-B4",
      latitude: 12.9281,
      longitude: 73.1499,
      timestamp: "2026-07-23T18:15:32Z",
      read: false,
      archived: false,
      description: "Drone DR-001 identified a 14m commercial fishing net drifting near Hawksbill turtle migration route.",
      actionRequired: "Deploy Vessel Alpha Recovery Team"
    },
    {
      id: "ALR-0099",
      title: "Thermal Stress Spike in Reef Sector C1",
      category: "CORAL_BLEACHING",
      severity: "WARNING",
      sector: "SEC-C1",
      latitude: 11.4500,
      longitude: 74.2100,
      timestamp: "2026-07-23T17:40:00Z",
      read: false,
      archived: false,
      description: "Surface temperature exceeded 30.0°C threshold for 48 consecutive hours.",
      actionRequired: "Trigger Autonomous Shading Drone Protocol"
    },
    {
      id: "ALR-0100",
      title: "Drone DR-004 Low Battery Warning",
      category: "TELEMETRY",
      severity: "INFO",
      sector: "SEC-B4",
      latitude: 12.9110,
      longitude: 73.1200,
      timestamp: "2026-07-23T16:30:00Z",
      read: true,
      archived: false,
      description: "Drone DR-004 battery dropped below 30%. Initiating automatic return to charging dock.",
      actionRequired: "Docking procedure complete"
    }
  ],

  liveEvents: [
    {
      id: "EV-901",
      time: "18:24:10",
      type: "POLLUTION_DETECTED",
      title: "Ghost Net Detected",
      sector: "Sector SEC-B4",
      confidence: "96.4%",
      severity: "CRITICAL"
    },
    {
      id: "EV-902",
      time: "18:20:05",
      type: "DRONE_TELEMETRY",
      title: "Drone DR-003 reached waypoint",
      sector: "Abyssal Trench SEC-C1",
      confidence: "100%",
      severity: "INFO"
    },
    {
      id: "EV-903",
      time: "18:15:30",
      type: "CORAL_ALERT",
      title: "Coral thermal threshold alert",
      sector: "Sector SEC-C1",
      confidence: "92.0%",
      severity: "WARNING"
    },
    {
      id: "EV-904",
      time: "18:02:12",
      type: "SPECIES_SPOTTED",
      title: "Blue Whale Pod Identified",
      sector: "Sector SEC-A3",
      confidence: "98.9%",
      severity: "INFO"
    }
  ],

  weather: {
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
    stormProbabilityPct: 8.5,
    forecast24h: [
      { hour: "00:00", wave: 1.2, temp: 26.8, wind: 10.2 },
      { hour: "04:00", wave: 1.1, temp: 26.5, wind: 9.8 },
      { hour: "08:00", wave: 1.3, temp: 27.4, wind: 11.5 },
      { hour: "12:00", wave: 1.5, temp: 28.5, wind: 13.2 },
      { hour: "16:00", wave: 1.6, temp: 28.1, wind: 14.0 },
      { hour: "20:00", wave: 1.4, temp: 27.2, wind: 12.0 }
    ]
  },

  analytics: {
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
      { category: "Species Tagging", count: 76 },
      { category: "Trench Bathymetry", count: 45 },
      { category: "Oil Containment", count: 28 }
    ]
  },

  riskEngine: {
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
      {
        id: "REC-01",
        title: "Deploy Automated Skim Drones in Sector B4",
        priority: "HIGH",
        impact: "Reduces surface microplastic aggregation by 35% within 48 hours."
      },
      {
        id: "REC-02",
        title: "Activate Deep Thermal Shading Net in Sector C1",
        priority: "MEDIUM",
        impact: "Mitigates surface thermal stress on bleaching barrier reefs."
      }
    ]
  },

  profile: {
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
    ],
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },

  settings: {
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
  }
};

module.exports = mockStore;
