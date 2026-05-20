import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { useTleRecords } from '../hooks/useTleRecords';
import { useSatellitePositions } from '../hooks/useSatellitePositions';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';

type SatelliteTrackerContextValue = {
    satellites: TleRecordWithPosition[];
    selectedSatellite: TleRecordWithPosition | null;
    selectedSatelliteName: string | null;
    selectSatellite: (name: string) => void;
    clearSelectedSatellite: () => void;
    isLoading: boolean;
    errorMessage: string | null;
};

type SatelliteTrackerProviderProps = {
    children: ReactNode;
};

const SatelliteTrackerContext = createContext<SatelliteTrackerContextValue | null>(null);

export function SatelliteTrackerProvider({ children }: SatelliteTrackerProviderProps) {
    const { records, isLoading, errorMessage } = useTleRecords();
    const satellites = useSatellitePositions(records);
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

    const value: SatelliteTrackerContextValue = {
        satellites,
        selectedSatellite,
        selectedSatelliteName,
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