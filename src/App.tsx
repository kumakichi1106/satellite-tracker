import { EarthViewerContainer } from './components/earth-viewer';
import { SatelliteInfoContainer } from './components/satellite-info';
import { SatelliteListContainer } from './components/satellite-list';
import { SatelliteTrackerProvider } from './contexts/satelliteTrackerContext';

export function App() {
  return (
    <SatelliteTrackerProvider>
      <main className="app">
        <SatelliteInfoContainer />
        <SatelliteListContainer />
        <EarthViewerContainer />
      </main>
    </SatelliteTrackerProvider>
  );
}
