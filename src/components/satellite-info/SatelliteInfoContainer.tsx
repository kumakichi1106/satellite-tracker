import { SatelliteInfo } from './SatelliteInfo';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function SatelliteInfoContainer() {
  const {
    selectedSatellite,
    selectedSatelliteVisibility,
    isLoading,
    errorMessage,
    clearSelectedSatellite
  } = useSatelliteTracker();

  return (
    <SatelliteInfo
      satellite={selectedSatellite}
      visibility={selectedSatelliteVisibility}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onClose={clearSelectedSatellite}
    />
  );
}
