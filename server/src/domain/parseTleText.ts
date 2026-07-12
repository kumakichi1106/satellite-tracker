import type { TleRecordResponse } from '../dataModel/tle.js';
import { TleParseError } from './tleParseError.js';

const TLE_RECORD_LINE_COUNT = 3;

export function parseTleText(tleText: string): TleRecordResponse[] {
  const lines = tleText
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return [];
  }

  if (lines.length % TLE_RECORD_LINE_COUNT !== 0) {
    throw new TleParseError(
      `TLE data must contain groups of ${TLE_RECORD_LINE_COUNT} lines`,
    );
  }

  const records: TleRecordResponse[] = [];

  for (let index = 0; index < lines.length; index += TLE_RECORD_LINE_COUNT) {
    const name = lines[index]?.trim();
    const line1 = lines[index + 1]?.trimEnd();
    const line2 = lines[index + 2]?.trimEnd();

    if (!name || !line1 || !line2) {
      throw new TleParseError(`TLE record is incomplete at line ${index + 1}`);
    }

    if (!line1.startsWith('1 ')) {
      throw new TleParseError(
        `TLE line 1 has an invalid format for ${name}`,
      );
    }

    if (!line2.startsWith('2 ')) {
      throw new TleParseError(
        `TLE line 2 has an invalid format for ${name}`,
      );
    }

    records.push({
      name,
      line1,
      line2,
    });
  }

  return records;
}