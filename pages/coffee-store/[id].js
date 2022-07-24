import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
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

const CoffeeStore = (props) => {
  console.log("props", props);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { name, neighbourhood, address } = props.coffeeStore;

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
          <p>{neighbourhood}</p>

          <Link href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
};

export default CoffeeStore;
