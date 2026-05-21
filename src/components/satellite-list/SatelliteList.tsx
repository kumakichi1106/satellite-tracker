import type { TleRecordWithPosition } from '../../dataModel/satellitePosition';
import type { TleGroupKey } from '../../constants/tleGroups';
import  { TleGroupSelector } from '../tle-group-selector/TleGroupSelector';

type SatelliteListProps = {
satellites: TleRecordWithPosition[];
  selectedSatelliteName: string | null;
  selectedTleGroup: TleGroupKey;
  onChangeTleGroup: (group: TleGroupKey) => void;
  onSelectSatellite: (name: string) => void;
};

export function SatelliteList({
  satellites,
  selectedSatelliteName,
  selectedTleGroup,
  onChangeTleGroup,
  onSelectSatellite,
}: SatelliteListProps) {
  return (
    <aside className="absolute bottom-6 left-4 z-10 w-[360px] rounded-lg border border-slate-700 bg-slate-950/90 p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-200">衛星リスト</h2>
        <span className="text-sm text-slate-400">{satellites.length}機</span>
      </div>

      <div className="mt-3">
        <TleGroupSelector
          selectedTleGroup={selectedTleGroup}
          onChange={onChangeTleGroup}
        />
      </div>

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
                  ? 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/50'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white',
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