import { EarthViewer } from './EarthViewer';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function EarthViewerContainer() {
  const {
    satellites,
    selectedSatelliteName,
    selectedOrbitPrediction,
    selectSatellite,
    clearSelectedSatellite
  } = useSatelliteTracker();

  return <EarthViewer
      satellites={satellites}
      selectedSatelliteName={selectedSatelliteName}
      onSelectSatellite={selectSatellite}
      onClearSelectedSatellite={clearSelectedSatellite}
      selectedOrbitPrediction={selectedOrbitPrediction}
  />;
}
