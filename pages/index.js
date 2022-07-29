import Head from "next/head";
import Image from "next/image";
import { Banner } from "../components/banner";
import { Card } from "../components/card";
import styles from "../styles/Home.module.css";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
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
