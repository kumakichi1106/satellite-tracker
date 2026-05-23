import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { useTleRecords } from '../hooks/useTleRecords';
import { useSatellitePositions } from '../hooks/useSatellitePositions';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useOrbitPrediction } from '../hooks/useOrbitPrediction';
import { useVisibleTleRecords } from '../hooks/useVisibleTleRecords';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import type { OrbitPrediction } from '../dataModel/orbitPrediction';
import type { TleGroupKey } from '../constants/tleGroups';

type SatelliteTrackerContextValue = {
    selectedSatellite: TleRecordWithPosition | null;
    selectedSatelliteName: string | null;
    selectedOrbitPrediction: OrbitPrediction | null;
    selectedTleGroup: TleGroupKey;
    satelliteSearchText: string;
    visibleSatellites: TleRecordWithPosition[];
    filteredSatelliteCount: number;
    totalSatelliteCount: number;
    visibleSatelliteLimit: number;
    setSatelliteSearchText: (text: string) => void;
    selectSatellite: (name: string) => void;
    clearSelectedSatellite: () => void;
    changeTleGroup: (group: TleGroupKey) => void;
    isLoading: boolean;
    errorMessage: string | null;
};

type SatelliteTrackerProviderProps = {
    children: ReactNode;
};

const SatelliteTrackerContext = createContext<SatelliteTrackerContextValue | null>(null);

export function SatelliteTrackerProvider({ children }: SatelliteTrackerProviderProps) {
    const currentTime = useCurrentTime(1000);
    const [selectedTleGroup, setSelectedTleGroup] = useState<TleGroupKey>('stations');
    const [selectedSatelliteName, setSelectedSatelliteName] = useState<string | null>(null);
    const [satelliteSearchText, setSatelliteSearchText] = useState('');
    const { records, isLoading, errorMessage } = useTleRecords(selectedTleGroup);

    const {
        visibleRecords,
        filteredRecordCount,
        totalRecordCount,
        visibleRecordLimit,
    } = useVisibleTleRecords({
        records,
        searchText: satelliteSearchText,
    });

    const visibleSatellites = useSatellitePositions(visibleRecords, currentTime);

    const selectSatellite = (name: string) => {
        setSelectedSatelliteName(name);
    };

    const clearSelectedSatellite = () => {
        setSelectedSatelliteName(null);
    };

    const changeTleGroup = (group: TleGroupKey) => {
        setSelectedTleGroup(group);
        setSatelliteSearchText('');
        clearSelectedSatellite();
    };

    const selectedSatellite = useMemo(
        () => visibleSatellites.find(({ tleRecord }) => tleRecord.name === selectedSatelliteName) ?? null,
        [visibleSatellites, selectedSatelliteName],
    );

    const selectedOrbitPrediction = useOrbitPrediction(selectedSatellite);

    const value: SatelliteTrackerContextValue = {
        visibleSatellites,
        selectedSatellite,
        selectedSatelliteName,
        selectedOrbitPrediction,
        selectedTleGroup,
        satelliteSearchText,
        filteredSatelliteCount: filteredRecordCount,
        totalSatelliteCount: totalRecordCount,
        visibleSatelliteLimit: visibleRecordLimit,
        setSatelliteSearchText,
        selectSatellite,
        clearSelectedSatellite,
        changeTleGroup,
        isLoading,
        errorMessage,
    };

    return (
        <SatelliteTrackerContext value={value}>
            {children}
        </SatelliteTrackerContext>
    );
}

export function useSatelliteTracker() {
    const context = useContext(SatelliteTrackerContext);

    if (!context) {
        throw new Error('Satellite tracker provider is missing');
    }

    return context;
}