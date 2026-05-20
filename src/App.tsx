import { EarthViewerContainer } from './components/earth-viewer';
import { SatelliteInfoContainer } from './components/satellite-info';
import { SatelliteTrackerProvider } from './contexts/satelliteTrackerContext';

export function App() {
  return (
    <SatelliteTrackerProvider>
      <main className="app">
        <h1>Satellite Tracker</h1>
        <SatelliteInfoContainer />
        <EarthViewerContainer />
      </main>
    </SatelliteTrackerProvider>
  );
}
