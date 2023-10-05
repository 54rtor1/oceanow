import '@/styles/globals.css';
import { NextUIProvider } from "@nextui-org/react";
import Noise from '../components/Noise';

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <div className="relative h-screen overflow-hidden">
        <Component {...pageProps} />
        <Noise style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      </div>
    </NextUIProvider>
  );
}
