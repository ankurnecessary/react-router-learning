import { useLocation } from "react-router";

const LocationDetails = () => {
  const location = useLocation();
  return (
    <div>
      <p>location.pathname: {location.pathname}</p>
      <p>location.search: {location.search}</p>
      <p>location.hash: {location.hash}</p>
    </div>
  );
};

export default LocationDetails;
