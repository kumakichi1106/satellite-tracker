import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';
import { GroundStationInfo } from './GroundStationInfo';
import { GROUND_STATIONS } from '../../constants/groundStations';

export function GroundStationInfoContainer() {

    const {
        groundStation,
        changeGroundStation,
    } = useSatelliteTracker();

    return <GroundStationInfo
        groundStations={GROUND_STATIONS}
        selectedGroundStation={groundStation}
        onChangeGroundStation={changeGroundStation}
    />;
}