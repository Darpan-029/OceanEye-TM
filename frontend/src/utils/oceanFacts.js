// Ocean Facts Database - Depth-specific educational content
export const OCEAN_FACTS = {
  surface: [
    {
      title: "Ocean Surface",
      fact: "The ocean surface covers 71% of Earth's surface and contains 97% of all water on our planet.",
      stat: "71%",
      label: "Earth's Surface"
    },
    {
      title: "Wave Power",
      fact: "Ocean waves can travel thousands of miles across the ocean, carrying energy equivalent to millions of power plants.",
      stat: "2,000+ miles",
      label: "Wave Travel Distance"
    },
    {
      title: "Surface Temperature",
      fact: "Ocean surface temperatures have risen by 1.3°F since 1900 due to climate change, affecting marine ecosystems worldwide.",
      stat: "1.3°F",
      label: "Temperature Rise"
    },
    {
      title: "Marine Life",
      fact: "Over 230,000 known species live in the ocean, with scientists estimating millions more yet to be discovered.",
      stat: "230K+",
      label: "Known Species"
    }
  ],
  sunlight: [
    {
      title: "Coral Reefs",
      fact: "Coral reefs cover less than 1% of the ocean floor but support 25% of all marine species, earning them the nickname 'rainforests of the sea'.",
      stat: "25%",
      label: "Marine Species Supported"
    },
    {
      title: "Photosynthesis",
      fact: "The sunlight zone is where 90% of all marine life lives because sunlight penetrates deep enough for photosynthesis to occur.",
      stat: "90%",
      label: "Marine Life"
    },
    {
      title: "Sea Grass Meadows",
      fact: "Sea grass meadows can store up to 83,000 metric tons of carbon per square kilometer, making them powerful carbon sinks.",
      stat: "83K tons",
      label: "Carbon Storage per km²"
    },
    {
      title: "Fish Populations",
      fact: "Over 3 billion people depend on seafood as their primary source of protein, with most fish coming from the sunlight zone.",
      stat: "3 billion",
      label: "People Dependent on Seafood"
    }
  ],
  twilight: [
    {
      title: "The Twilight Zone",
      fact: "Also called the mesopelagic zone, this region receives very little sunlight and is home to bioluminescent creatures that create their own light.",
      stat: "1%",
      label: "Sunlight Penetration"
    },
    {
      title: "Bioluminescence",
      fact: "Over 75% of deep-sea creatures are bioluminescent, using light for communication, hunting, and attracting mates.",
      stat: "75%",
      label: "Bioluminescent Creatures"
    },
    {
      title: "Marine Snow",
      fact: "Marine snow - organic particles falling from upper layers - provides food for twilight zone creatures and is crucial for ocean ecosystems.",
      stat: "100+ years",
      label: "Particle Fall Time to Abyss"
    },
    {
      title: "Giant Squid",
      fact: "The mysterious giant squid lives in the twilight zone and can grow up to 43 feet long, with eyes the size of dinner plates.",
      stat: "43 ft",
      label: "Max Giant Squid Length"
    }
  ],
  midnight: [
    {
      title: "Complete Darkness",
      fact: "The midnight zone receives no sunlight at all. Temperatures hover near freezing, and pressure can be 200 times greater than at the surface.",
      stat: "200x",
      label: "Surface Pressure"
    },
    {
      title: "Anglerfish",
      fact: "Male anglerfish are tiny compared to females and permanently attach themselves to females, eventually fusing into their mate's body.",
      stat: "1:100",
      label: "Male to Female Size Ratio"
    },
    {
      title: "Deep Sea Gigantism",
      fact: "Many deep-sea creatures grow much larger than their shallow-water relatives, a phenomenon called abyssal gigantism.",
      stat: "10x",
      label: "Size Increase in Some Species"
    },
    {
      title: "Unknown Species",
      fact: "Scientists estimate that 91% of ocean species have yet to be discovered, with most living in the deep ocean zones.",
      stat: "91%",
      label: "Undiscovered Species"
    }
  ],
  abyssal: [
    {
      title: "Hydrothermal Vents",
      fact: "Hydrothermal vents spew mineral-rich water at temperatures up to 750°F, supporting unique ecosystems that don't rely on sunlight.",
      stat: "750°F",
      label: "Vent Water Temperature"
    },
    {
      title: "Ancient Life",
      fact: "Some organisms near hydrothermal vents may be among the oldest life forms on Earth, using chemosynthesis instead of photosynthesis.",
      stat: "3.5B years",
      label: "Potential Age of Life Forms"
    },
    {
      title: "Sea Floor Mining",
      fact: "The abyssal plain contains valuable minerals like manganese nodules, potentially worth trillions of dollars but posing environmental risks.",
      stat: "$16T",
      label: "Estimated Mineral Value"
    },
    {
      title: "Dumbo Octopus",
      fact: "The dumbo octopus lives at depths up to 13,000 feet and uses ear-like fins to swim, making it one of the deepest-living octopuses.",
      stat: "13,000 ft",
      label: "Max Depth"
    }
  ],
  hadal: [
    {
      title: "Ocean Trenches",
      fact: "The hadal zone consists of deep ocean trenches, including the Mariana Trench which is deeper than Mount Everest is tall.",
      stat: "36,000 ft",
      label: "Mariana Trench Depth"
    },
    {
      title: "Extreme Pressure",
      fact: "Pressure in the hadal zone can exceed 1,000 times atmospheric pressure - equivalent to an elephant standing on your thumb.",
      stat: "1,000x",
      label: "Atmospheric Pressure"
    },
    {
      title: "Snailfish",
      fact: "The hadal snailfish is one of the few fish that can survive in the hadal zone, with translucent bodies and no swim bladders.",
      stat: "27,000 ft",
      label: "Deepest Fish Recorded"
    },
    {
      title: "Unexplored Territory",
      fact: "Less than 5% of the world's oceans have been explored, making the hadal zone one of Earth's last frontiers.",
      stat: "5%",
      label: "Ocean Explored"
    }
  ]
}

export const getFactsByZone = (zoneId) => {
  return OCEAN_FACTS[zoneId] || []
}
