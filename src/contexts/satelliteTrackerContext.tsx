import {
    createContext,
    useContext,
    type ReactNode,
} from 'react';
import { useTleRecords } from '../hooks/useTleRecords';
import { useSatellitePositions } from '../hooks/useSatellitePositions';
import type { TleRecordWithPosition } from '../dataModel/satellitePosition';

type SatelliteTrackerContextValue = {
    satellites: TleRecordWithPosition[];
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
    const value: SatelliteTrackerContextValue = {
        satellites,
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
        throw new Error('');
    }

    return context;
}