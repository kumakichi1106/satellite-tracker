export class TleParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TleParseError';
  }
}