import { useRouter } from 'next/router';
import CurrentData from '../components/CurrentData';

const CurrentPage = () => {
  const router = useRouter();
  const { lat, lng } = router.query;

  return (
    <div>
      <CurrentData lat={lat} lng={lng} />
    </div>
  );
};

export default CurrentPage;
