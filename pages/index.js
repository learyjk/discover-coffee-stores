import Head from "next/head";
import Image from "next/image";
import { Banner } from "../components/banner";
import { Card } from "../components/card";
import styles from "../styles/Home.module.css";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  // const [coffeeStores, setCoffeeStores] = useState([]);
  const { state, dispatch } = useContext(StoreContext);

  const {
    handleTrackLocation,
    // latLong,
    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();

  const { coffeeStores, latLong } = state;

  useEffect(() => {
    if (!latLong) return;
    const getCoffeeStores = async () => {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
        //set coffee stores
        // setCoffeeStores(fetchedCoffeeStores);
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: { coffeeStores: fetchedCoffeeStores },
        });
      } catch (error) {
        //set error
        console.log(error);
      }
    };
    getCoffeeStores();
  }, [latLong, dispatch]);

  const handleBannerButtonClick = () => {
    handleTrackLocation();
  };

  return (
    <div>
      <Head>
        <title>Coffee Drinker</title>
        <meta name="description" content="The best coffee spots near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Banner
          onBannerButtonClick={handleBannerButtonClick}
          buttonText={isFindingLocation ? "Locating..." : "VIew nearby stores"}
        />
        {locationErrorMessage && (
          <p>Something went wrong {locationErrorMessage}</p>
        )}
        <section>
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className={styles.grid}>
              {coffeeStores.length > 0 &&
                coffeeStores.map((store) => {
                  return (
                    <Card
                      key={store.id}
                      name={store.name}
                      href={`/coffee-store/${store.id}`}
                      imgUrl={store.imgUrl || "/static/placeholder.jpg"}
                    />
                  );
                })}

              {props.coffeeStores.length > 0 &&
                props.coffeeStores.map((store) => {
                  return (
                    <Card
                      key={store.id}
                      name={store.name}
                      href={`/coffee-store/${store.id}`}
                      imgUrl={store.imgUrl || "/static/placeholder.jpg"}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}
