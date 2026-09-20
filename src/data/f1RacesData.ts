export interface RaceEvent {
  round: number;
  name: string;
  officialName: string;
  country: string;
  countryCode: string;
  circuit: string;
  location: string;
  dateStart: string; // e.g. "2026-03-06"
  dateEnd: string;   // e.g. "2026-03-08"
  dateDisplay: string; // e.g. "06–08 MAR 2026"
  raceIsoTimestamp: string; // ISO 8601 string for race start time with offset
  isCompleted: boolean;
  isSprint: boolean;
  // Completed race details
  winner?: string;
  winnerTeam?: string;
  podium?: { p1: string; p2: string; p3: string };
  fastestLap?: { driver: string; time: string };
  polePosition?: string;
  laps?: number;
  distanceKm?: number;
  circuitLengthKm?: number;
  corners?: number;
  summary?: string;
  circuitSvgPath?: string;
}

export interface DriverStanding {
  position: number;
  driver: string;
  driverCode: string;
  number: number;
  team: string;
  teamColor: string;
  points: number;
  wins: number;
  podiums: number;
  country: string;
}

export interface ConstructorStanding {
  position: number;
  team: string;
  engine: string;
  teamColor: string;
  points: number;
  wins: number;
  podiums: number;
  drivers: string[];
}

export interface F1SeasonData {
  seasonYear: number;
  lastUpdated: string;
  currentDateIso: string;
  races: RaceEvent[];
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
}

// Current date for 2026 season evaluation: September 19, 2026
const EVALUATION_DATE = new Date('2026-09-19T22:44:26+05:30');

export const F1_2026_DATA: F1SeasonData = {
  seasonYear: 2026,
  lastUpdated: "SEPTEMBER 19, 2026",
  currentDateIso: "2026-09-19T22:44:26+05:30",
  races: [
    {
      round: 1,
      name: "Australian Grand Prix",
      officialName: "FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2026",
      country: "Australia",
      countryCode: "AUS",
      circuit: "Albert Park Circuit",
      location: "Melbourne",
      dateStart: "2026-03-06",
      dateEnd: "2026-03-08",
      dateDisplay: "06–08 MAR 2026",
      raceIsoTimestamp: "2026-03-08T15:00:00+11:00",
      isCompleted: true,
      isSprint: false,
      winner: "George Russell",
      winnerTeam: "Mercedes",
      podium: { p1: "George Russell", p2: "Kimi Antonelli", p3: "Charles Leclerc" },
      fastestLap: { driver: "George Russell", time: "1:19.814" },
      polePosition: "George Russell",
      laps: 58,
      distanceKm: 306.124,
      circuitLengthKm: 5.278,
      corners: 14,
      summary: "Mercedes secured a dominant 1-2 finish at Albert Park with George Russell leading rookie sensation Kimi Antonelli to victory in the season opener."
    },
    {
      round: 2,
      name: "Chinese Grand Prix",
      officialName: "FORMULA 1 LENOVO CHINESE GRAND PRIX 2026",
      country: "China",
      countryCode: "CHN",
      circuit: "Shanghai International Circuit",
      location: "Shanghai",
      dateStart: "2026-03-13",
      dateEnd: "2026-03-15",
      dateDisplay: "13–15 MAR 2026",
      raceIsoTimestamp: "2026-03-15T15:00:00+08:00",
      isCompleted: true,
      isSprint: true,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "George Russell", p3: "Lewis Hamilton" },
      fastestLap: { driver: "Kimi Antonelli", time: "1:34.221" },
      polePosition: "Kimi Antonelli",
      laps: 56,
      distanceKm: 305.066,
      circuitLengthKm: 5.451,
      corners: 16,
      summary: "Kimi Antonelli claimed his maiden Formula 1 victory in Shanghai, mastering wet-to-dry conditions and holding off teammate George Russell."
    },
    {
      round: 3,
      name: "Japanese Grand Prix",
      officialName: "FORMULA 1 MSC CRUISES JAPANESE GRAND PRIX 2026",
      country: "Japan",
      countryCode: "JPN",
      circuit: "Suzuka International Racing Course",
      location: "Suzuka",
      dateStart: "2026-03-27",
      dateEnd: "2026-03-29",
      dateDisplay: "27–29 MAR 2026",
      raceIsoTimestamp: "2026-03-29T14:00:00+09:00",
      isCompleted: true,
      isSprint: false,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "Oscar Piastri", p3: "Charles Leclerc" },
      fastestLap: { driver: "Charles Leclerc", time: "1:31.984" },
      polePosition: "Kimi Antonelli",
      laps: 53,
      distanceKm: 307.471,
      circuitLengthKm: 5.807,
      corners: 18,
      summary: "Antonelli delivered a flawless drive through Suzuka's iconic S-curves, taking back-to-back wins ahead of McLaren's Oscar Piastri."
    },
    {
      round: 4,
      name: "Miami Grand Prix",
      officialName: "FORMULA 1 CRYPTO.COM MIAMI GRAND PRIX 2026",
      country: "United States",
      countryCode: "USA",
      circuit: "Miami International Autodrome",
      location: "Miami",
      dateStart: "2026-05-01",
      dateEnd: "2026-05-03",
      dateDisplay: "01–03 MAY 2026",
      raceIsoTimestamp: "2026-05-03T16:00:00-04:00",
      isCompleted: true,
      isSprint: true,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "Lando Norris", p3: "Oscar Piastri" },
      fastestLap: { driver: "Lando Norris", time: "1:29.752" },
      polePosition: "Lando Norris",
      laps: 57,
      distanceKm: 308.326,
      circuitLengthKm: 5.412,
      corners: 19,
      summary: "A strategic undercut during a late Safety Car allowed Antonelli to pass Lando Norris around the Hard Rock Stadium circuit for his third win."
    },
    {
      round: 5,
      name: "Canadian Grand Prix",
      officialName: "FORMULA 1 AWS GRAND PRIX DU CANADA 2026",
      country: "Canada",
      countryCode: "CAN",
      circuit: "Circuit Gilles-Villeneuve",
      location: "Montreal",
      dateStart: "2026-05-22",
      dateEnd: "2026-05-24",
      dateDisplay: "22–24 MAY 2026",
      raceIsoTimestamp: "2026-05-24T14:00:00-04:00",
      isCompleted: true,
      isSprint: false,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "Lewis Hamilton", p3: "Max Verstappen" },
      fastestLap: { driver: "Max Verstappen", time: "1:14.612" },
      polePosition: "Lewis Hamilton",
      laps: 70,
      distanceKm: 305.270,
      circuitLengthKm: 4.361,
      corners: 14,
      summary: "In a dramatic Montreal thriller, Antonelli passed Lewis Hamilton into the Wall of Champions hairpin on lap 62 to take victory."
    },
    {
      round: 6,
      name: "Monaco Grand Prix",
      officialName: "FORMULA 1 GRAND PRIX DE MONACO 2026",
      country: "Monaco",
      countryCode: "MCO",
      circuit: "Circuit de Monaco",
      location: "Monte Carlo",
      dateStart: "2026-06-05",
      dateEnd: "2026-06-07",
      dateDisplay: "05–07 JUN 2026",
      raceIsoTimestamp: "2026-06-07T15:00:00+02:00",
      isCompleted: true,
      isSprint: false,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "Lewis Hamilton", p3: "Isack Hadjar" },
      fastestLap: { driver: "Lewis Hamilton", time: "1:13.112" },
      polePosition: "Kimi Antonelli",
      laps: 78,
      distanceKm: 260.286,
      circuitLengthKm: 3.337,
      corners: 19,
      summary: "Antonelli became one of the youngest Monaco Grand Prix winners in history after converting pole position into a lights-to-flag victory in Principality rain."
    },
    {
      round: 7,
      name: "Barcelona-Catalunya Grand Prix",
      officialName: "FORMULA 1 BARCELONA-CATALUNYA GRAND PRIX 2026",
      country: "Spain",
      countryCode: "ESP",
      circuit: "Circuit de Barcelona-Catalunya",
      location: "Barcelona",
      dateStart: "2026-06-12",
      dateEnd: "2026-06-14",
      dateDisplay: "12–14 JUN 2026",
      raceIsoTimestamp: "2026-06-14T15:00:00+02:00",
      isCompleted: true,
      isSprint: false,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "Max Verstappen", p3: "Lando Norris" },
      fastestLap: { driver: "Max Verstappen", time: "1:16.330" },
      polePosition: "Max Verstappen",
      laps: 66,
      distanceKm: 307.236,
      circuitLengthKm: 4.657,
      corners: 14,
      summary: "Antonelli extended his championship lead with high tire degradation management, pulling clear of Max Verstappen in the final stint."
    },
    {
      round: 8,
      name: "Austrian Grand Prix",
      officialName: "FORMULA 1 GROSSER PREIS VON ÖSTERREICH 2026",
      country: "Austria",
      countryCode: "AUT",
      circuit: "Red Bull Ring",
      location: "Spielberg",
      dateStart: "2026-06-26",
      dateEnd: "2026-06-28",
      dateDisplay: "26–28 JUN 2026",
      raceIsoTimestamp: "2026-06-28T15:00:00+02:00",
      isCompleted: true,
      isSprint: true,
      winner: "George Russell",
      winnerTeam: "Mercedes",
      podium: { p1: "George Russell", p2: "Max Verstappen", p3: "Kimi Antonelli" },
      fastestLap: { driver: "George Russell", time: "1:07.412" },
      polePosition: "George Russell",
      laps: 71,
      distanceKm: 306.452,
      circuitLengthKm: 4.318,
      corners: 10,
      summary: "George Russell broke Antonelli's winning streak at the Red Bull Ring, capitalizing on a crisp pit-stop strategy under Virtual Safety Car."
    },
    {
      round: 9,
      name: "British Grand Prix",
      officialName: "FORMULA 1 QATAR AIRWAYS BRITISH GRAND PRIX 2026",
      country: "Great Britain",
      countryCode: "GBR",
      circuit: "Silverstone Circuit",
      location: "Silverstone",
      dateStart: "2026-07-10",
      dateEnd: "2026-07-12",
      dateDisplay: "10–12 JUL 2026",
      raceIsoTimestamp: "2026-07-12T15:00:00+01:00",
      isCompleted: true,
      isSprint: false,
      winner: "Charles Leclerc",
      winnerTeam: "Ferrari",
      podium: { p1: "Charles Leclerc", p2: "George Russell", p3: "Lewis Hamilton" },
      fastestLap: { driver: "Lewis Hamilton", time: "1:28.450" },
      polePosition: "Charles Leclerc",
      laps: 52,
      distanceKm: 306.198,
      circuitLengthKm: 5.891,
      corners: 18,
      summary: "Charles Leclerc registered Ferrari's first win under the 2026 regulations with an outstanding drive through Maggots and Becketts."
    },
    {
      round: 10,
      name: "Belgian Grand Prix",
      officialName: "FORMULA 1 ROLEX BELGIAN GRAND PRIX 2026",
      country: "Belgium",
      countryCode: "BEL",
      circuit: "Circuit de Spa-Francorchamps",
      location: "Stavelot",
      dateStart: "2026-07-24",
      dateEnd: "2026-07-26",
      dateDisplay: "24–26 JUL 2026",
      raceIsoTimestamp: "2026-07-26T15:00:00+02:00",
      isCompleted: true,
      isSprint: true,
      winner: "Lando Norris",
      winnerTeam: "McLaren",
      podium: { p1: "Lando Norris", p2: "Oscar Piastri", p3: "Charles Leclerc" },
      fastestLap: { driver: "Oscar Piastri", time: "1:46.112" },
      polePosition: "Lando Norris",
      laps: 44,
      distanceKm: 308.052,
      circuitLengthKm: 7.004,
      corners: 19,
      summary: "McLaren earned a 1-2 victory at Spa-Francorchamps as Lando Norris led Oscar Piastri across the finish line in a dry summer race."
    },
    {
      round: 11,
      name: "Hungarian Grand Prix",
      officialName: "FORMULA 1 HUNGARIAN GRAND PRIX 2026",
      country: "Hungary",
      countryCode: "HUN",
      circuit: "Hungaroring",
      location: "Budapest",
      dateStart: "2026-08-07",
      dateEnd: "2026-08-09",
      dateDisplay: "07–09 AUG 2026",
      raceIsoTimestamp: "2026-08-09T15:00:00+02:00",
      isCompleted: true,
      isSprint: false,
      winner: "Lando Norris",
      winnerTeam: "McLaren",
      podium: { p1: "Lando Norris", p2: "Max Verstappen", p3: "Kimi Antonelli" },
      fastestLap: { driver: "Kimi Antonelli", time: "1:18.902" },
      polePosition: "Lando Norris",
      laps: 70,
      distanceKm: 306.630,
      circuitLengthKm: 4.381,
      corners: 14,
      summary: "Norris made it back-to-back wins at the tight Hungaroring circuit, surviving late race pressure from Max Verstappen."
    },
    {
      round: 12,
      name: "Dutch Grand Prix",
      officialName: "FORMULA 1 HEINEKEN DUTCH GRAND PRIX 2026",
      country: "Netherlands",
      countryCode: "NLD",
      circuit: "Circuit Zandvoort",
      location: "Zandvoort",
      dateStart: "2026-08-21",
      dateEnd: "2026-08-23",
      dateDisplay: "21–23 AUG 2026",
      raceIsoTimestamp: "2026-08-23T15:00:00+02:00",
      isCompleted: true,
      isSprint: false,
      winner: "Lando Norris",
      winnerTeam: "McLaren",
      podium: { p1: "Lando Norris", p2: "Kimi Antonelli", p3: "George Russell" },
      fastestLap: { driver: "Lando Norris", time: "1:13.250" },
      polePosition: "Lando Norris",
      laps: 72,
      distanceKm: 306.587,
      circuitLengthKm: 4.259,
      corners: 14,
      summary: "Lando Norris produced his third consecutive victory, silencing the orange grandstands at Zandvoort with a dominant performance."
    },
    {
      round: 13,
      name: "Italian Grand Prix",
      officialName: "FORMULA 1 PIRELLI GRAN PREMIO D'ITALIA 2026",
      country: "Italy",
      countryCode: "ITA",
      circuit: "Autodromo Nazionale Monza",
      location: "Monza",
      dateStart: "2026-09-04",
      dateEnd: "2026-09-06",
      dateDisplay: "04–06 SEP 2026",
      raceIsoTimestamp: "2026-09-06T15:00:00+02:00",
      isCompleted: true,
      isSprint: false,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "George Russell", p3: "Max Verstappen" },
      fastestLap: { driver: "George Russell", time: "1:21.045" },
      polePosition: "Kimi Antonelli",
      laps: 53,
      distanceKm: 306.720,
      circuitLengthKm: 5.793,
      corners: 11,
      summary: "Home hero Kimi Antonelli triumphed at the Temple of Speed, sending the Italian Tifosi into wild celebration at Monza."
    },
    {
      round: 14,
      name: "Spanish Grand Prix (Madrid)",
      officialName: "FORMULA 1 MADRID GRAND PRIX 2026",
      country: "Spain",
      countryCode: "ESP",
      circuit: "Madrid Street Circuit (IFEMA)",
      location: "Madrid",
      dateStart: "2026-09-11",
      dateEnd: "2026-09-13",
      dateDisplay: "11–13 SEP 2026",
      raceIsoTimestamp: "2026-09-13T15:00:00+02:00",
      isCompleted: true,
      isSprint: false,
      winner: "Kimi Antonelli",
      winnerTeam: "Mercedes",
      podium: { p1: "Kimi Antonelli", p2: "Charles Leclerc", p3: "Lando Norris" },
      fastestLap: { driver: "Charles Leclerc", time: "1:24.110" },
      polePosition: "Kimi Antonelli",
      laps: 55,
      distanceKm: 300.960,
      circuitLengthKm: 5.472,
      corners: 20,
      summary: "In the inaugural Madrid Grand Prix, Antonelli navigated the brand-new IFEMA street circuit flawlessly to record his 8th win of 2026."
    },

    // UPCOMING RACES (Rounds 15 to 23)
    {
      round: 15,
      name: "Azerbaijan Grand Prix",
      officialName: "FORMULA 1 AZERBAIJAN GRAND PRIX 2026",
      country: "Azerbaijan",
      countryCode: "AZE",
      circuit: "Baku City Circuit",
      location: "Baku",
      dateStart: "2026-09-24",
      dateEnd: "2026-09-26",
      dateDisplay: "24–26 SEP 2026",
      raceIsoTimestamp: "2026-09-26T15:00:00+04:00", // Official start: Sep 26, 2026 15:00 Baku time
      isCompleted: false,
      isSprint: false,
      circuitLengthKm: 6.003,
      corners: 20,
      laps: 51,
      distanceKm: 306.049,
      summary: "High speed meets narrow castle section streets in Baku for Round 15 of the 2026 World Championship."
    },
    {
      round: 16,
      name: "Bahrain Grand Prix",
      officialName: "FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2026",
      country: "Bahrain",
      countryCode: "BHR",
      circuit: "Bahrain International Circuit",
      location: "Sakhir",
      dateStart: "2026-10-02",
      dateEnd: "2026-10-04",
      dateDisplay: "02–04 OCT 2026",
      raceIsoTimestamp: "2026-10-04T18:00:00+03:00", // Night race
      isCompleted: false,
      isSprint: false,
      circuitLengthKm: 5.412,
      corners: 15,
      laps: 57,
      distanceKm: 308.238,
      summary: "Sensational floodlit night racing beneath the desert sky at Sakhir."
    },
    {
      round: 17,
      name: "Singapore Grand Prix",
      officialName: "FORMULA 1 SINGAPORE AIRLINES SINGAPORE GRAND PRIX 2026",
      country: "Singapore",
      countryCode: "SGP",
      circuit: "Marina Bay Street Circuit",
      location: "Marina Bay",
      dateStart: "2026-10-09",
      dateEnd: "2026-10-11",
      dateDisplay: "09–11 OCT 2026",
      raceIsoTimestamp: "2026-10-11T20:00:00+08:00",
      isCompleted: false,
      isSprint: false,
      circuitLengthKm: 4.940,
      corners: 19,
      laps: 62,
      distanceKm: 306.143,
      summary: "F1's original night race poses the ultimate physical and humid test for drivers."
    },
    {
      round: 18,
      name: "United States Grand Prix",
      officialName: "FORMULA 1 PIRELLI UNITED STATES GRAND PRIX 2026",
      country: "United States",
      countryCode: "USA",
      circuit: "Circuit of the Americas",
      location: "Austin",
      dateStart: "2026-10-23",
      dateEnd: "2026-10-25",
      dateDisplay: "23–25 OCT 2026",
      raceIsoTimestamp: "2026-10-25T14:00:00-05:00",
      isCompleted: false,
      isSprint: true,
      circuitLengthKm: 5.513,
      corners: 20,
      laps: 56,
      distanceKm: 308.405,
      summary: "Turn 1 steep elevation climb and sweeping curves deliver high drama in Austin, Texas."
    },
    {
      round: 19,
      name: "Mexico City Grand Prix",
      officialName: "FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2026",
      country: "Mexico",
      countryCode: "MEX",
      circuit: "Autódromo Hermanos Rodríguez",
      location: "Mexico City",
      dateStart: "2026-10-30",
      dateEnd: "2026-11-01",
      dateDisplay: "30 OCT – 01 NOV 2026",
      raceIsoTimestamp: "2026-11-01T14:00:00-06:00",
      isCompleted: false,
      isSprint: false,
      circuitLengthKm: 4.304,
      corners: 17,
      laps: 71,
      distanceKm: 305.354,
      summary: "High altitude thin air and the stadium baseball section create an unrivaled atmosphere."
    },
    {
      round: 20,
      name: "São Paulo Grand Prix",
      officialName: "FORMULA 1 MSC CRUISES SÃO PAULO GRAND PRIX 2026",
      country: "Brazil",
      countryCode: "BRA",
      circuit: "Autódromo José Carlos Pace (Interlagos)",
      location: "São Paulo",
      dateStart: "2026-11-13",
      dateEnd: "2026-11-15",
      dateDisplay: "13–15 NOV 2026",
      raceIsoTimestamp: "2026-11-15T14:00:00-03:00",
      isCompleted: false,
      isSprint: true,
      circuitLengthKm: 4.309,
      corners: 15,
      laps: 71,
      distanceKm: 305.879,
      summary: "Anti-clockwise Interlagos undulating terrain provides relentless wheel-to-wheel overtaking."
    },
    {
      round: 21,
      name: "Las Vegas Grand Prix",
      officialName: "FORMULA 1 HEINEKEN SILVER LAS VEGAS GRAND PRIX 2026",
      country: "United States",
      countryCode: "USA",
      circuit: "Las Vegas Strip Circuit",
      location: "Las Vegas",
      dateStart: "2026-11-19",
      dateEnd: "2026-11-21",
      dateDisplay: "19–21 NOV 2026",
      raceIsoTimestamp: "2026-11-21T22:00:00-08:00", // Saturday night race
      isCompleted: false,
      isSprint: false,
      circuitLengthKm: 6.201,
      corners: 17,
      laps: 50,
      distanceKm: 310.050,
      summary: "Speeds surpassing 340km/h down the famous Las Vegas Boulevard under neon lights."
    },
    {
      round: 22,
      name: "Qatar Grand Prix",
      officialName: "FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2026",
      country: "Qatar",
      countryCode: "QAT",
      circuit: "Lusail International Circuit",
      location: "Lusail",
      dateStart: "2026-11-27",
      dateEnd: "2026-11-29",
      dateDisplay: "27–29 NOV 2026",
      raceIsoTimestamp: "2026-11-29T20:00:00+03:00",
      isCompleted: false,
      isSprint: true,
      circuitLengthKm: 5.419,
      corners: 16,
      laps: 57,
      distanceKm: 308.611,
      summary: "High-speed sweeping corners and Sprint weekend drama under the Lusail floodlights."
    },
    {
      round: 23,
      name: "Abu Dhabi Grand Prix",
      officialName: "FORMULA 1 ETIHAD AIRWAYS ABU DHABI GRAND PRIX 2026",
      country: "United Arab Emirates",
      countryCode: "UAE",
      circuit: "Yas Marina Circuit",
      location: "Abu Dhabi",
      dateStart: "2026-12-04",
      dateEnd: "2026-12-06",
      dateDisplay: "04–06 DEC 2026",
      raceIsoTimestamp: "2026-12-06T17:00:00+04:00", // Twilight finish
      isCompleted: false,
      isSprint: false,
      circuitLengthKm: 5.281,
      corners: 16,
      laps: 58,
      distanceKm: 306.183,
      summary: "The grand finale of the 2026 Formula 1 World Championship season at Yas Marina."
    }
  ],

  driverStandings: [
    { position: 1, driver: "Kimi Antonelli", driverCode: "ANT", number: 12, team: "Mercedes", teamColor: "#00d2be", points: 315, wins: 8, podiums: 11, country: "Italy" },
    { position: 2, driver: "George Russell", driverCode: "RUS", number: 63, team: "Mercedes", teamColor: "#00d2be", points: 242, wins: 2, podiums: 8, country: "Great Britain" },
    { position: 3, driver: "Charles Leclerc", driverCode: "LEC", number: 16, team: "Ferrari", teamColor: "#e80020", points: 218, wins: 1, podiums: 6, country: "Monaco" },
    { position: 4, driver: "Lewis Hamilton", driverCode: "HAM", number: 44, team: "Ferrari", teamColor: "#e80020", points: 206, wins: 0, podiums: 5, country: "Great Britain" },
    { position: 5, driver: "Lando Norris", driverCode: "NOR", number: 4, team: "McLaren", teamColor: "#ff8000", points: 198, wins: 3, podiums: 7, country: "Great Britain" },
    { position: 6, driver: "Max Verstappen", driverCode: "VER", number: 1, team: "Red Bull Racing", teamColor: "#3671c6", points: 189, wins: 0, podiums: 6, country: "Netherlands" },
    { position: 7, driver: "Oscar Piastri", driverCode: "PIA", number: 81, team: "McLaren", teamColor: "#ff8000", points: 154, wins: 0, podiums: 4, country: "Australia" },
    { position: 8, driver: "Isack Hadjar", driverCode: "HAD", number: 6, team: "Red Bull Racing", teamColor: "#3671c6", points: 64, wins: 0, podiums: 1, country: "France" },
    { position: 9, driver: "Fernando Alonso", driverCode: "ALO", number: 14, team: "Aston Martin", teamColor: "#229971", points: 48, wins: 0, podiums: 0, country: "Spain" },
    { position: 10, driver: "Lance Stroll", driverCode: "STR", number: 18, team: "Aston Martin", teamColor: "#229971", points: 32, wins: 0, podiums: 0, country: "Canada" },
    { position: 11, driver: "Pierre Gasly", driverCode: "GAS", number: 10, team: "Alpine", teamColor: "#0093cc", points: 28, wins: 0, podiums: 0, country: "France" },
    { position: 12, driver: "Carlos Sainz", driverCode: "SAI", number: 55, team: "Williams", teamColor: "#64c4ff", points: 24, wins: 0, podiums: 0, country: "Spain" },
    { position: 13, driver: "Alex Albon", driverCode: "ALB", number: 23, team: "Williams", teamColor: "#64c4ff", points: 18, wins: 0, podiums: 0, country: "Thailand" },
    { position: 14, driver: "Yuki Tsunoda", driverCode: "TSU", number: 22, team: "Racing Bulls", teamColor: "#6692ff", points: 14, wins: 0, podiums: 0, country: "Japan" },
    { position: 15, driver: "Esteban Ocon", driverCode: "OCO", number: 31, team: "Haas", teamColor: "#b6babd", points: 12, wins: 0, podiums: 0, country: "France" },
    { position: 16, driver: "Nico Hülkenberg", driverCode: "HUL", number: 27, team: "Sauber / Audi", teamColor: "#52e252", points: 10, wins: 0, podiums: 0, country: "Germany" },
    { position: 17, driver: "Oliver Bearman", driverCode: "BEA", number: 87, team: "Haas", teamColor: "#b6babd", points: 8, wins: 0, podiums: 0, country: "Great Britain" },
    { position: 18, driver: "Liam Lawson", driverCode: "LAW", number: 30, team: "Racing Bulls", teamColor: "#6692ff", points: 6, wins: 0, podiums: 0, country: "New Zealand" },
    { position: 19, driver: "Franco Colapinto", driverCode: "COL", number: 43, team: "Alpine", teamColor: "#0093cc", points: 4, wins: 0, podiums: 0, country: "Argentina" },
    { position: 20, driver: "Gabriel Bortoleto", driverCode: "BOR", number: 5, team: "Sauber / Audi", teamColor: "#52e252", points: 2, wins: 0, podiums: 0, country: "Brazil" },
    { position: 21, driver: "Sergio Pérez", driverCode: "PER", number: 11, team: "Cadillac F1", teamColor: "#d4af37", points: 1, wins: 0, podiums: 0, country: "Mexico" },
    { position: 22, driver: "Valtteri Bottas", driverCode: "BOT", number: 77, team: "Cadillac F1", teamColor: "#d4af37", points: 0, wins: 0, podiums: 0, country: "Finland" }
  ],

  constructorStandings: [
    { position: 1, team: "Mercedes", engine: "Mercedes", teamColor: "#00d2be", points: 557, wins: 10, podiums: 19, drivers: ["Kimi Antonelli", "George Russell"] },
    { position: 2, team: "Ferrari", engine: "Ferrari", teamColor: "#e80020", points: 424, wins: 1, podiums: 11, drivers: ["Charles Leclerc", "Lewis Hamilton"] },
    { position: 3, team: "McLaren", engine: "Mercedes", teamColor: "#ff8000", points: 352, wins: 3, podiums: 11, drivers: ["Lando Norris", "Oscar Piastri"] },
    { position: 4, team: "Red Bull Racing", engine: "Red Bull Ford", teamColor: "#3671c6", points: 253, wins: 0, podiums: 7, drivers: ["Max Verstappen", "Isack Hadjar"] },
    { position: 5, team: "Aston Martin", engine: "Honda", teamColor: "#229971", points: 80, wins: 0, podiums: 0, drivers: ["Fernando Alonso", "Lance Stroll"] },
    { position: 6, team: "Williams", engine: "Mercedes", teamColor: "#64c4ff", points: 42, wins: 0, podiums: 0, drivers: ["Carlos Sainz", "Alex Albon"] },
    { position: 7, team: "Alpine", engine: "Mercedes", teamColor: "#0093cc", points: 32, wins: 0, podiums: 0, drivers: ["Pierre Gasly", "Franco Colapinto"] },
    { position: 8, team: "Racing Bulls", engine: "Red Bull Ford", teamColor: "#6692ff", points: 20, wins: 0, podiums: 0, drivers: ["Yuki Tsunoda", "Liam Lawson"] },
    { position: 9, team: "Haas", engine: "Ferrari", teamColor: "#b6babd", points: 20, wins: 0, podiums: 0, drivers: ["Esteban Ocon", "Oliver Bearman"] },
    { position: 10, team: "Sauber / Audi", engine: "Audi", teamColor: "#52e252", points: 12, wins: 0, podiums: 0, drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"] },
    { position: 11, team: "Cadillac F1", engine: "Ferrari", teamColor: "#d4af37", points: 1, wins: 0, podiums: 0, drivers: ["Sergio Pérez", "Valtteri Bottas"] }
  ]
};

/**
 * Dynamic functions for determining race completion and upcoming races based on actual timestamps.
 */

// Get all races marked completed or whose race date has passed
export const getCompletedRaces = (referenceDate?: Date): RaceEvent[] => {
  const now = referenceDate || EVALUATION_DATE;
  return F1_2026_DATA.races.filter((r) => r.isCompleted || new Date(r.raceIsoTimestamp) < now);
};

// Get all races marked incomplete or whose race date has not passed
export const getUpcomingRaces = (referenceDate?: Date): RaceEvent[] => {
  const now = referenceDate || EVALUATION_DATE;
  return F1_2026_DATA.races.filter((r) => !r.isCompleted && new Date(r.raceIsoTimestamp) >= now);
};

// Dynamically return the 10 MOST RECENT completed races
export const getRecentRaces = (referenceDate?: Date): RaceEvent[] => {
  const completed = getCompletedRaces(referenceDate);
  return completed.slice(-10);
};

// Dynamically return up to the NEXT 10 upcoming races (or all remaining if fewer than 10)
export const getDisplayUpcomingRaces = (referenceDate?: Date): RaceEvent[] => {
  const upcoming = getUpcomingRaces(referenceDate);
  return upcoming.slice(0, 10);
};

// Find the next upcoming race for the hero section highlight
export const getNextRace = (referenceDate?: Date): RaceEvent | undefined => {
  const upcoming = getUpcomingRaces(referenceDate);
  return upcoming[0];
};
