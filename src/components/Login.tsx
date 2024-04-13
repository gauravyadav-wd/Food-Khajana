import pizzaImg from "/pizza2.jpg";
import "./login.css";
import { useState } from "react";

import Modal from "../small components/Modal";

type functionVal = {
  handleApiKey: (val: string) => void;
};

const Login = ({ handleApiKey }: functionVal) => {
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);

  return (
    <div className="header">
      <img className="pizza-img" src={pizzaImg} alt="pizza image" />
      <h1 className="hero-heading">All Your Food. One Place.</h1>
      <div
        className="start-now-btn"
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <h1>Start Now!</h1>
        <p>(yup, it's free)</p>
      </div>
      <Modal handleApiKey={handleApiKey} showModal={showModal} />
      <div
        onClick={() => {
          setShowModal(false);
        }}
        className={`modal-overlay ${showModal ? "overlay-animate" : false}`}
      ></div>
    </div>
  );
};

export default Login;
