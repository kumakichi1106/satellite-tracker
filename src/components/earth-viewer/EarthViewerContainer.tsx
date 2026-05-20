import { EarthViewer } from './EarthViewer';
import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';

export function EarthViewerContainer() {
  const { satellites } = useSatelliteTracker();

  return <EarthViewer satellites={satellites} />;
}
