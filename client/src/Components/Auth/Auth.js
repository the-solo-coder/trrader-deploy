import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordClicked = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Input
                name="firstName"
                label="First Name"
                handleChange={handleChange}
                autoFocus
                half
              />
              <Input
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half
              />
            </>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPasswordClicked}
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              handleChange={handleChange}
              type="password"
            />
            <Typography variant="label" className={classes.profilePic}>
              Profile Picture
            </Typography>
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formData, profilePicture: base64 })
                }
              />
            </div>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <p>
            Have an account? <a href="login">Click Here</a> to Login.
          </p>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
