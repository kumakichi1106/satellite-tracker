import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';
import { SatelliteVisibility } from '../../dataModel/visibility';
import { CloseIcon } from '../icons';
import { IconButton } from '../ui';

type SatelliteInfoProps = {
  satellite: TleRecordWithPosition | null;
  visibility: SatelliteVisibility | null;
  isLoading: boolean;
  errorMessage: string | null;
  onClose: () => void;
};

export function SatelliteInfo({
  satellite,
  visibility,
  isLoading,
  errorMessage,
  onClose
}: SatelliteInfoProps) {
  if (isLoading) return <p className="statusText">Loading...</p>;
  if (errorMessage) return <p className="errorText">{errorMessage}</p>;
  if (!satellite) return
  <section className="rounded-lg border border-slate-700 bg-slate-950/90 p-4 text-sm text-slate-300">
    衛星マーカーまたは衛星リストを選択すると詳細が表示されます。
  </section>

  const { tleRecord, position } = satellite;

  return (
    // 衛星の詳細情報を表示
    <section className="shrink-0 min-h-0 overflow-y-auto rounded-lg border border-slate-700 bg-slate-950/90 p-4">
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

      {visibility && (
        <section className="mt-4 border-t border-slate-800 pt-4">
          <h3 className="text-sm font-semibold text-slate-200">地上局からの可視状態</h3>

          <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-slate-400">現在</dt>
              <dd className="mt-1 font-semibold">
                {visibility.isCurrentlyVisible ? '可視' : '不可視'}
              </dd>
            </div>

            {visibility.currentLookAngle && (
              <>
                <div>
                  <dt className="text-slate-400">仰角</dt>
                  <dd className="mt-1 font-semibold">
                    {visibility.currentLookAngle.elevationDeg.toFixed(1)}°
                  </dd>
                </div>

                <div>
                  <dt className="text-slate-400">方位角</dt>
                  <dd className="mt-1 font-semibold">
                    {visibility.currentLookAngle.azimuthDeg.toFixed(1)}°
                  </dd>
                </div>

                <div>
                  <dt className="text-slate-400">距離</dt>
                  <dd className="mt-1 font-semibold">
                    {visibility.currentLookAngle.rangeKm.toFixed(0)} km
                  </dd>
                </div>
              </>
            )}
          </dl>

          {visibility.nextWindow ? (
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-400">AOS</dt>
                <dd className="mt-1 font-semibold">
                  {visibility.nextWindow.aos.toLocaleTimeString()}
                </dd>
              </div>

              <div>
                <dt className="text-slate-400">LOS</dt>
                <dd className="mt-1 font-semibold">
                  {visibility.nextWindow.los.toLocaleTimeString()}
                </dd>
              </div>

              <div>
                <dt className="text-slate-400">最大仰角</dt>
                <dd className="mt-1 font-semibold">
                  {visibility.nextWindow.maxElevationDeg.toFixed(1)}°
                </dd>
              </div>

              <div>
                <dt className="text-slate-400">可視時間帯</dt>
                <dd className="mt-1 font-semibold">
                  {visibility.nextWindow.durationMinutes}分
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-slate-400">
              指定範囲内に可視時間帯はありません。
            </p>
          )}
        </section>
      )}
    </section>
  );
}
