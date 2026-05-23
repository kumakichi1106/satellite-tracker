import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';
import type { TleGroupKey } from '../../constants/tleGroups';
import { TleGroupSelector } from '../tle-group-selector';

type SatelliteListProps = {
  selectedSatelliteName: string | null;
  selectedTleGroup: TleGroupKey;
  satellites: TleRecordWithPosition[];
  satelliteSearchText: string;
  filteredSatelliteCount: number;
  totalSatelliteCount: number;
  visibleSatelliteLimit: number;
  onSelectSatellite: (name: string) => void;
  onChangeSatelliteSearchText: (text: string) => void;
  onChangeTleGroup: (group: TleGroupKey) => void;
};

export function SatelliteList({
  satellites,
  selectedSatelliteName,
  selectedTleGroup,
  satelliteSearchText,
  filteredSatelliteCount,
  totalSatelliteCount,
  visibleSatelliteLimit,
  onChangeTleGroup,
  onSelectSatellite,
  onChangeSatelliteSearchText,
}: SatelliteListProps) {
  return (
    <aside className="absolute bottom-6 left-4 z-10 w-[360px] h-[550px] rounded-lg border border-slate-700 bg-slate-950/90 p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-200">衛星リスト</h2>
        <span className="text-sm text-slate-400">{totalSatelliteCount}機</span>
      </div>

      <div className="mt-3">
        <TleGroupSelector
          selectedTleGroup={selectedTleGroup}
          onChange={onChangeTleGroup}
        />
      </div>
      <div className="mt-3">
        <label className="block text-xs text-slate-400">
          衛星名検索
          <input
            type="search"
            value={satelliteSearchText}
            onChange={(event) => onChangeSatelliteSearchText(event.target.value)}
            placeholder="ISS, GPS, NOAA..."
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        検索結果 {filteredSatelliteCount}件
      </p>
      {filteredSatelliteCount > visibleSatelliteLimit && (
        <p className="mt-3 text-xs text-amber-400">
          描画負荷を抑えるため、{filteredSatelliteCount}件中{satellites.length}件のみ表示しています。
        </p>
      )}
      <div className="mt-3 max-h-[280px] space-y-1 overflow-y-auto px-1 pr-4">
        {satellites.map(({ tleRecord }) => {
          const isSelected = tleRecord.name === selectedSatelliteName;

          return (
            <button
              key={tleRecord.name}
              type="button"
              onClick={() => onSelectSatellite(tleRecord.name)}
              className={[
                'w-full rounded-md px-3 py-2 text-left text-sm transition',
                isSelected
                  ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-100'
                  : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white',
              ].join(' ')}
            >
              <span className="block font-medium">{tleRecord.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}