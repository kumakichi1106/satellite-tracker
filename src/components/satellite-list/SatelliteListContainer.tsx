import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';
import { SatelliteList } from './SatelliteList';

export function SatelliteListContainer() {
  const {
    satellites,
    selectedSatelliteName,
    selectedTleGroup,
    selectSatellite,
    setSelectedTleGroup,
  } = useSatelliteTracker();

  return (
    <SatelliteList
      satellites={satellites}
      selectedSatelliteName={selectedSatelliteName}
      selectedTleGroup={selectedTleGroup}
      onSelectSatellite={selectSatellite}
      onChangeTleGroup={setSelectedTleGroup}
    />
  );
}