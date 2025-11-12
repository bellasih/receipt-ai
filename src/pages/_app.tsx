import { AppProps } from "next/app";
import TransitionLayout from "@/components/layouts/TransitionLayout";
import axios from "axios";

import "@/styles/globals.css";

axios.defaults.baseURL = process.env.API_ENDPOINT;

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
      <TransitionLayout route={router.route}>
        <Component {...pageProps} />
      </TransitionLayout>
  );
};

export default MyApp;
