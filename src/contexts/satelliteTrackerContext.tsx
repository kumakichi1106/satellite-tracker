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
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';
import type { OrbitPrediction } from '../dataModel/orbitPrediction';
import { TleGroupKey } from '../constants/tleGroups';

type SatelliteTrackerContextValue = {
    satellites: TleRecordWithPosition[];
    selectedSatellite: TleRecordWithPosition | null;
    selectedSatelliteName: string | null;
    selectedOrbitPrediction: OrbitPrediction | null;
    selectedTleGroup: TleGroupKey;
    selectSatellite: (name: string) => void;
    clearSelectedSatellite: () => void;
    setSelectedTleGroup: (group: TleGroupKey) => void;
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
    const { records, isLoading, errorMessage } = useTleRecords(selectedTleGroup );
    // CurrentTimeで都度衛星の位置を計算する
    const satellites = useSatellitePositions(records, currentTime);
    // 選択された衛星の状態管理
    const [selectedSatelliteName, setSelectedSatelliteName] = useState<string | null>(null);

    // 衛星を選択
    const selectSatellite = (name: string) => {
        setSelectedSatelliteName(name);
    };
    // 選択をクリア
    const clearSelectedSatellite = () => {
        setSelectedSatelliteName(null);
    };

    const selectedSatellite = useMemo(
        () => satellites.find(({ tleRecord }) => tleRecord.name === selectedSatelliteName) ?? null,
        [satellites, selectedSatelliteName],
    );

    const selectedOrbitPrediction = useOrbitPrediction(selectedSatellite);

    const value: SatelliteTrackerContextValue = {
        satellites,
        selectedSatellite,
        selectedSatelliteName,
        selectedOrbitPrediction,
        selectedTleGroup,
        setSelectedTleGroup,
        selectSatellite,
        clearSelectedSatellite,
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
        throw new Error;
    }

    return context;
}