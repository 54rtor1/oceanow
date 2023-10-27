import '@/styles/globals.css';
import { NextUIProvider } from "@nextui-org/react";
import { motion, AnimatePresence } from 'framer-motion';
import Noise from '../components/ui/Noise';

const pageVariants = {
  pageInitial: {
    opacity: 0,
    y: 20,
  },
  pageAnimate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  pageExit: {
    opacity: 0,
    y: -20, // Adjust this value
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export default function App({ Component, pageProps, router }) {
  return (
    <NextUIProvider>
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence exitBeforeEnter={false}>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={pageVariants}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Noise style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      </div>
    </NextUIProvider>
  );
}
