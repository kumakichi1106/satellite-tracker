import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';
import { GroundStationInfo } from './GroundStationInfo';

export function GroundStationInfoContainer() {
    
    const {
        groundStation,
    } = useSatelliteTracker();

    return <GroundStationInfo groundStation={groundStation} />;
}