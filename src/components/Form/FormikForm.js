import React from "react";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as yup from "yup";

const FormikForm = ({ stateForm, setForm, stateStep, setStep }) => {
  const MyRadio = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
      <FormControlLabel
        {...field}
        {...props}
        label={label}
        control={<Radio />}
      />
    );
  };

  const MyTextField = ({ placeholder, ...props }) => {
    const [field, meta, helpers] = useField(props);

    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField
        {...field}
        placeholder={placeholder}
        helperText={errorText}
        error={meta.error}
      />
    );
  };

  const yupSchema = yup.object({
    email: yup.string().required("email is required").min(5),
    displayname: yup.string().max(7),
    cities: yup.array().of(
      yup.object({
        name: yup.string().required(),
        country: yup.string().required(),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        displayname: "",
        cities: [{ name: "seoul", country: "KOREA", id: "" + Math.random() }],
      }}
      // validate={(valuesData) => {
      //   const errors = {};

      //   if (valuesData.email.includes("bob")) {
      //     errors.email = "'bob' is not allowed";
      //   }

      //   return errors;
      // }}
      validationSchema={yupSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setForm({ ...stateForm, ...data });
        resetForm();
        setStep(stateStep + 1);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        isSubmitting,
        // handleChange,
        // handleBlur,
        // handleSubmit,
      }) => {
        return (
          <Form>
            <div>
              <MyTextField name="email" type="input" placeholder="email" />
            </div>

            <div>
              <MyTextField
                name="displayname"
                type="input"
                placeholder="displayname"
              />
            </div>

            <div>
              <FieldArray name="cities">
                {(arrayHelpers) => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          country: "KOREA",
                          name: "",
                          id: "" + Math.random(),
                        })
                      }
                    >
                      add city
                    </Button>
                    {values.cities.map((city, index) => {
                      return (
                        <div key={city.id}>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            x
                          </Button>

                          <MyTextField
                            name={`cities${[index]}.name`}
                            placeholder="city name"
                          />
                          <Field
                            name={`cities${[index]}.country`}
                            type="select"
                            as={Select}
                          >
                            <MenuItem value="KOREA">KOREA</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                            <MenuItem value="JAPAN">JAPAN</MenuItem>
                          </Field>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>

            <div>
              <Button onClick={() => setStep(stateStep - 1)}>back</Button>

              <Button disabled={isSubmitting} type="submit">
                next
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikForm;
