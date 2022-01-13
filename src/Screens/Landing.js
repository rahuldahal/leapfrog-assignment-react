import React, { useEffect } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import useField from "../hooks/useField";
import { useSelector, useDispatch } from "react-redux";
import { signUpRequest } from "../redux/auth/actions";

export default function Landing() {
  const [emailRef, EmailField] = useField("Email Address");
  const [passwordRef, PasswordField] = useField("Password");
  const { message } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const { accessToken, refreshToken } = message;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    }
  }, [message]);

  function handleSignUp(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log({ email, password });
    dispatch(signUpRequest({ email, password }));
  }

  return (
    <main className="container m-auto h-screen flex items-center justify-around">
      <section className="">
        <Heading level="1">Wanna Leap?</Heading>
        <p className="max-w-sm">
          Leapfrog Technology, Inc. assignment that consumes{" "}
          <strong className="text-green-500">node.js' CRUD API </strong>
          with <strong className="text-green-500">React</strong> in the
          frontend.
        </p>
        <form className="mt-12" onSubmit={handleSignUp}>
          <EmailField type="email" placeholder="ram@domain.com" />
          <PasswordField type="password" placeholder="password" />
          <small className="block">Don't have an account? Sign Up</small>
          <Button
            modifier="mt-5 bg-green-500 hover:bg-green-700 shadow-xl text-white"
            type="submit"
          >
            Sign In
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
  );
}
