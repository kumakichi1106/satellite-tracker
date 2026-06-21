import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';
import { TleEpochInfo } from '../../dataModel/tleEpoch';
import { SatelliteVisibility } from '../../dataModel/visibility';
import { formatTleAge } from '../../utils/formatTleAge';
import { CloseIcon } from '../icons';
import { IconButton } from '../ui';
import type { ReactNode } from 'react';

type SatelliteInfoProps = {
  satellite: TleRecordWithPosition | null;
  visibility: SatelliteVisibility | null;
  isLoading: boolean;
  errorMessage: string | null;
  tleEpochInfo: TleEpochInfo | null;
  onClose: () => void;
};

export function SatelliteInfo({
  satellite,
  visibility,
  isLoading,
  errorMessage,
  tleEpochInfo,
  onClose
}: SatelliteInfoProps) {
  if (isLoading) return <p className="statusText">Loading...</p>;
  if (errorMessage) return <p className="errorText">{errorMessage}</p>;
  if (!satellite) {
    return (
      <section className="bg-slate-950/90 p-4 text-sm text-slate-300">
        衛星マーカーまたは衛星リストを選択すると詳細が表示されます。
      </section>
    );
  }

  const { tleRecord, position } = satellite;

  return (
    // 衛星の詳細情報を表示
    <section className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-800 px-4 py-3">
        <h2 className="text-base font-semibold">{tleRecord.name}</h2>

        <IconButton label="閉じる" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-6 overflow-y-auto px-4 py-3">
        <section className="col-span-3">
          <h3 className="text-sm font-semibold text-slate-200">現在位置</h3>

          {position ? (
            <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-slate-400">緯度</dt>
                <dd className="mt-1 font-semibold">
                  {position.latitude.toFixed(4)}
                </dd>
              </div>

              <div>
                <dt className="text-slate-400">経度</dt>
                <dd className="mt-1 font-semibold">
                  {position.longitude.toFixed(4)}
                </dd>
              </div>

              <div>
                <dt className="text-slate-400">高度</dt>
                <dd className="mt-1 font-semibold">
                  {position.altitudeKm.toFixed(1)} km
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-slate-300">
              位置情報を取得できません。
            </p>
          )}
        </section>

        <section className="col-span-3 border-l border-slate-800 pl-6">
          <h3 className="text-sm font-semibold text-slate-200">TLE情報</h3>

          {tleEpochInfo ? (
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-400">基準日時</dt>
                <dd className="mt-1 font-semibold">
                  {tleEpochInfo.epoch.toLocaleString()}
                </dd>
              </div>

              <div>
                <dt className="text-slate-400">経過時間</dt>
                <dd className="mt-1 font-semibold">
                  {formatTleAge(tleEpochInfo.ageMinutes)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-slate-400">
              TLE epochを解析できません。
            </p>
          )}
        </section>

        {visibility && (
          <section className="col-span-6 border-l border-slate-800 pl-6">
            <h3 className="text-sm font-semibold text-slate-200">
              地上局からの可視状態
            </h3>

            <dl className="mt-3 grid grid-cols-4 gap-x-4 gap-y-3 text-sm">
              <InfoItem label="現在">
                {visibility.isCurrentlyVisible ? '可視' : '不可視'}
              </InfoItem>

              <InfoItem label="仰角">
                {visibility.currentLookAngle
                  ? `${visibility.currentLookAngle.elevationDeg.toFixed(1)}°`
                  : '-'}
              </InfoItem>

              <InfoItem label="方位角">
                {visibility.currentLookAngle
                  ? `${visibility.currentLookAngle.azimuthDeg.toFixed(1)}°`
                  : '-'}
              </InfoItem>

              <InfoItem label="距離">
                {visibility.currentLookAngle
                  ? `${visibility.currentLookAngle.rangeKm.toFixed(0)} km`
                  : '-'}
              </InfoItem>

              <InfoItem label="AOS">
                {visibility.nextWindow?.aos.toLocaleTimeString() ?? '-'}
              </InfoItem>

              <InfoItem label="LOS">
                {visibility.nextWindow?.los.toLocaleTimeString() ?? '-'}
              </InfoItem>

              <InfoItem label="最大仰角">
                {visibility.nextWindow
                  ? `${visibility.nextWindow.maxElevationDeg.toFixed(1)}°`
                  : '-'}
              </InfoItem>

              <InfoItem label="可視時間帯">
                {visibility.nextWindow
                  ? `${visibility.nextWindow.durationMinutes}分`
                  : '-'}
              </InfoItem>
            </dl>
          </section>
        )}
      </div>
    </section>
  );
}

// todo: 共通化
type InfoItemProps = {
  label: string;
  children: ReactNode;
};

function InfoItem({ label, children }: InfoItemProps) {
  return (
    <div>
      <dt className="text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold">{children}</dd>
    </div>
  );
}