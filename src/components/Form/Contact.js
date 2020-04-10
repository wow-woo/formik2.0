import React from "react";
import { Formik, Field, Form, useField } from "formik";
import { Button, Radio, FormControlLabel } from "@material-ui/core";

const FormikForm = ({ stateForm, stateStep, setStep }) => {
  const MyRadio = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
      <FormControlLabel
        {...field}
        {...props}
        label={label}
        control={<Radio />}
      />
    );
  };

  return (
    <Formik
      initialValues={{
        location: "",
        bag: "",
      }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const payload = await { ...stateForm, ...data };

        console.log("state", stateForm);
        //send to server
        console.log("payload", payload);

        setStep(stateStep + 1);

        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => {
        return (
          <Form>
            <div>
              <Field name="location" type="radio" value="seoul" as={Radio} />
              <Field name="location" type="radio" value="incheon" as={Radio} />
              <Field name="location" type="radio" value="busan" as={Radio} />
              <Field name="location" type="radio" value="jeju" as={Radio} />
            </div>
            <div>
              <MyRadio
                name="bag"
                type="radio"
                value="back bag"
                label="back bag"
              />
              <MyRadio
                name="bag"
                type="radio"
                value="messenger bag"
                label="messenger bag"
              />
              <MyRadio
                name="bag"
                type="radio"
                value="cross bag"
                label="cross bag"
              />
            </div>
            <div>
              <Button onClick={() => setStep(stateStep - 1)}>back</Button>

              <Button disabled={isSubmitting} type="submit">
                next
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(stateForm, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikForm;
