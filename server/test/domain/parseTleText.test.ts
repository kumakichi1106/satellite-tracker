import { describe, expect, it } from 'vitest';
import { parseTleText } from '../../src/domain/parseTleText.js';
import { TleParseError } from '../../src/domain/tleParseError.js';

const validTleText = `ISS (ZARYA)
1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993
2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468`;

describe('parseTleText', () => {
    it('TLEテキストをTleRecordへ変換する', () => {
        const records = parseTleText(validTleText);

        expect(records).toEqual([
            {
                name: 'ISS (ZARYA)',
                line1:
                    '1 25544U 98067A   26140.52007258  .00005164  00000+0  10084-3 0  9993',
                line2:
                    '2 25544  51.6328  77.0641 0007497  79.3410 280.8422 15.49283153567468',
            },
        ]);
    });

    it('空のテキストの場合は空配列を返す', () => {
        expect(parseTleText('')).toEqual([]);
    });

    it('空行を無視する', () => {
        const records = parseTleText(`

${validTleText}

`);

        expect(records).toHaveLength(1);
    });

    it('3行単位でない場合はエラーを返す', () => {
        expect(() =>
            parseTleText(`ISS (ZARYA)
1 25544U 98067A`),
        ).toThrow(TleParseError);
    });

    it('line1の形式が不正な場合はエラーを返す', () => {
        const invalidText = `ISS (ZARYA)
X 25544U 98067A
2 25544  51.6328`;

        expect(() => parseTleText(invalidText)).toThrow(
            'TLE line 1 has an invalid format',
        );
    });
});