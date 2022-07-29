import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from "../../data/coffee-stores.json";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  console.log("params", params);
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { name, address, neighborhood } = props.coffeeStore;

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
          <p>{neighborhood[0]}</p>

          <Link href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
};

export default CoffeeStore;
