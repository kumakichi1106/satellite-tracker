import { SatelliteInfo } from './SatelliteInfo';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function SatelliteInfoContainer() {
  const { selectedSatellite, isLoading, errorMessage, clearSelectedSatellite } = useSatelliteTracker();

  return (
    <SatelliteInfo
      satellites={selectedSatellite}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onClose={clearSelectedSatellite}
    />
  );
}
