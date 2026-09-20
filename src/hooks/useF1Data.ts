import { useState, useEffect, useCallback, useMemo } from 'react';
import { F1SeasonData, RaceEvent, DriverStanding, ConstructorStanding, F1_2026_DATA } from '../data/f1RacesData';
import { fetchLiveF1Data, FetchF1DataResult } from '../services/f1ApiService';

export interface UseF1DataReturn {
  seasonData: F1SeasonData;
  isLoading: boolean;
  isFallback: boolean;
  error: string | null;
  refetch: () => void;
  completedRaces: RaceEvent[];
  recentRaces: RaceEvent[];
  upcomingRaces: RaceEvent[];
  displayUpcomingRaces: RaceEvent[];
  nextRace: RaceEvent | undefined;
  leaderDriver: DriverStanding | undefined;
  leaderTeam: ConstructorStanding | undefined;
}

export function useF1Data(): UseF1DataReturn {
  const [seasonData, setSeasonData] = useState<F1SeasonData>(F1_2026_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (ignoreCache: boolean = false) => {
    setIsLoading(true);
    setError(null);

    if (ignoreCache) {
      try {
        sessionStorage.removeItem('f1_jolpica_live_data_v1');
      } catch {}
    }

    const result: FetchF1DataResult = await fetchLiveF1Data();
    setSeasonData(result.data);
    setIsFallback(result.isFallback);
    if (result.isFallback && result.errorMsg) {
      setError(result.errorMsg);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const completedRaces = useMemo(() => {
    const now = new Date();
    return seasonData.races.filter((r) => r.isCompleted || new Date(r.raceIsoTimestamp) < now);
  }, [seasonData]);

  const upcomingRaces = useMemo(() => {
    const now = new Date();
    return seasonData.races.filter((r) => !r.isCompleted && new Date(r.raceIsoTimestamp) >= now);
  }, [seasonData]);

  const recentRaces = useMemo(() => {
    return completedRaces.slice(-10);
  }, [completedRaces]);

  const displayUpcomingRaces = useMemo(() => {
    return upcomingRaces.slice(0, 10);
  }, [upcomingRaces]);

  const nextRace = useMemo(() => {
    return upcomingRaces[0];
  }, [upcomingRaces]);

  const leaderDriver = useMemo(() => {
    return seasonData.driverStandings[0];
  }, [seasonData]);

  const leaderTeam = useMemo(() => {
    return seasonData.constructorStandings[0];
  }, [seasonData]);

  return {
    seasonData,
    isLoading,
    isFallback,
    error,
    refetch: () => loadData(true),
    completedRaces,
    recentRaces,
    upcomingRaces,
    displayUpcomingRaces,
    nextRace,
    leaderDriver,
    leaderTeam,
  };
}
