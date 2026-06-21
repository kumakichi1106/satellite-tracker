import type { GroundStation } from '../../dataModel/groundStation';

type GroundStationInfoProps = {
  groundStation: GroundStation;
};

export function GroundStationInfo({ groundStation }: GroundStationInfoProps) {
  return (
    <section className="shrink-0 rounded-lg border border-slate-700 bg-slate-950/90 p-4">
      <h2 className="text-sm font-semibold text-slate-200">地上局 : {groundStation.name}</h2>
      <dl className="mt-1 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-slate-400">緯度</dt>
          <dd className="mt-1 font-semibold text-white">
            {groundStation.latitude.toFixed(4)}
          </dd>
        </div>

        <div>
          <dt className="text-slate-400">経度</dt>
          <dd className="mt-1 font-semibold text-white">
            {groundStation.longitude.toFixed(4)}
          </dd>
        </div>

        <div>
          <dt className="text-slate-400">高度</dt>
          <dd className="mt-1 font-semibold text-white">
            {groundStation.altitudeKm.toFixed(1)} km
          </dd>
        </div>
      </dl>
    </section>
  );
}