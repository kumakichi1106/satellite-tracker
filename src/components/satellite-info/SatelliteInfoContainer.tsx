import { SatelliteInfo } from './SatelliteInfo';
import { getTleEpochInfo } from '../../domain/tleEpoch';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function SatelliteInfoContainer() {
  const {
    selectedSatellite,
    selectedSatelliteVisibility,
    isLoading,
    errorMessage,
    clearSelectedSatellite
  } = useSatelliteTracker();

  const tleEpochInfo = selectedSatellite
    ? getTleEpochInfo(selectedSatellite.tleRecord.line1)
    : null;

  return (
    <SatelliteInfo
      satellite={selectedSatellite}
      visibility={selectedSatelliteVisibility}
      isLoading={isLoading}
      errorMessage={errorMessage}
      tleEpochInfo={tleEpochInfo}
      onClose={clearSelectedSatellite}
    />
  );
}
