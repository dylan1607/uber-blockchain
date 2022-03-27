import Confirm from '../components/Confirm';
import LocationSelector from '../components/LocationSelector';
import Map from '../components/Map';
import Navbar from '../components/Navbar';

const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main: `h-full w-screen flex-1 z-10 relative`,
  mapContainer: `flex-1 h-full w-full`,
  rideRequestContainer: `w-[290px] md:w-[350px] absolute top-20 left-0 ml-[2rem]`,
  rideRequest: `h-full max-h-[600px] bg-white rounded-lg flex flex-col flex-1 overflow-y-scroll scrollbar-hide`,
};
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.main}>
        <div className={style.mapContainer}>
          <Map />
        </div>
        <div className={style.rideRequestContainer}>
          <div className={style.rideRequest}>
            <LocationSelector />
            <Confirm />
          </div>
        </div>
      </div>
    </div>
  );
}
