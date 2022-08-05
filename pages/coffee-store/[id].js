import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import useSWR from "swr";

import coffeeStoresData from "../../data/coffee-stores.json";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { isEmpty } from "../../utils";
import { StoreContext } from "../../store/store-context";
import { fetcher } from "../../lib/fetcher";

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
  const [votingCount, setVotingCount] = useState(1);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const id = router.query.id;

  const handleCreateCoffeeStore = async (coffeeStore) => {
    const { id, name, voting, address, neighborhood } = coffeeStore;
    try {
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${id}`,
          name,
          voting: 0,
          address: address || "",
          neighborhood: "",
        }),
      });
      const dbCoffeeStore = response.json();
    } catch (error) {
      console.error("Error creating coffee store");
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      //SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);

  console.log("id", id);

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("SWR data", data);
      setCoffeeStore(data[0]);
    }
  }, [data]);

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { name, address, neighborhood } = coffeeStore;

  const handleUpvoteButton = () => {
    let count = votingCount + 1;
    setVotingCount(count);
  };

  if (error) {
    return <div>Something went wrong getting the coffee store page</div>;
  }

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
          <div className="flex">
            <button className="block" onClick={handleUpvoteButton}>
              Upvote
            </button>
            <p className="ml-4">{votingCount}</p>
          </div>

          <Link href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
};

export default CoffeeStore;
