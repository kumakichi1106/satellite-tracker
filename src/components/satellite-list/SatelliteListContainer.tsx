import { useSatelliteTracker } from '../../contexts/satelliteTrackerContext';
import { SatelliteList } from './SatelliteList';

export function SatelliteListContainer() {
  const {
    selectedSatelliteName,
    selectedTleGroup,
    visibleSatellites,
    satelliteSearchText,
    filteredSatelliteCount,
    totalSatelliteCount,
    visibleSatelliteLimit,
    selectSatellite,
    setSatelliteSearchText,
    changeTleGroup,
  } = useSatelliteTracker();

  return (
    <SatelliteList
      selectedSatelliteName={selectedSatelliteName}
      selectedTleGroup={selectedTleGroup}
      satellites={visibleSatellites}
      satelliteSearchText={satelliteSearchText}
      filteredSatelliteCount={filteredSatelliteCount}
      totalSatelliteCount={totalSatelliteCount}
      visibleSatelliteLimit={visibleSatelliteLimit}
      onSelectSatellite={selectSatellite}
      onChangeSatelliteSearchText={setSatelliteSearchText}
      onChangeTleGroup={changeTleGroup}
    />
  );
}