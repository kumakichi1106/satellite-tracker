import type { TleRecord } from '../../dataModel/tle';

type SatelliteProps = {
  tleRecord: TleRecord[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function Satellite({
  tleRecord,
  isLoading,
  errorMessage,
}: SatelliteProps) {
  if (isLoading) {
    return <p className="statusText">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="errorText">{errorMessage}</p>;
  }

  if (tleRecord.length === 0) {
    return <p className="statusText">TLE data is empty.</p>;
  }

  return (
    <div>
      {tleRecord.map((record) => (
        <div className="mb-4 p-4 border rounded" key={record.name}>
          <div className="text-xl font-semibold">
            {record.name}
          </div>
          <div className="bg-gray-100 p-2 rounded mt-2">
            {record.line1}
          </div>
          <div className="bg-gray-100 p-2 rounded mt-2">
            {record.line2}
          </div>
        </div>
      ))}
    </div>
  );
}
