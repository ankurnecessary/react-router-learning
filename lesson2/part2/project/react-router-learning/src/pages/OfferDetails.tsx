import { useParams } from "react-router";

const OfferDetails = () => {
  const { offerId } = useParams();
  return <div>{offerId}</div>;
};

export default OfferDetails;
