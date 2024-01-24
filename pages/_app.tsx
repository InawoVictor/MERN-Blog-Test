import "@/styles/globals.css";
import "../styles/sass/main.scss";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}
