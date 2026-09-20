import manifestData from './frame_manifest.json';

export interface Annotation {
  id: string;
  label: string;
  sublabel?: string;
  targetFrame: number;                  // Primary activation frame where component is dead center
  visibleFrameRange: [number, number];  // Strict safety range where component is physically visible
  minVisibilityThreshold: number;       // Frame distance threshold to begin appearing (e.g. 10 frames)
  targetX: number;                      // Component anchor X on car (0-100% of rendered bounding box)
  targetY: number;                      // Component anchor Y on car (0-100% of rendered bounding box)
  side: 'left' | 'right';               // Screen gutter docking
  targetComponent: string;
}

export interface SectionInfoBox {
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export interface SectionZoom {
  factor: number;
  focusX: number;
  focusY: number;
}

export interface RotationSection {
  id: 'hero' | 'tire' | 'rear' | 'body' | 'aero' | 'final';
  navNum: string;
  navLabel: string;
  title: string;
  accentTitle: string;
  heroSubtitle?: string;
  badge?: string;
  description?: string;
  landmarkFrame: number;               // Specific frame this section centers on
  scrollRange: [number, number];
  frameRange: [number, number];
  zoom?: SectionZoom;
  infoBox?: SectionInfoBox;
  annotations: Annotation[];
}

// 179 Verified Chronological Rotation Frames from manifest
export const ROTATION_FRAMES: string[] = manifestData.rotationFrames;

// Essential keyframe indices prioritized on initial boot
export const ESSENTIAL_KEYFRAME_INDICES = [
  0,   // Hero side profile
  41,  // Tire view (frame 050)
  76,  // Rear dead center (frame 094)
  124, // Right side profile (frame 154)
  166, // Front dead center (frame 206)
  178, // Final rotation frame (frame 221)
];

export const SPECIAL_FRAMES = manifestData.specialFrames;

// Exactly SIX primary sections
export const ROTATION_SECTIONS: RotationSection[] = [
  {
    id: 'hero',
    navNum: '01',
    navLabel: 'HERO',
    title: 'ENGINEERED TO',
    accentTitle: 'DOMINATE.',
    heroSubtitle: 'THE VELOCITY F1.',
    scrollRange: [0.0, 0.15],
    frameRange: [0, 18],
    landmarkFrame: 0,
    annotations: [],
  },
  {
    id: 'tire',
    navNum: '02',
    navLabel: 'TIRES',
    title: 'TIRE DYNAMICS:',
    accentTitle: 'PERFORMANCE',
    scrollRange: [0.16, 0.35],
    frameRange: [19, 56],
    landmarkFrame: 41,
    zoom: {
      factor: 1.42,
      focusX: 41.7,
      focusY: 56.2,
    },
    infoBox: {
      title: 'MAXIMUM GRIP & PERFORMANCE',
      subtitle: 'PIRELLI FORMULA 1 TIRE DYNAMICS',
      paragraphs: [
        'Mechanical grip is governed by the contact patch of the 18-inch Pirelli P Zero slick compound, optimized to operate between 100°C and 125°C.',
        'Integrated carbon-matrix brake ducts channel turbulent wheel wake while dissipating up to 1,000°C of kinetic energy during peak 5.2G cornering adhesion.',
      ],
    },
    annotations: [
      {
        id: 'carbon-rim',
        label: 'CARBON FIBER RIM',
        sublabel: 'Forged 18" Magnesium-Carbon with aero covers',
        targetFrame: 41,
        visibleFrameRange: [20, 62],
        minVisibilityThreshold: 18,
        targetX: 41.7,
        targetY: 56.2,
        side: 'right',
        targetComponent: 'WHEEL ASSEMBLY',
      },
      {
        id: 'slick-tires',
        label: 'SLICK COMPOUND TIRES',
        sublabel: 'Pirelli P Zero High-Grip Synthetic Compound',
        targetFrame: 41,
        visibleFrameRange: [20, 62],
        minVisibilityThreshold: 18,
        targetX: 37.0,
        targetY: 42.5,
        side: 'right',
        targetComponent: 'TIRE DYNAMICS',
      },
      {
        id: 'brake-duct',
        label: 'BRAKE DUCT VENTILATION',
        sublabel: 'Carbon Matrix Heat Exchanger & internal cooling scoops',
        targetFrame: 41,
        visibleFrameRange: [20, 62],
        minVisibilityThreshold: 18,
        targetX: 45.5,
        targetY: 53.0,
        side: 'right',
        targetComponent: 'BRAKE SYSTEM',
      },
    ],
  },
  {
    id: 'rear',
    navNum: '03',
    navLabel: 'REAR',
    title: 'POWER UNIT &',
    accentTitle: 'REAR PACKAGE',
    scrollRange: [0.36, 0.55],
    frameRange: [57, 95],
    landmarkFrame: 76,
    infoBox: {
      title: 'UNMATCHED SPEED & EFFICIENCY',
      subtitle: 'HYBRID V6 TURBO & GROUND-EFFECT DIFFUSER',
      paragraphs: [
        'The 1.6-liter turbocharged V6 internal combustion engine pairs with dual ERS recovery units delivering over 1,050 horsepower with thermal efficiency exceeding 50%.',
        'Venturi underbody tunnels expand through the rear diffuser, accelerating underfloor air to create massive downforce without drag penalty.',
      ],
    },
    annotations: [
      {
        id: 'rear-wing',
        label: 'HIGH-DOWNFORCE REAR WING',
        sublabel: 'Dual-Element Carbon Wing + DRS Actuation Flap',
        targetFrame: 76,
        visibleFrameRange: [55, 98],
        minVisibilityThreshold: 18,
        targetX: 50.0,
        targetY: 37.0,
        side: 'right',
        targetComponent: 'AERODYNAMICS',
      },
      {
        id: 'pu-cover',
        label: 'POWER UNIT COVER',
        sublabel: 'Tightly shrink-wrapped carbon cowl with high-flow airbox',
        targetFrame: 76,
        visibleFrameRange: [55, 98],
        minVisibilityThreshold: 18,
        targetX: 50.0,
        targetY: 48.0,
        side: 'right',
        targetComponent: 'PROPULSION',
      },
      {
        id: 'diffuser',
        label: 'DIFFUSER',
        sublabel: 'Full-width Venturi expansion strakes & kick-up ramps',
        targetFrame: 76,
        visibleFrameRange: [55, 98],
        minVisibilityThreshold: 18,
        targetX: 50.0,
        targetY: 67.0,
        side: 'right',
        targetComponent: 'GROUND EFFECT',
      },
      {
        id: 'exhaust',
        label: 'EXHAUST',
        sublabel: 'Center Titanium Inconel outlet + FIA safety rain light',
        targetFrame: 76,
        visibleFrameRange: [55, 98],
        minVisibilityThreshold: 18,
        targetX: 50.0,
        targetY: 57.0,
        side: 'right',
        targetComponent: 'EXHAUST & SAFETY',
      },
    ],
  },
  {
    id: 'body',
    navNum: '04',
    navLabel: 'BODY',
    title: 'BODY &',
    accentTitle: 'CHASSIS',
    description: 'CARBON COMPOSITE MONOCOQUE WITH SCULPTED UNDERFLOOR CHANNELS.',
    scrollRange: [0.56, 0.75],
    frameRange: [96, 138],
    landmarkFrame: 124,
    annotations: [
      {
        id: 'sidepod',
        label: 'SIDEPOD',
        sublabel: 'Aggressive undercut channels feeding radiator cooling ducts',
        targetFrame: 124,
        visibleFrameRange: [102, 146],
        minVisibilityThreshold: 20,
        targetX: 58.0,
        targetY: 53.0,
        side: 'right',
        targetComponent: 'COOLING FLOW',
      },
      {
        id: 'floor-edge',
        label: 'FLOOR EDGE',
        sublabel: 'Longitudinal vortex generator wings sealing underbody suction',
        targetFrame: 124,
        visibleFrameRange: [102, 146],
        minVisibilityThreshold: 20,
        targetX: 48.0,
        targetY: 64.0,
        side: 'right',
        targetComponent: 'GROUND EFFECT',
      },
      {
        id: 'carbon-body',
        label: 'CARBON-FIBER BODYWORK',
        sublabel: 'Ultra-thin pre-preg carbon weave optimized for laminar airflow',
        targetFrame: 124,
        visibleFrameRange: [102, 146],
        minVisibilityThreshold: 20,
        targetX: 62.0,
        targetY: 47.0,
        side: 'right',
        targetComponent: 'AERODYNAMICS',
      },
      {
        id: 'suspension',
        label: 'SUSPENSION',
        sublabel: 'Pushrod front suspension with aero-profile carbon wishbones',
        targetFrame: 124,
        visibleFrameRange: [102, 146],
        minVisibilityThreshold: 20,
        targetX: 23.0,
        targetY: 56.0,
        side: 'right',
        targetComponent: 'CHASSIS DYNAMICS',
      },
      {
        id: 'halo',
        label: 'HALO',
        sublabel: 'Titanium Grade 5 crash ring designed to withstand 120 kN impacts',
        targetFrame: 124,
        visibleFrameRange: [102, 146],
        minVisibilityThreshold: 20,
        targetX: 42.0,
        targetY: 41.0,
        side: 'right',
        targetComponent: 'SAFETY STRUCTURE',
      },
    ],
  },
  {
    id: 'aero',
    navNum: '05',
    navLabel: 'AERO',
    title: 'AERODYNAMIC',
    accentTitle: 'EXCELLENCE',
    scrollRange: [0.76, 0.95],
    frameRange: [139, 178],
    landmarkFrame: 166,
    infoBox: {
      title: 'PRECISION ENGINEERING & DOWNFORCE',
      subtitle: 'FRONT LOAD BALANCING & VORTEX SHAPING',
      paragraphs: [
        'The multi-element front wing controls flow separation around the front wheels, channeling dirty wake outward while feeding laminar air into floor inlets.',
        'Dynamic aero surfaces maintain an ideal 46:54 balance at speeds over 350 km/h, securing total directional stability.',
      ],
    },
    annotations: [
      {
        id: 'halo-front',
        label: 'HALO SAFETY STRUCTURE',
        sublabel: 'Aerodynamically faired titanium driver survival cell',
        targetFrame: 166,
        visibleFrameRange: [144, 178],
        minVisibilityThreshold: 20,
        targetX: 50.0,
        targetY: 40.0,
        side: 'right',
        targetComponent: 'COCKPIT SAFETY',
      },
      {
        id: 'sidepod-airflow',
        label: 'SIDEPOD AIRFLOW',
        sublabel: 'Sculpted horizontal cooling inlets & boundary layer splitters',
        targetFrame: 166,
        visibleFrameRange: [144, 178],
        minVisibilityThreshold: 20,
        targetX: 63.0,
        targetY: 48.0,
        side: 'right',
        targetComponent: 'AERODYNAMICS',
      },
      {
        id: 'front-wing',
        label: 'FRONT WING',
        sublabel: 'Four-element downforce cascade with outwash endplates',
        targetFrame: 166,
        visibleFrameRange: [144, 178],
        minVisibilityThreshold: 20,
        targetX: 30.0,
        targetY: 69.0,
        side: 'right',
        targetComponent: 'FRONT AXLE LOAD',
      },
      {
        id: 'downforce',
        label: 'DOWNFORCE',
        sublabel: 'Balanced high-velocity vortex suction across front and floor',
        targetFrame: 166,
        visibleFrameRange: [144, 178],
        minVisibilityThreshold: 20,
        targetX: 50.0,
        targetY: 62.0,
        side: 'right',
        targetComponent: 'DOWNFORCE',
      },
    ],
  },
  {
    id: 'final',
    navNum: '06',
    navLabel: 'FINAL',
    title: 'THE VELOCITY',
    accentTitle: 'F1',
    scrollRange: [0.96, 1.00],
    frameRange: [0, 178],
    landmarkFrame: 178,
    annotations: [],
  },
];

export const TECHNICAL_SPECS = [
  { label: 'POWER UNIT', value: '1.6L 90° V6 Turbo Hybrid' },
  { label: 'PEAK HORSEPOWER', value: '1,050+ HP @ 15,000 RPM' },
  { label: 'TOP VELOCITY', value: '358 km/h (222 mph)' },
  { label: '0-100 KM/H', value: '2.3 Seconds' },
  { label: 'MINIMUM WEIGHT', value: '798 kg (with driver)' },
  { label: 'MAX CORNERING', value: '5.6 G-Force' },
  { label: 'BRAKING DISTANCE', value: '100-0 km/h in 24m' },
  { label: 'GEARBOX', value: '8-Speed Seamless Sequential' },
];
