import CurrentData from '../components/CurrentData';

const CurrentPage = ({ lat, lng }) => {
  return (
    <CurrentData lat={lat} lng={lng} />
  );
};

export default CurrentPage;
