import type { GroundStation } from '../../dataModel/groundStation';

type GroundStationInfoProps = {
  groundStations: GroundStation[];
  selectedGroundStation: GroundStation;
  onChangeGroundStation: (id: string) => void;
};

export function GroundStationInfo({ groundStations, selectedGroundStation, onChangeGroundStation }: GroundStationInfoProps) {
  return (
    <section className="shrink-0 rounded-lg border border-slate-700 bg-slate-950/90 p-4">
      <h2 className="text-sm font-semibold text-slate-200">
        地上局
      </h2>

      <label className="mt-3 block text-sm text-slate-400">
        観測地点
        <select
          value={selectedGroundStation.id}
          onChange={(event) => onChangeGroundStation(event.target.value)}
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400"
        >
          {groundStations.map((groundStation) => (
            <option
              key={groundStation.id}
              value={groundStation.id}
            >
              {groundStation.name}
            </option>
          ))}
        </select>
      </label>

      <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-slate-400">緯度</dt>
          <dd className="mt-1 font-semibold text-white">
            {selectedGroundStation.latitude.toFixed(4)}
          </dd>
        </div>

        <div>
          <dt className="text-slate-400">経度</dt>
          <dd className="mt-1 font-semibold text-white">
            {selectedGroundStation.longitude.toFixed(4)}
          </dd>
        </div>

        <div>
          <dt className="text-slate-400">高度</dt>
          <dd className="mt-1 font-semibold text-white">
            {selectedGroundStation.altitudeKm.toFixed(1)} km
          </dd>
        </div>
      </dl>
    </section>
  );
}