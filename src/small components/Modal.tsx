import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

type ModalProps = {
  showModal: boolean;
  handleApiKey: (apiKey: string) => void;
};

const Modal = ({ showModal, handleApiKey }: ModalProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleSubmit = function () {
    async function fetchApiTest() {
      setIsPending(true);
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
      );

      const data = await res.json();
      setIsPending(false);
      setApiResponse(data);

      if (data.code != 401) {
        handleApiKey(apiKey);
        localStorage.setItem("apiKey", apiKey);
      }
    }

    fetchApiTest();
  };

  useEffect(() => {
    if (!showModal) {
      setApiResponse("");
      setApiKey("");
    }
  }, [showModal]);

  return (
    <div className={`modal ${showModal ? "modal-animate" : false}`}>
      <h3>Api Key</h3>
      <div>
        <input
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          type="text"
        />
        {isPending ? (
          <CircularProgress />
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
      {apiResponse?.code === 401 && apiKey != undefined && (
        <p>Invalid api key</p>
      )}
    </div>
  );
};

export default Modal;
