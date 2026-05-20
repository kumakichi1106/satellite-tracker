import { SatelliteInfo } from './SatelliteInfo';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function SatelliteInfoContainer() {
  const { satellites, isLoading, errorMessage } = useSatelliteTracker();

  return (
    <SatelliteInfo
      satellites={satellites}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
