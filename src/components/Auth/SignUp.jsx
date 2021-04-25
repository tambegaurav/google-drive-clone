import React, { useState } from "react";
import CenteredContainer from "../../styled-components/CenteredContainer";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useAuth } from "../../context/AuthContextProvider";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";

const Link = styled(NavLink)`
  text-decoration: none;
  color: #254e8b;

  :hover {
    color: #171e2e;
    text-decoration: underline #254e8b;
  }
`;

const initialValues = {
  email: "",
  password: "",
  password2: "",
};

const SignUp = () => {
  const { signup, currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (values) => {
    console.log("Form Data: ", values);

    const { email, password } = values;
    setMessage("");
    setSuccess(false);

    setLoading(true);
    signup(email, password)
      .then(() => {
        setMessage("Account Created!");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          setMessage("Account already exists");
        } else {
          setMessage("Failed to create an account");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = (values) => {
    //values.name, etc
    //error.name, etc

    let errors = {};

    if (!values.email) {
      errors.email = "This field is required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        values.email
      )
    ) {
      errors.email = "Invalid Email Format";
    }

    if (!values.password) {
      errors.password = "This field is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/i.test(values.password)
    ) {
      errors.password = "Invalid Password";
    }

    if (!values.password2) {
      errors.password2 = "This field is required";
    } else if (values.password !== values.password2) {
      errors.password2 = "Passwords do not match";
    }

    return errors;
  };

  //init formik
  const formik = useFormik({
    //set initial values
    initialValues,
    //onsubmit will get an callback func with values as arguments
    onSubmit,
    validate,
  });

  if (currentUser) {
    return <Redirect path="/" />;
  }

  return (
    <CenteredContainer>
      <div>
        <h1>Sign up</h1>
        <div>
          Already have an account? <Link to="/signin">Log In</Link>
        </div>
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "20px",
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
              // helperText="Invalid"
              error={formik.touched.email && formik.errors.email}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              id="password2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2}
              error={formik.touched.password2 && formik.errors.password2}
              helperText={
                formik.touched.password2 && formik.errors.password2
                  ? formik.errors.password2
                  : ""
              }
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#0c163d",
                color: "#fff",
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Sign up"
              )}
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {message && <p>{message}</p>}
              {success && (
                <span>
                  <Link to="/signin">Go to Login</Link>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default SignUp;
