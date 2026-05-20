import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';

type SatelliteInfoProps = {
  satellites: TleRecordWithPosition[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function SatelliteInfo({
  satellites,
  isLoading,
  errorMessage,
}: SatelliteInfoProps) {
  if (isLoading) {
    return <p className="statusText">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="errorText">{errorMessage}</p>;
  }

  if (satellites.length === 0) {
    return <p className="statusText">Data is empty.</p>;
  }

  return (
    <div>
      {satellites.map(({ tleRecord, position }) => (
        <div className="mb-4 p-4 border rounded" key={tleRecord.name}>
          <div className="text-xl font-semibold">
            {tleRecord.name}
          </div>
          <div className="p-2 rounded mt-2">
            {tleRecord.line1}
          </div>
          <div className="p-2 rounded mt-2">
            {tleRecord.line2}
          </div>
          {position ? (
            <div className="positionList">
              <div>
                <div>緯度</div>
                <div>{position.latitude}</div>
              </div>
              <div>
                <div>経度</div>
                <div>{position.longitude}</div>
              </div>
              <div>
                <div>高度</div>
                <div>{position.altitudeKm} km</div>
              </div>
            </div>
          ) : (
            <p className="statusText">位置情報を取得できません。</p>
          )}
        </div>
      ))}
    </div>
  );
}
