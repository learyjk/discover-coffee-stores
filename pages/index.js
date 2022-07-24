import Head from "next/head";
import Image from "next/image";
import { Banner } from "../components/banner";
import { Card } from "../components/card";
import styles from "../styles/Home.module.css";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&near=94115&limit=6",
    options
  );
  const data = await response.json();

  return {
    props: {
      coffeeStores: data.results,
    },
  };
}

export default function Home({ coffeeStores }) {
  //onsole.log("props", props);
  return (
    <div>
      <Head>
        <title>Coffee Drinker</title>
        <meta name="description" content="The best coffee spots near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Banner />
        <section>
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className={styles.grid}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.fsq_id}
                    name={store.name}
                    href={`/coffee-store/${store.fsq_id}`}
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
