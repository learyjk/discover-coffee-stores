import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import coffeeStoresData from "../../data/coffee-stores.json";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { isEmpty } from "../../utils";
import { StoreContext } from "../_app";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const id = router.query.id;

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { name, address, neighborhood } = coffeeStore;

  return (
    <>
      <section className="text-amber-100 bg-amber-900">
        <div className="w-full max-w-4xl mx-auto px-4">
          <h1 className="text-6xl py-12">{name}</h1>
        </div>
      </section>
      <section>
        <div className="w-full max-w-4xl mx-auto px-4 py-4">
          <p>{address}</p>
          <p>{neighborhood && neighborhood[0]}</p>

          <Link href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
};

export default CoffeeStore;
