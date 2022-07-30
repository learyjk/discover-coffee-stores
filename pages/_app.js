import { createContext, useReducer } from "react";
import StoreProvider from "../store/store-context";
import "../styles/globals.css";
import { Footer } from "./footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
        <Footer />
      </StoreProvider>
    </>
  );
}

export default MyApp;
