import React, { useState } from "react";
import { Formik } from "formik";
import axios from 'axios';

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation:'',
  checkboxValidated:false
};
let servError = '';
const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password too short";
  } 
  if (!values.passwordConfirmation){
      errors.passwordConfirmation = "Password confirmation is required"
  } else if (values.passwordConfirmation !== values.password){
      errors.password = errors.passwordConfirmation = "password and confirmation doesn't match"
  }

  return errors;
};

const submitForm = async (values) => {
  const newUser = { email:values.email,password:values.password}
  try{
    const res = await axios.post('http://localhost:1000/api/register',newUser);
    console.log(res);
  } 
  catch (error){
    console.log(error.response.data.error)
    servError = error.response.data.error;

  }
};

const Form = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty
        } = formik;
        return (
          <section className="container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "register-form-input-text input-error" : "register-form-input-text"
                  }
                />
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ?"register-form-input-text input-error" : "register-form-input-text"
                  }
                />
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="form-row">
                <label htmlFor="passwordConfirmation">Password confirmation</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.passwordConfirmation && touched.passwordConfirmation ? "register-form-input-text input-error" : "register-form-input-text"
                  }
                />
                {errors.passwordConfirmation && touched.passwordConfirmation && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div>
                  <label htmlFor="privacyPolicy">I agree to the Privacy Policy</label>
                  <input
                    name="privacyPolicy"
                    type="checkbox"
                  />
              </div>
              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Register
              </button>
              {servError && <p className="register-error-message">error: {servError}</p>}
            </form>
          </section>
        );
      }}
    </Formik>
  );
};

export default Form;
