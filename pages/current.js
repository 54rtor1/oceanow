import { useRouter } from 'next/router';
import CurrentData from '../components/CurrentData';
import dynamic from 'next/dynamic';

const AnimationComponent = dynamic(() => import('../components/ui/AnimationComponent'), { ssr: false });

const CurrentPage = () => {
  const router = useRouter();
  const { lat, lng } = router.query;

  return (
    <div>
      <CurrentData lat={lat} lng={lng} />
      <AnimationComponent />
    </div>
  );
};

export default CurrentPage;
