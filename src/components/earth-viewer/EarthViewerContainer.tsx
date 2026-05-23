import { EarthViewer } from './EarthViewer';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function EarthViewerContainer() {
  const {
    selectedSatelliteName,
    selectedOrbitPrediction,
    visibleSatellites,
    selectSatellite,
    clearSelectedSatellite
  } = useSatelliteTracker();

  return <EarthViewer
    satellites={visibleSatellites}
    selectedSatelliteName={selectedSatelliteName}
    selectedOrbitPrediction={selectedOrbitPrediction}
    onSelectSatellite={selectSatellite}
    onClearSelectedSatellite={clearSelectedSatellite}
  />
}
