import '@/styles/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import Noise from '../components/Noise';

export default function App({ Component, pageProps }) {
  return  (
    <NextUIProvider>
      <Noise />
     <Component {...pageProps} />
    </NextUIProvider>
  );
}
