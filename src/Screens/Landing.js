import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import useField from "../hooks/useField";
import { useSelector, useDispatch } from "react-redux";
import {
  checkAuthStatus,
  signInRequest,
  signUpRequest,
} from "../redux/auth/actions";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import FlashMessage from "../components/FlashMessage";

export default function Landing({ history }) {
  const [formType, setFormType] = useState("signIn");
  const [emailRef, EmailField] = useField("Email Address");
  const [passwordRef, PasswordField] = useField("Password");
  const { isAuthenticated, accessToken, refreshToken, error } = useSelector(
    (state) => state.auth
  );
  const [flashMessage, setFlashMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      accessToken && dispatch(checkAuthStatus({ accessToken, refreshToken }));
    } catch (error) {
      console.log(error.message);
    }
  }, [accessToken, refreshToken, dispatch]);

  useEffect(() => {
    isAuthenticated && navigate("contacts");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (flashMessage) {
      setTimeout(() => setFlashMessage(null), 3000);
    }
  }, [flashMessage]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("accessToken", accessToken);
      return navigate("contacts");
    }
    if (error) {
      console.log(error);
      setFlashMessage({
        type: "error",
        message: error,
      });
    }
  }, [isAuthenticated, accessToken, error, navigate]);

  function handleFormSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log({ email, password });
    formType === "signIn"
      ? dispatch(signInRequest({ email, password }))
      : dispatch(signUpRequest({ email, password }));
  }

  function FormTypeToggler() {
    const contextLabel =
      formType === "signIn"
        ? "Don't have an account?"
        : "Already have an account?";

    const textLabel = formType === "signIn" ? "Sign Up" : "Sign In";
    return (
      <small className="block">
        {contextLabel}
        <span
          onClick={() =>
            setFormType(formType === "signIn" ? "signUp" : "signIn")
          }
          className="underline cursor-pointer"
        >{` ${textLabel}`}</span>
      </small>
    );
  }

  return (
    <>
      <main className="container m-auto h-screen flex items-center justify-around">
        <section className="">
          <Heading level="1">Wanna Leap?</Heading>
          <p className="max-w-sm">
            Leapfrog Technology, Inc. assignment that consumes{" "}
            <strong className="text-green-500">node.js' CRUD API </strong>
            with <strong className="text-green-500">React</strong> in the
            frontend.
          </p>
          <form className="mt-12" onSubmit={handleFormSubmit}>
            <EmailField type="email" placeholder="ram@domain.com" />
            <PasswordField type="password" placeholder="password" />
            <FormTypeToggler />
            <Button
              modifier="mt-5 bg-green-500 hover:bg-green-700 shadow-xl text-white"
              type="submit"
            >
              {formType === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </section>

        <aside className="hidden lg:block relative w-96 h-max after:block after:rounded-md after:border-b-8 after:border-r-8 after:border-green-500 after:absolute after:-bottom-2 after:-right-2 after:w-24 after:h-full">
          <img
            className="w-auto h-auto rounded-md rounded-br-none"
            src="/leap-silhouette.jpg"
            alt=""
          />
        </aside>
      </main>

      {flashMessage ? (
        <Modal transparent>
          <FlashMessage
            type={flashMessage.type}
            message={flashMessage.message}
          />
        </Modal>
      ) : null}
    </>
  );
}
