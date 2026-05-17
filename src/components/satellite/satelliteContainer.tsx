import { useTleRecords } from '../../hooks/useTleRecords';
import { useSatellitePositions } from '../../hooks/useSatellitePositions';
import { Satellite } from './satellite';

export function SatelliteContainer() {
  const { records, isLoading, errorMessage } = useTleRecords();
  const satellites = useSatellitePositions(records);

  return (
    <Satellite
      satellites={satellites}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
