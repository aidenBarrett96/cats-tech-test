import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { LikedCatContextProvider } from "context/LikedCatsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LikedCatContextProvider>
        <Component {...pageProps} />
      </LikedCatContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
