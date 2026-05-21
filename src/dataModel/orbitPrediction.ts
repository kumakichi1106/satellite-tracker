import type { SatellitePosition, SatelliteVector3 } from './satellitePosition';

export type OrbitPoint = {
    calculatedAt: Date;
    position: SatellitePosition;
    vector3: SatelliteVector3;
};

export type OrbitPrediction = {
    points: OrbitPoint[];
};