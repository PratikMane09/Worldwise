import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="Back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1); //you want to move back put -1 and forward +1
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
