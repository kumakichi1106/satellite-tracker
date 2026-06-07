import { EarthViewerContainer } from './components/earth-viewer';
import { GroundStationInfoContainer } from './components/ground-station-info';
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
            <GroundStationInfoContainer />
            <SatelliteListContainer />
            <SatelliteInfoContainer />
          </>
        }
        main={<EarthViewerContainer />}
      />
    </SatelliteTrackerProvider>
  );
}