import { RaceEvent, DriverStanding, ConstructorStanding, F1SeasonData, F1_2026_DATA } from '../data/f1RacesData';

const BASE_URL = 'https://api.jolpi.ca/ergast/f1/current';
const CACHE_KEY = 'f1_jolpica_live_data_v1';

// Constructor team color map matching the app's aesthetic
const TEAM_COLORS: Record<string, string> = {
  mercedes: '#00d2be',
  ferrari: '#e80020',
  mclaren: '#ff8000',
  red_bull: '#3671c6',
  redbull: '#3671c6',
  aston_martin: '#229971',
  alpine: '#0093cc',
  williams: '#64c4ff',
  rb: '#6692ff',
  racing_bulls: '#6692ff',
  haas: '#b6babd',
  audi: '#52e252',
  sauber: '#52e252',
  cadillac: '#d4af37',
};

// Power unit / Engine lookup
const TEAM_ENGINES: Record<string, string> = {
  mercedes: 'Mercedes',
  ferrari: 'Ferrari',
  mclaren: 'Mercedes',
  red_bull: 'Red Bull Ford',
  aston_martin: 'Honda',
  williams: 'Mercedes',
  alpine: 'Mercedes',
  rb: 'Red Bull Ford',
  haas: 'Ferrari',
  audi: 'Audi',
  sauber: 'Audi',
  cadillac: 'Ferrari',
};

// Country name to 3-letter IOC/ISO country code
const COUNTRY_CODES: Record<string, string> = {
  'Australia': 'AUS',
  'China': 'CHN',
  'Japan': 'JPN',
  'USA': 'USA',
  'United States': 'USA',
  'Canada': 'CAN',
  'Monaco': 'MCO',
  'Spain': 'ESP',
  'Austria': 'AUT',
  'UK': 'GBR',
  'Great Britain': 'GBR',
  'Belgium': 'BEL',
  'Hungary': 'HUN',
  'Netherlands': 'NLD',
  'Italy': 'ITA',
  'Azerbaijan': 'AZE',
  'Singapore': 'SGP',
  'Mexico': 'MEX',
  'Brazil': 'BRA',
  'Qatar': 'QAT',
  'UAE': 'UAE',
  'United Arab Emirates': 'UAE',
  'Bahrain': 'BHR',
  'Saudi Arabia': 'SAU',
  'Malaysia': 'MYS',
};

function getTeamColor(constructorId: string): string {
  const normalized = constructorId.toLowerCase().replace(/[^a-z0-9_]/g, '');
  return TEAM_COLORS[normalized] || TEAM_COLORS[constructorId] || '#e10600';
}

function getTeamEngine(constructorId: string): string {
  const normalized = constructorId.toLowerCase().replace(/[^a-z0-9_]/g, '');
  return TEAM_ENGINES[normalized] || 'Formula 1 PU';
}

function getCountryCode(country: string): string {
  return COUNTRY_CODES[country] || country.slice(0, 3).toUpperCase();
}

// Format date range e.g., "2026-09-24" to "2026-09-26" -> "24–26 SEP 2026"
function formatDateDisplay(startDateStr: string, endDateStr: string): string {
  try {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const startDay = String(start.getDate()).padStart(2, '0');
    const endDay = String(end.getDate()).padStart(2, '0');
    const monthStr = months[end.getMonth()];
    const yearStr = end.getFullYear();

    if (start.getMonth() === end.getMonth()) {
      return `${startDay}–${endDay} ${monthStr} ${yearStr}`;
    } else {
      const startMonthStr = months[start.getMonth()];
      return `${startDay} ${startMonthStr} – ${endDay} ${monthStr} ${yearStr}`;
    }
  } catch {
    return endDateStr;
  }
}

export interface FetchF1DataResult {
  data: F1SeasonData;
  isFallback: boolean;
  lastFetchedIso: string;
  errorMsg?: string;
}

export async function fetchLiveF1Data(): Promise<FetchF1DataResult> {
  // Check sessionStorage cache first to avoid repetitive API requests during session
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.data && parsed.lastFetchedIso) {
        return {
          data: parsed.data,
          isFallback: false,
          lastFetchedIso: parsed.lastFetchedIso,
        };
      }
    }
  } catch (e) {
    console.warn('Session cache read error:', e);
  }

  try {
    // Perform parallel requests to documented Jolpica Ergast trailing-slash endpoints
    const headers = { 'Accept': 'application/json' };
    const [scheduleRes, driverStandingsRes, constructorStandingsRes, resultsRes] = await Promise.all([
      fetch(`${BASE_URL}/races/`, { headers }),
      fetch(`${BASE_URL}/driverstandings/`, { headers }),
      fetch(`${BASE_URL}/constructorstandings/`, { headers }),
      fetch(`${BASE_URL}/results/?limit=1000`, { headers }),
    ]);

    if (!scheduleRes.ok || !driverStandingsRes.ok || !constructorStandingsRes.ok) {
      throw new Error(`API response error: Schedule (${scheduleRes.status}), Drivers (${driverStandingsRes.status}), Constructors (${constructorStandingsRes.status})`);
    }

    const scheduleJson = await scheduleRes.json();
    const driverStandingsJson = await driverStandingsRes.json();
    const constructorStandingsJson = await constructorStandingsRes.json();
    const resultsJson = resultsRes.ok ? await resultsRes.json() : null;

    const mrSchedule = scheduleJson.MRData?.RaceTable;
    const seasonYear = parseInt(mrSchedule?.season || new Date().getFullYear().toString(), 10);
    const racesList = mrSchedule?.Races || [];

    const mrDriverStandings = driverStandingsJson.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
    const mrConstructorStandings = constructorStandingsJson.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
    const mrResultsRaces = resultsJson?.MRData?.RaceTable?.Races || [];

    // Map race results into a lookup map by round
    const resultsByRound: Record<number, any> = {};
    mrResultsRaces.forEach((r: any) => {
      resultsByRound[parseInt(r.round, 10)] = r;
    });

    // Map Podium counts per driver & constructor across all completed races
    const driverPodiums: Record<string, number> = {};
    const constructorPodiums: Record<string, number> = {};

    mrResultsRaces.forEach((r: any) => {
      (r.Results || []).slice(0, 3).forEach((res: any) => {
        const driverId = res.Driver?.driverId;
        const constructorId = res.Constructor?.constructorId;
        if (driverId) driverPodiums[driverId] = (driverPodiums[driverId] || 0) + 1;
        if (constructorId) constructorPodiums[constructorId] = (constructorPodiums[constructorId] || 0) + 1;
      });
    });

    const now = new Date();

    // Transform Jolpica Races to application RaceEvent[]
    const races: RaceEvent[] = racesList.map((race: any) => {
      const round = parseInt(race.round, 10);
      const raceResultsObj = resultsByRound[round];
      const resultsArray = raceResultsObj?.Results || [];

      // Determine completion status: either has results OR race time has passed
      const raceIsoTimestamp = race.date && race.time
        ? `${race.date}T${race.time}`
        : `${race.date}T15:00:00Z`;

      const isTimePassed = new Date(raceIsoTimestamp) < now;
      const isCompleted = resultsArray.length > 0 || isTimePassed;

      const p1 = resultsArray.find((res: any) => res.position === '1');
      const p2 = resultsArray.find((res: any) => res.position === '2');
      const p3 = resultsArray.find((res: any) => res.position === '3');
      const pole = resultsArray.find((res: any) => res.grid === '1');

      // Fastest lap calculation
      let fastestLap: { driver: string; time: string } | undefined = undefined;
      resultsArray.forEach((res: any) => {
        if (res.FastestLap?.rank === '1' && res.FastestLap?.Time?.time) {
          fastestLap = {
            driver: `${res.Driver.givenName} ${res.Driver.familyName}`,
            time: res.FastestLap.Time.time,
          };
        }
      });

      const startDateStr = race.FirstPractice?.date || race.date;
      const endDateStr = race.date;
      const dateDisplay = formatDateDisplay(startDateStr, endDateStr);

      const country = race.Circuit?.Location?.country || 'Grand Prix';
      const countryCode = getCountryCode(country);

      return {
        round,
        name: race.raceName,
        officialName: `${race.raceName.toUpperCase()} ${seasonYear}`,
        country,
        countryCode,
        circuit: race.Circuit?.circuitName || 'Circuit',
        location: race.Circuit?.Location?.locality || country,
        dateStart: startDateStr,
        dateEnd: endDateStr,
        dateDisplay,
        raceIsoTimestamp,
        isCompleted,
        isSprint: !!race.Sprint,
        winner: p1 ? `${p1.Driver.givenName} ${p1.Driver.familyName}` : undefined,
        winnerTeam: p1?.Constructor?.name,
        podium: (p1 && p2 && p3) ? {
          p1: `${p1.Driver.givenName} ${p1.Driver.familyName}`,
          p2: `${p2.Driver.givenName} ${p2.Driver.familyName}`,
          p3: `${p3.Driver.givenName} ${p3.Driver.familyName}`,
        } : undefined,
        fastestLap,
        polePosition: pole ? `${pole.Driver.givenName} ${pole.Driver.familyName}` : undefined,
        laps: p1 ? parseInt(p1.laps, 10) : undefined,
        summary: `Official ${race.raceName} held at ${race.Circuit?.circuitName} in ${race.Circuit?.Location?.locality}, ${country}.`,
      };
    });

    // Map Drivers Standings
    const driverStandings: DriverStanding[] = mrDriverStandings.map((ds: any) => {
      const position = parseInt(ds.position, 10);
      const driver = `${ds.Driver.givenName} ${ds.Driver.familyName}`;
      const driverCode = ds.Driver.code || ds.Driver.driverId.slice(0, 3).toUpperCase();
      const number = parseInt(ds.Driver.permanentNumber || ds.number || '0', 10);
      const primaryConstructor = ds.Constructors?.[0];
      const team = primaryConstructor?.name || 'N/A';
      const constructorId = primaryConstructor?.constructorId || '';
      const teamColor = getTeamColor(constructorId);
      const points = parseFloat(ds.points);
      const wins = parseInt(ds.wins, 10);
      const podiums = driverPodiums[ds.Driver.driverId] || 0;
      const country = ds.Driver.nationality || 'International';

      return {
        position,
        driver,
        driverCode,
        number,
        team,
        teamColor,
        points,
        wins,
        podiums,
        country,
      };
    });

    // Map Constructor Standings
    const driverTeamsMap: Record<string, string[]> = {};
    driverStandings.forEach((ds) => {
      if (!driverTeamsMap[ds.team]) driverTeamsMap[ds.team] = [];
      if (!driverTeamsMap[ds.team].includes(ds.driver)) {
        driverTeamsMap[ds.team].push(ds.driver);
      }
    });

    const constructorStandings: ConstructorStanding[] = mrConstructorStandings.map((cs: any) => {
      const position = parseInt(cs.position, 10);
      const team = cs.Constructor.name;
      const constructorId = cs.Constructor.constructorId || '';
      const teamColor = getTeamColor(constructorId);
      const engine = getTeamEngine(constructorId);
      const points = parseFloat(cs.points);
      const wins = parseInt(cs.wins, 10);
      const podiums = constructorPodiums[constructorId] || 0;
      const drivers = driverTeamsMap[team] || [];

      return {
        position,
        team,
        engine,
        teamColor,
        points,
        wins,
        podiums,
        drivers,
      };
    });

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).toUpperCase();

    const seasonData: F1SeasonData = {
      seasonYear,
      lastUpdated: formattedDate,
      currentDateIso: new Date().toISOString(),
      races,
      driverStandings,
      constructorStandings,
    };

    const nowIso = new Date().toISOString();
    const resultObj: FetchF1DataResult = {
      data: seasonData,
      isFallback: false,
      lastFetchedIso: nowIso,
    };

    // Save to sessionStorage
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(resultObj));
    } catch (e) {
      console.warn('Session cache write error:', e);
    }

    return resultObj;

  } catch (err: any) {
    console.error('Failed to fetch Jolpica F1 API data, using static fallback:', err);
    return {
      data: F1_2026_DATA,
      isFallback: true,
      lastFetchedIso: new Date().toISOString(),
      errorMsg: err?.message || 'Network fetch failed',
    };
  }
}
