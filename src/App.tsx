import { EarthViewerContainer } from './components/earth-viewer';
import { SatelliteInfoContainer } from './components/satellite-info';

export function App() {
  return (
    <main className="app">
      <h1>Satellite Tracker</h1>
      <SatelliteInfoContainer />
      <EarthViewerContainer />
    </main>
  );
}
