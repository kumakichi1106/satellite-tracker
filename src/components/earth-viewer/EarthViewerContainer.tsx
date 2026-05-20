import { useSatellitePositions } from '../../hooks/useSatellitePositions';
import { useTleRecords } from '../../hooks/useTleRecords';
import { EarthViewer } from './EarthViewer';

export function EarthViewerContainer() {
  const { records } = useTleRecords();
  const satellites = useSatellitePositions(records);

  return <EarthViewer satellites={satellites} />;
}
