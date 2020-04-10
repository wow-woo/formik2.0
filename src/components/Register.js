import React from "react";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import FormikForm from "./Form/FormikForm";
import Bio from "./Form/Bio";
import Contact from "./Form/Contact";

const Register = () => {
  const [stateStep, setStep] = useState(1);
  const [stateForm, setForm] = useState({});

  switch (stateStep) {
    default:
      return <Redirect to="/" />;

    case 1:
      return (
        <div>
          <h1>{stateStep}</h1>
          <FormikForm
            stateForm={stateForm}
            setForm={setForm}
            stateStep={stateStep}
            setStep={setStep}
          />
          <div>{stateStep} / 3</div>
        </div>
      );

    case 2:
      return (
        <div>
          <h1>{stateStep}</h1>
          <Bio
            stateForm={stateForm}
            setForm={setForm}
            stateStep={stateStep}
            setStep={setStep}
          />

          <div>{stateStep} / 3</div>
        </div>
      );

    case 3:
      return (
        <div>
          <h1>{stateStep}</h1>
          <Contact setForm={setForm} stateStep={stateStep} setStep={setStep} />

          <div>{stateStep} / 3</div>
        </div>
      );
  }
};

export default Register;
