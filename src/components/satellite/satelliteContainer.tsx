import { useTleRecords } from '../../hooks/useTleRecords';
import { Satellite } from './satellite';

export function SatelliteContainer() {
  const { records, isLoading, errorMessage } = useTleRecords();

  return (
    <Satellite
      tleRecord={records}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
