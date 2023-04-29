import React, { useContext } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AuthContext from "../../store/authContext";
import Container from "../../components/UI/Container";
import classes from "./Landing.module.css";

const Register = () => {
  //! Need to add validation with yup
  //! Need to implement formatting functions where needed
  //! pull formatting function folder out to root directory
  //! Need to check that passwords match and remove confirm

  const authCtx = useContext(AuthContext);

  //TODO setup validation
  // const validationSchema = yup.object({
  //   firstname: yup,
  //   lastname: yup,
  //   email: yup,
  //   password: yup,
  //   confirmPass: yup,
  //   phone: yup,
  //   address: yup,
  // })

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPass: "",
      phone: "",
      address: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:4040/register", values)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId, data.employee);
          console.log("after auth", data);
        })
        .catch((err) => {
          console.log("Sorry there was an issue with your registration", err);
        });
    },
  });

  return (
    <Container className={classes.registerContainer}>
      <h3>ENTER REGISTRATION INFO</h3>
      <form onSubmit={formik.handleSubmit} className={classes.registerForm}>
        <div className={classes.registerInputs}>
          <TextField
            size="small"
            id="firstname"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            label="First Name"
            variant="filled"
          ></TextField>
          <TextField
            size="small"
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            label="Last Name"
            variant="filled"
          ></TextField>
          <TextField
            size="small"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email"
            variant="filled"
          ></TextField>
          <TextField
            size="small"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            label="Password"
            variant="filled"
          ></TextField>
          <TextField
            size="small"
            id="confirmPass"
            name="confirmPass"
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
            label="Confirm Password"
            variant="filled"
          ></TextField>
          <TextField
            size="small"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            label="Phone"
            variant="filled"
          ></TextField>
          <TextField
            size="small"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            label="address"
            variant="filled"
          ></TextField>
        </div>

        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
      </form>
    </Container>
  );
};

export default Register;
