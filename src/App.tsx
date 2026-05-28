import { EarthViewerContainer } from './components/earth-viewer';
import { SatelliteInfoContainer } from './components/satellite-info';
import { SatelliteListContainer } from './components/satellite-list';
import { SatelliteTrackerProvider } from './contexts/satelliteTrackerContext';
import { AppLayout } from './layout';

export function App() {
  return (
    <SatelliteTrackerProvider>
      <AppLayout
        sidebar={
          <>
            <SatelliteListContainer />
            <SatelliteInfoContainer />
          </>
        }
        main={<EarthViewerContainer />}
      />
    </SatelliteTrackerProvider>
  );
}