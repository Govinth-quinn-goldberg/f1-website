export interface CircuitDetailData {
  id: 'monaco' | 'monza' | 'spa';
  name: string;
  tagline: string;
  location: string;
  country: string;
  firstGrandPrix: string;
  lengthKm: number;
  lengthMiles: number;
  corners: number;
  cornersLeft: number;
  cornersRight: number;
  raceLaps: number;
  raceDistanceKm: number;
  circuitType: string;
  elevationChangeMeters: number;
  officialLapRecord: {
    time: string;
    driver: string;
    car: string;
    year: number;
    notes: string;
  };
  fastestRecordedLap: {
    time: string;
    driver: string;
    car: string;
    year: number;
    session: string;
    avgSpeedKmh?: number;
    notes: string;
  };
  mostWins: {
    driver: string;
    wins: number;
    years: string;
    runnerUp?: string;
  };
  keyCharacteristics: string[];
  notableCorners: {
    name: string;
    number: string;
    description: string;
  }[];
  turnByTurnLayout: string[];
  historicalMoments: {
    year: number;
    title: string;
    description: string;
  }[];
  historicalFatalities: {
    definition: string;
    championshipCount: number;
    context: string;
    notableRecords: {
      driver: string;
      year: number;
      circumstances: string;
    }[];
  };
  mapImage: string;
  heroImage: string;
}

export interface TrackTypeData {
  type: string;
  badge: string;
  subtitle: string;
  description: string;
  examples: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface TrackAnatomyPillar {
  number: string;
  title: string;
  metric: string;
  description: string;
  detail: string;
}

export const TRACK_TYPES: TrackTypeData[] = [
  {
    type: 'STREET CIRCUITS',
    badge: 'ZERO RUN-OFF',
    subtitle: 'PRECISION OVER PURE DOWNFORCE',
    description:
      'Temporary public urban roads closed for Grand Prix weekends. Characterized by unforgiving concrete and Armco barriers right at the track edge, crowned asphalt, slippery manhole covers, and no margin for error.',
    examples: ['Circuit de Monaco', 'Baku City Circuit', 'Marina Bay Singapore', 'Las Vegas Strip Circuit'],
    specs: [
      { label: 'Average Track Width', value: '7m – 11m (Very Narrow)' },
      { label: 'Run-Off Areas', value: 'Virtually None / Armco Barriers' },
      { label: 'Surface Grip', value: 'Low initial grip, rapid weekend evolution' },
      { label: 'Overtaking Difficulty', value: 'High to Extreme' },
    ],
  },
  {
    type: 'PERMANENT CIRCUITS',
    badge: 'HIGH AERODYNAMIC LOAD',
    subtitle: 'PURPOSE-BUILT SPEED SANCTUARIES',
    description:
      'Dedicated motorsport facilities designed from the ground up for Formula 1 machinery. High-grip abrasive asphalt, massive aerodynamic downforce loads in high-speed sweeps, and extensive tarmac and gravel run-offs.',
    examples: ['Silverstone', 'Autodromo Nazionale Monza', 'Circuit de Spa-Francorchamps', 'Suzuka Circuit'],
    specs: [
      { label: 'Average Track Width', value: '12m – 15m (Generous)' },
      { label: 'Run-Off Areas', value: 'FIA Grade 1 Tarmac & Gravel Traps' },
      { label: 'Surface Grip', value: 'Consistent High-Friction Asphalt' },
      { label: 'Overtaking Difficulty', value: 'Moderate to High' },
    ],
  },
  {
    type: 'HYBRID / TEMPORARY',
    badge: 'DUAL IDENTITY',
    subtitle: 'PARKLAND ROADS WITH DEDICATED RACING SECTIONS',
    description:
      'Semi-permanent courses utilizing roads within recreational parks or exhibition grounds. They combine the barrier proximity and variable grip of a street track with high-speed flowing complexes.',
    examples: ['Albert Park Melbourne', 'Circuit Gilles Villeneuve Montreal'],
    specs: [
      { label: 'Average Track Width', value: '10m – 13m (Medium)' },
      { label: 'Run-Off Areas', value: 'Mixed Tecpro Barriers & Grass/Gravel' },
      { label: 'Surface Grip', value: 'Evolves significantly across sessions' },
      { label: 'Overtaking Difficulty', value: 'Moderate with Multi-DRS Zones' },
    ],
  },
];

export const TRACK_ANATOMY_PILLARS: TrackAnatomyPillar[] = [
  {
    number: '01',
    title: 'TRACK LENGTH & RACE DISTANCE',
    metric: '305 KM MINIMUM',
    description: 'Governed by FIA Appendix O Regulations',
    detail:
      'Formula 1 Grands Prix are run to the minimum number of complete laps that exceed 305 kilometers (189.5 miles). The sole historic exception is the Circuit de Monaco, limited to 78 laps and 260.286 km due to its low average speed and 2-hour race time window.',
  },
  {
    number: '02',
    title: 'CORNER DYNAMICS & G-FORCES',
    metric: 'UP TO 5.6 G LATERAL',
    description: 'Hairpins, Chicanes & High-Speed Sweeps',
    detail:
      'Modern F1 cars generate ground-effect downforce exceeding three times their weight. In corners like Pouhon at Spa or Curva Grande at Monza, drivers sustain over 5.0 Gs of lateral load, holding their heads upright through intense neck muscle strain.',
  },
  {
    number: '03',
    title: 'STRAIGHTS & DRS VELOCITY',
    metric: '350+ KM/H TOP SPEED',
    description: 'Drag Reduction System & Slipstreaming',
    detail:
      'Monza features straights where cars exceed 350 km/h (217 mph) before braking zones. When DRS flap opens, drag drops by up to 20%, accelerating the trailing car into heavy slipstream overtaking opportunities.',
  },
  {
    number: '04',
    title: 'TOPOGRAPHY & ELEVATION',
    metric: '102.2M VERTICAL RANGE',
    description: 'Compression, Crests & Aero Pitch Sensitivity',
    detail:
      'Spa-Francorchamps has the highest elevation change in modern F1 at 102.2 meters. The Eau Rouge-Raidillon complex plunges downhill across a brook before steeply climbing 35 vertical meters, compressing the chassis into maximum bottoming out.',
  },
  {
    number: '05',
    title: 'HEAVY BRAKING & DECELERATION',
    metric: '5.2 G DECELERATION',
    description: 'Kinetic Energy Dissipation in 1.8 Seconds',
    detail:
      'Approaching Turn 1 at Monza, drivers slam the carbon brake pedal with over 160 kg of leg force, decelerating from 345 km/h to 75 km/h in less than 110 meters. Brake disc temperatures surge beyond 1,000°C in under two seconds.',
  },
  {
    number: '06',
    title: 'SAFETY ARCHITECTURE & RUN-OFFS',
    metric: 'FIA GRADE 1 CERTIFICATION',
    description: 'Tecpro, High-Friction Asphalt & SAFER Barriers',
    detail:
      'Every circuit must pass strict FIA Grade 1 simulations. Run-off areas use high-friction red/blue abrasive paint stripes to scrub speed without flipping the chassis, supplemented by energy-absorbing Tecpro blocks.',
  },
];

export const HISTORIC_CIRCUITS: CircuitDetailData[] = [
  {
    id: 'monaco',
    name: 'CIRCUIT DE MONACO',
    tagline: 'THE JEWEL IN THE CROWN',
    location: 'Monte Carlo & La Condamine',
    country: 'Monaco',
    firstGrandPrix: 'May 21, 1950 (Inaugural F1 Season)',
    lengthKm: 3.337,
    lengthMiles: 2.074,
    corners: 19,
    cornersLeft: 8,
    cornersRight: 11,
    raceLaps: 78,
    raceDistanceKm: 260.286,
    circuitType: 'Street Circuit',
    elevationChangeMeters: 42,
    officialLapRecord: {
      time: '1:12.909',
      driver: 'Lewis Hamilton',
      car: 'Mercedes-AMG F1 W12 E Performance',
      year: 2021,
      notes: 'Set on Lap 69 during the 2021 Monaco Grand Prix (official race lap record).',
    },
    fastestRecordedLap: {
      time: '1:10.166',
      driver: 'Lewis Hamilton',
      car: 'Mercedes-AMG F1 W10 EQ Power+',
      year: 2019,
      session: 'Qualifying (Q3 Pole Position)',
      avgSpeedKmh: 171.249,
      notes: 'All-time fastest lap ever recorded around the streets of Monaco in any official F1 session.',
    },
    mostWins: {
      driver: 'Ayrton Senna',
      wins: 6,
      years: '1987, 1989, 1990, 1991, 1992, 1993',
      runnerUp: 'Graham Hill (5 wins) & Michael Schumacher (5 wins)',
    },
    keyCharacteristics: [
      'The slowest average speed circuit on the Formula 1 calendar (~160 km/h average in race).',
      'The only Grand Prix on the F1 calendar granted an exemption from the mandatory 305 km race distance.',
      'Extreme emphasis on Saturday qualifying position due to immense difficulty of overtaking.',
      'Iconic tunnel section where atmospheric light changes rapidly entering and exiting onto the harbor.',
    ],
    notableCorners: [
      {
        name: 'Sainte-Dévote',
        number: 'Turn 1',
        description: 'Tight 90° right-hander at the end of the start straight; notorious for opening lap pinches.',
      },
      {
        name: 'Grand Hotel Hairpin',
        number: 'Turn 6',
        description: 'The slowest corner in all of Formula 1, navigated at just 48 km/h on full steering lock.',
      },
      {
        name: 'The Tunnel',
        number: 'Turn 9',
        description: 'Curving right under the Fairmont Hotel; maximum downforce roar and transition from dark to blinding glare.',
      },
      {
        name: 'Nouvelle Chicane',
        number: 'Turns 10 & 11',
        description: 'Hard braking zone straight out of the tunnel descent into the harbor front.',
      },
      {
        name: 'La Rascasse',
        number: 'Turn 18',
        description: 'Sharp 135° left-hand hairpin named after the historic bar beside the paddock.',
      },
    ],
    turnByTurnLayout: [
      'START / FINISH PIT STRAIGHT',
      'SAINTE-DÉVOTE (90° RIGHT)',
      'BEAU RIVAGE (UPHILL SWEEP)',
      'MASSENET & CASINO SQUARE',
      'MIRABEAU HAUTE',
      'GRAND HOTEL HAIRPIN (48 KM/H)',
      'MIRABEAU BAS & PORTIER',
      'THE TUNNEL (BLIND HIGH-SPEED RIGHT)',
      'NOUVELLE CHICANE (HEAVY BRAKING)',
      'TABAC (FAST LEFT)',
      'LOUIS CHIRON & SWIMMING POOL CHICANE',
      'LA RASCASSE & ANTHONY NOGHÈS',
      'RETURN TO START / FINISH',
    ],
    historicalMoments: [
      {
        year: 1988,
        title: 'Senna’s Mystical Qualifying Lap',
        description:
          'Ayrton Senna outqualified his teammate Alain Prost by a staggering 1.427 seconds, describing the experience as driving in a state of altered consciousness far beyond his conscious limits.',
      },
      {
        year: 1996,
        title: 'Olivier Panis Miracle Rain Victory',
        description:
          'In torrential conditions that triggered chaos and retirements, Olivier Panis started 14th in the Ligier-Mugen-Honda and claimed his sole F1 victory as only three cars crossed the finish line.',
      },
      {
        year: 2018,
        title: 'Ricciardo Redemption with Broken MGU-K',
        description:
          'Daniel Ricciardo lost 25% of engine power early in the race when his MGU-K failed, yet used Monaco’s defensive track layout to hold off Sebastian Vettel for 50 grueling laps.',
      },
    ],
    historicalFatalities: {
      definition:
        'Competitor fatalities occurring specifically during FIA Formula One World Championship Grand Prix events at Circuit de Monaco since 1950.',
      championshipCount: 1,
      context:
        'Because of Monaco’s relatively low maximum velocities and early safety barrier adoption, the circuit has suffered fewer fatalities than fast open tracks. Exactly one driver has lost their life during an official World Championship Grand Prix weekend.',
      notableRecords: [
        {
          driver: 'Lorenzo Bandini (Italy)',
          year: 1967,
          circumstances:
            'Crashed his Ferrari 312 at the harbor chicane on Lap 82 during the 1967 Monaco Grand Prix; succumbed to burn injuries three days later on May 10, 1967. The tragedy spurred the FIA to ban straw bales and enforce fireproof suits and modern Armco barriers.',
        },
      ],
    },
    mapImage: '/f1/circuits/monaco_map.png',
    heroImage: '/f1/circuits/monaco_hero.jpg',
  },
  {
    id: 'monza',
    name: 'AUTODROMO NAZIONALE MONZA',
    tagline: 'THE TEMPLE OF SPEED',
    location: 'Monza, Lombardy',
    country: 'Italy',
    firstGrandPrix: 'September 3, 1950 (Inaugural Season Finale)',
    lengthKm: 5.793,
    lengthMiles: 3.6,
    corners: 11,
    cornersLeft: 4,
    cornersRight: 7,
    raceLaps: 53,
    raceDistanceKm: 306.72,
    circuitType: 'Permanent Circuit',
    elevationChangeMeters: 12.8,
    officialLapRecord: {
      time: '1:21.046',
      driver: 'Rubens Barrichello',
      car: 'Ferrari F2004',
      year: 2004,
      notes: 'Set on Lap 29 during the 2004 Italian Grand Prix at an average speed of 257.321 km/h.',
    },
    fastestRecordedLap: {
      time: '1:18.887',
      driver: 'Lewis Hamilton',
      car: 'Mercedes-AMG F1 W11 EQ Performance',
      year: 2020,
      session: 'Qualifying (Q3 Pole Position)',
      avgSpeedKmh: 264.362,
      notes:
        'Fastest average speed lap ever recorded in Formula One history (264.362 km/h / 164.267 mph). In 2025, Max Verstappen set 1:18.792 during qualifying.',
    },
    mostWins: {
      driver: 'Michael Schumacher & Lewis Hamilton',
      wins: 5,
      years: 'Schumacher (1996, 1998, 2000, 2003, 2006) / Hamilton (2012, 2014, 2015, 2017, 2018)',
      runnerUp: 'Nelson Piquet (4 wins)',
    },
    keyCharacteristics: [
      'The highest average speed venue on the Formula One calendar (~260 km/h average lap).',
      'Over 75% of the lap is spent at full throttle with specialized ultra-low-downforce skinny rear wings.',
      'Crucial heavy braking zones into tight chicanes following long slipstream straights.',
      'Home to the passionate Ferrari Tifosi, crowding the track beneath the elevated podium.',
    ],
    notableCorners: [
      {
        name: 'Variante del Rettifilo',
        number: 'Turns 1 & 2',
        description: 'Tight chicane after the 350 km/h pit straight; shedding 270 km/h in 1.8 seconds.',
      },
      {
        name: 'Curva Grande (Biassono)',
        number: 'Turn 3',
        description: 'Long sweeping right-hand curve taken flat out with massive sustained acceleration.',
      },
      {
        name: 'Variante della Roggia',
        number: 'Turns 4 & 5',
        description: 'Fast left-right chicane requiring violent curb-riding on entry and exit.',
      },
      {
        name: 'Curve di Lesmo (Lesmo 1 & 2)',
        number: 'Turns 6 & 7',
        description: 'Two technical, medium-high speed right-handers testing low-downforce mechanical balance.',
      },
      {
        name: 'Variante Ascari',
        number: 'Turns 8, 9 & 10',
        description: 'High-speed left-right-left chicane named after two-time world champion Alberto Ascari.',
      },
      {
        name: 'Curva Parabolica (Alboreto)',
        number: 'Turn 11',
        description: 'Long opening 180° sweep leading onto the main straight; renamed in honor of Michele Alboreto.',
      },
    ],
    turnByTurnLayout: [
      'RETTIFILO MAIN STRAIGHT (350+ KM/H)',
      'VARIANTE DEL RETTIFILO (TURNS 1 & 2 CHICANE)',
      'CURVA GRANDE / BIASSONO (FLAT OUT RIGHT)',
      'VARIANTE DELLA ROGGIA (TURNS 4 & 5 CHICANE)',
      'CURVA DI LESMO 1 (TURN 6 RIGHT)',
      'CURVA DI LESMO 2 (TURN 7 RIGHT)',
      'CURVA DEL SERRAGLIO (UNDER ROAD BRIDGE)',
      'VARIANTE ASCARI (TURNS 8, 9 & 10 COMPLEX)',
      'BACK STRAIGHT (HIGH SPEED)',
      'CURVA PARABOLICA / ALBORETO (TURN 11)',
      'RETURN TO PIT STRAIGHT',
    ],
    historicalMoments: [
      {
        year: 1971,
        title: 'Closest Finish in Formula 1 History',
        description:
          'Peter Gethin won the 1971 Italian Grand Prix by 0.010 seconds over Ronnie Peterson in an unforgettable 5-car slipstream dash where the top five finishers were separated by just 0.61 seconds.',
      },
      {
        year: 1988,
        title: 'Ferrari’s Emotional 1-2 After Enzo’s Death',
        description:
          'Just weeks after founder Enzo Ferrari passed away, McLaren’s dominant Prost and Senna suffered mechanical failure and a lap-car crash, allowing Gerhard Berger and Michele Alboreto to claim an unexpected Ferrari 1-2.',
      },
      {
        year: 2020,
        title: 'Pierre Gasly’s Maiden Triumph',
        description:
          'In a dramatic red-flagged race with Hamilton penalized, Pierre Gasly held off Carlos Sainz by 0.4 seconds to secure AlphaTauri’s famous home win at Monza.',
      },
    ],
    historicalFatalities: {
      definition:
        'Competitor fatalities occurring specifically during FIA Formula One World Championship Grand Prix events at Autodromo Nazionale Monza since 1950.',
      championshipCount: 3,
      context:
        'Due to extreme velocities and pre-1970s unbarricaded borders, Monza historically claimed multiple competitors. In official Formula One World Championship Grand Prix events, three drivers have died (with Alberto Ascari also dying in a 1955 non-race test). Over its entire 100-year multi-category history (including pre-war Grand Prix and motorcycle racing on the banked oval), Monza records 52 driver/rider fatalities.',
      notableRecords: [
        {
          driver: 'Wolfgang von Trips (Germany)',
          year: 1961,
          circumstances:
            'Championship leader crashed before Parabolica on Lap 2 of the 1961 Italian GP after contact with Jim Clark. His Ferrari flew into an embankment, killing von Trips and 15 trackside spectators.',
        },
        {
          driver: 'Jochen Rindt (Austria)',
          year: 1970,
          circumstances:
            'Suffered a front right brake shaft failure on approach to Parabolica during Saturday practice on September 5, 1970. Rindt had accumulated enough points to posthumously win the 1970 Formula One World Championship.',
        },
        {
          driver: 'Ronnie Peterson (Sweden)',
          year: 1978,
          circumstances:
            'Severely injured in a multi-car collision at the race start on September 10, 1978. Successfully operated on for leg fractures, but tragically passed away the next morning from a bone marrow fat embolism.',
        },
      ],
    },
    mapImage: '/f1/circuits/monza_map.png',
    heroImage: '/f1/circuits/monza_hero.jpg',
  },
  {
    id: 'spa',
    name: 'CIRCUIT DE SPA-FRANCORCHAMPS',
    tagline: 'THE ARDENNES ROLLERCOASTER',
    location: 'Stavelot, Malmedy & Spa, Liège',
    country: 'Belgium',
    firstGrandPrix: 'June 18, 1950 (Inaugural F1 Season)',
    lengthKm: 7.004,
    lengthMiles: 4.352,
    corners: 19,
    cornersLeft: 10,
    cornersRight: 9,
    raceLaps: 44,
    raceDistanceKm: 308.052,
    circuitType: 'Permanent Circuit',
    elevationChangeMeters: 102.2,
    officialLapRecord: {
      time: '1:44.701',
      driver: 'Sergio Pérez',
      car: 'Red Bull Racing RB20',
      year: 2024,
      notes: 'Set on Lap 44 during the 2024 Belgian Grand Prix (official race lap record for 7.004 km layout).',
    },
    fastestRecordedLap: {
      time: '1:41.252',
      driver: 'Lewis Hamilton',
      car: 'Mercedes-AMG F1 W11 EQ Performance',
      year: 2020,
      session: 'Qualifying (Q3 Pole Position)',
      avgSpeedKmh: 249.026,
      notes:
        'Fastest qualifying lap on the modern 7.004 km configuration. In 2025 sprint qualifying, Oscar Piastri set 1:40.510.',
    },
    mostWins: {
      driver: 'Michael Schumacher',
      wins: 6,
      years: '1992, 1995, 1996, 1997, 2001, 2002',
      runnerUp: 'Ayrton Senna (5 wins: 1985, 1988, 1989, 1990, 1991)',
    },
    keyCharacteristics: [
      'The longest circuit on the modern Formula 1 calendar (7.004 km / 4.352 miles).',
      'Dramatic 102.2 meter elevation swing winding through the dense Ardennes forest.',
      'Microclimate conditions where one sector can be completely soaked while another is bone dry.',
      'World-famous Eau Rouge and Raidillon uphill crest taken flat-out in modern high-downforce cars.',
    ],
    notableCorners: [
      {
        name: 'La Source',
        number: 'Turn 1',
        description: 'Tight uphill hairpin immediately following the start; scene of numerous first-corner incidents.',
      },
      {
        name: 'Eau Rouge & Raidillon',
        number: 'Turns 2, 3 & 4',
        description: 'Legendary left-right-left sweep plunging down to a stream before a blind 35-meter uphill crest taken flat-out.',
      },
      {
        name: 'Kemmel Straight',
        number: 'Sector 1 Straight',
        description: 'Over 1 kilometer of full-throttle acceleration providing the premier slipstream overtaking zone.',
      },
      {
        name: 'Les Combes',
        number: 'Turns 5 & 6',
        description: 'Fast right-left chicane at the end of the Kemmel Straight at the circuit’s highest geographical point.',
      },
      {
        name: 'Pouhon (Double Gauche)',
        number: 'Turns 10 & 11',
        description: 'Downhill double-apex left-hander taken in 6th/7th gear at 290 km/h with 5.6 Gs of lateral load.',
      },
      {
        name: 'Blanchimont',
        number: 'Turns 16 & 17',
        description: 'Terrifying 310+ km/h blind left sweep requiring complete aerodynamic commitment.',
      },
      {
        name: 'Bus Stop Chicane',
        number: 'Turns 18 & 19',
        description: 'Slow right-left chicane directly preceding the pit entrance and start/finish straight.',
      },
    ],
    turnByTurnLayout: [
      'START / FINISH STRAIGHT',
      'LA SOURCE HAIRPIN (TURN 1 RIGHT)',
      'DESCENT TO EAU ROUGE (TURN 2 LEFT)',
      'RAIDILLON UPHILL CREST (TURNS 3 & 4)',
      'KEMMEL STRAIGHT (1 KM FLAT OUT)',
      'LES COMBES CHICANE (TURNS 5 & 6)',
      'MALMEDY (TURN 7 RIGHT)',
      'BRUXELLES / RIVAGE (TURN 8 DOWNHILL HAIRPIN)',
      'TURN 9 (NO NAME LEFT)',
      'POUHON DOUBLE-APEX (TURNS 10 & 11 AT 290 KM/H)',
      'CAMPUS & PAUL FRÈRE (TURNS 12 & 13)',
      'STAVELOT (TURN 14 RIGHT)',
      'COURBE PAUL FRÈRE & BLANCHIMONT (TURNS 16 & 17)',
      'BUS STOP CHICANE (TURNS 18 & 19)',
      'RETURN TO START / FINISH',
    ],
    historicalMoments: [
      {
        year: 1998,
        title: 'The 13-Car Ardennes Start Carnage',
        description:
          'In blinding spray at the start of the 1998 race, David Coulthard lost control on the descent to Eau Rouge, triggering the costliest 13-car chain reaction pileup in F1 history and a complete restart.',
      },
      {
        year: 2000,
        title: 'Häkkinen’s Dual Overtake on Schumacher',
        description:
          'Widely considered the greatest overtake in F1 history: Mika Häkkinen split a lapped Ricardo Zonta down the inside at 330 km/h on the Kemmel straight while Michael Schumacher went to the outside.',
      },
      {
        year: 1992,
        title: 'Schumacher’s Maiden Formula 1 Win',
        description:
          'One year after his sensational Jordan debut at Spa in 1991, Michael Schumacher masterminded changing weather conditions with Benetton to claim the first of his record 91 Grand Prix victories.',
      },
    ],
    historicalFatalities: {
      definition:
        'Competitor fatalities occurring specifically during FIA Formula One World Championship events and affiliated FIA official meetings at Circuit de Spa-Francorchamps.',
      championshipCount: 2,
      context:
        'On the original, terrifying 14.1 km public-road configuration used until 1978, Spa suffered 48 total fatalities across all motorsport classes. Exactly two Formula One drivers perished during World Championship Grand Prix events (both during the dark 1960 weekend). On the modern 7.004 km purpose-built circuit commissioned in 1979, extensive barrier updates and enlarged run-offs have modernized safety, though high-speed crest hazards remain.',
      notableRecords: [
        {
          driver: 'Chris Bristow (Great Britain)',
          year: 1960,
          circumstances:
            'Lost control of his Cooper-Climax at Burnenville on Lap 20 of the 1960 Belgian Grand Prix on the original 14.1 km road circuit.',
        },
        {
          driver: 'Alan Stacey (Great Britain)',
          year: 1960,
          circumstances:
            'Crashed his Lotus-Climax near Malmedy just minutes later in the same race after reportedly being struck in the face by a bird at 220 km/h.',
        },
        {
          driver: 'Anthoine Hubert (France - FIA F2)',
          year: 2019,
          circumstances:
            'French racing driver fatally injured in a multi-car collision at the exit of Raidillon during the FIA Formula 2 Championship feature race on the Belgian GP support weekend (August 31, 2019). The tragedy led to reprofiled run-offs and relocated grandstands at Raidillon.',
        },
      ],
    },
    mapImage: '/f1/circuits/spa_map.png',
    heroImage: '/f1/circuits/spa_hero.jpg',
  },
];
