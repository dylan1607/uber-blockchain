import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const style = {
  wrapper: `flex-1 h-full w-full`,

};
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sudienkhung1/cl0ffjfuc010a15r4thcl9lsa',
      //   center: [16, 10.793796],
      zoom: 3,
    });
  }, []);
  return <div className={style.wrapper} id='map'></div>;
};

export default Map;
