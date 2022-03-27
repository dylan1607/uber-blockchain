import { useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { UberContext } from '../context';

const style = {
  wrapper: `flex-1 h-full w-full`,
};
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const { pickupCordinates, dropoffCordinates } = useContext(UberContext);
  const addToMap = (map, cordinates) => {
    new mapboxgl.Marker().setLngLat(cordinates).addTo(map);
  };
  // console.log(pickupCordinates, dropoffCordinates);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sudienkhung1/cl0ffjfuc010a15r4thcl9lsa',
      center: [108.339537475899, 14.3154241771087],
      zoom: 2,
      // hide logo left bottom
      attributionControl: false,
    });

    if (pickupCordinates) {
      addToMap(map, pickupCordinates);
    }
    if (dropoffCordinates) {
      addToMap(map, dropoffCordinates);
    }
    if (pickupCordinates && dropoffCordinates) {
      map.fitBounds([dropoffCordinates, pickupCordinates], { padding: 60 });
    }
  }, [pickupCordinates, dropoffCordinates]);

  return <div className={style.wrapper} id='map' />;
};

export default Map;
