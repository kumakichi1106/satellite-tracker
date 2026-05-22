import type { OrbitPrediction, OrbitPoint } from '../dataModel/orbitPrediction';
import type { TleRecord } from '../dataModel/tle';
import {
    calculateSatellitePosition,
    convertSatellitePositionToVector3,
} from './satellitePosition';

type CalculateOrbitPredictionParams = {
    tleRecord: TleRecord;
    startDate?: Date;
    durationMinutes?: number;
    stepMinutes?: number;
};

const DEFAULT_ORBIT_DURATION_MINUTES = 90;
const DEFAULT_ORBIT_STEP_MINUTES = 1;

export function calculateOrbitPrediction({
    tleRecord,
    startDate = new Date(),
    durationMinutes = DEFAULT_ORBIT_DURATION_MINUTES,
    stepMinutes = DEFAULT_ORBIT_STEP_MINUTES,
}: CalculateOrbitPredictionParams): OrbitPrediction {
    const points: OrbitPoint[] = [];
    // 開始時刻から指定分数まで、一定間隔で衛星位置を計算して軌道線用の点列を作る。
    for (let i = 0; i <= durationMinutes; i += stepMinutes) {
        const calculatedAt = new Date(startDate.getTime() + i * 60 * 1000);
        const position = calculateSatellitePosition(tleRecord, calculatedAt);

        if (!position) {
            continue;
        }

        points.push({
            calculatedAt,
            position,
            vector3: convertSatellitePositionToVector3(position),
        });
    }

    return {
        points,
    };
}