export type LookAngle = {
  azimuthDeg: number;
  elevationDeg: number;
  rangeKm: number;
};

export type VisibilityWindow = {
  aos: Date;
  los: Date;
  maxElevationDeg: number;
  durationMinutes: number;
};

export type SatelliteVisibility = {
  currentLookAngle: LookAngle | null;
  isCurrentlyVisible: boolean;
  nextWindow: VisibilityWindow | null;
};