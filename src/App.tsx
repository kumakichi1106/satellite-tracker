import { Earth } from './components/earth/earth';
import { SatelliteContainer } from './components/satellite';

export function App() {
  return (
    <main className="app">
      <h1>Satellite Tracker</h1>
      {/* <SatelliteContainer /> */}
      <Earth />
    </main>
  );
}
