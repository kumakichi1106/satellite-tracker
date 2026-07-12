export const TLE_GROUPS = [
    'stations',
    'weather',
    'gps-ops',
    'active',
] as const;

export type TleGroupKey = (typeof TLE_GROUPS)[number];