export type TleGroupKey = 'stations' | 'active' | 'weather' | 'gps-ops';

export type TleGroup = {
  key: TleGroupKey;
  label: string;
};

export const TLE_GROUPS: TleGroup[] = [
  { key: 'stations', label: 'Space Stations' },
  { key: 'active', label: 'Active Satellites' },
  { key: 'weather', label: 'Weather' },
  { key: 'gps-ops', label: 'GPS Operational' },
];