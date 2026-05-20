import { useSatellitePositions } from '../../hooks/useSatellitePositions';
import { useTleRecords } from '../../hooks/useTleRecords';
import { SatelliteInfo } from './SatelliteInfo';

export function SatelliteInfoContainer() {
  const { records, isLoading, errorMessage } = useTleRecords();
  const satellites = useSatellitePositions(records);

  return (
    <SatelliteInfo
      satellites={satellites}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
