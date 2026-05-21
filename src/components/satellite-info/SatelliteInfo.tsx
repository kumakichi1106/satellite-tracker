import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';
import { CloseIcon } from '../icons';
import { IconButton } from '../ui';

type SatelliteInfoProps = {
  satellites: TleRecordWithPosition | null;
  isLoading: boolean;
  errorMessage: string | null;
  onClose: () => void;
};

export function SatelliteInfo({
  satellites,
  isLoading,
  errorMessage,
  onClose
}: SatelliteInfoProps) {
  if (isLoading) return <p className="statusText">Loading...</p>;
  if (errorMessage) return <p className="errorText">{errorMessage}</p>;
  if (!satellites) return <aside className="absolute left-6 top-6 z-10 rounded-lg border border-slate-700 bg-slate-950/90 p-4 text-sm text-slate-300">
    衛星マーカーを選択すると詳細が表示されます。
  </aside>;

  const { tleRecord, position } = satellites;

  return (
    // 衛星の詳細情報を表示
    <aside className="absolute left-6 top-6 z-10 w-[360px] rounded-lg border border-slate-700 bg-slate-950/90 p-4 text-white">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold">{tleRecord.name}</h2>
        <IconButton label="閉じる" onClick={onClose}>
          <CloseIcon />
        </IconButton>

      </div>

      {position ? (
        <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-slate-400">緯度</dt>
            <dd className="mt-1 font-semibold">{position.latitude.toFixed(4)}</dd>
          </div>
          <div>
            <dt className="text-slate-400">経度</dt>
            <dd className="mt-1 font-semibold">{position.longitude.toFixed(4)}</dd>
          </div>
          <div>
            <dt className="text-slate-400">高度</dt>
            <dd className="mt-1 font-semibold">{position.altitudeKm.toFixed(1)} km</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 text-sm text-slate-300">位置情報を取得できません。</p>
      )}
    </aside>
  );
}
