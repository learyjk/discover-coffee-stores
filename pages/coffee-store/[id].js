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
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  console.log("props", props);
  const router = useRouter();

  return (
    <div>
      Coffee Store Page {router.query.id} <Link href="/">Back to Home</Link>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
