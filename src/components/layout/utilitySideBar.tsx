import OsrsItemContainer from "./osrs/osrsItemContainer";
import WeatherContainer from "./weather/weatherContainer";

export default function UtilitySideBar() {
  return (
    <section>
      <div className="parchment-card shadow border-t-0 border-r-0">
        <h2 className="metal-plate rounded-t-none font-bold gap-0 text-center text-2xl uppercase">
          <span className="text-magic-glint">Osrs Item Prices</span>
        </h2>
        <OsrsItemContainer />
        <h2 className="metal-plate rounded-t-none font-bold gap-0 text-center text-2xl uppercase">
          <span className="text-magic-glint">Weather</span>
        </h2>
        <WeatherContainer />
      </div>
    </section>
  );
}
