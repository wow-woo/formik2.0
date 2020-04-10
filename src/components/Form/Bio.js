import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, Checkbox, Radio } from "@material-ui/core";

const FormikForm = ({ stateForm, setForm, stateStep, setStep }) => {
  return (
    <Formik
      initialValues={{
        history: [],
        sex: "",
      }}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setForm({ ...stateForm, ...data });
        setStep(stateStep + 1);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => {
        return (
          <Form>
            <div>
              <Field name="history" value="cough" as={Checkbox} />
              <Field name="history" value="fever" as={Checkbox} />
              <Field name="history" value="diarrhea" as={Checkbox} />
              <Field name="history" value="tattoo" as={Checkbox} />
            </div>
            <div>
              <Field name="sex" type="radio" value="male" as={Radio} />
              <Field name="sex" type="radio" value="female" as={Radio} />
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
