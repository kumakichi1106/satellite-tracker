import { TLE_GROUPS, type TleGroupKey } from '../../constants/tleGroups';

type TleGroupSelectorProps = {
  selectedTleGroup: TleGroupKey;
  onChange: (group: TleGroupKey) => void;
};

export function TleGroupSelector({
  selectedTleGroup,
  onChange,
}: TleGroupSelectorProps) {
  return (
    <label className="block text-xs text-slate-400">
      TLE Group
      <select
        value={selectedTleGroup}
        onChange={(event) => onChange(event.target.value as TleGroupKey)}
        className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400"
      >
        {TLE_GROUPS.map((group) => (
          <option key={group.key} value={group.key}>
            {group.label}
          </option>
        ))}
      </select>
    </label>
  );
}