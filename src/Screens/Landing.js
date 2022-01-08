import react from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";

export default function Landing() {
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
        <form className="mt-12">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border focus:outline-green-500 w-full h-10 px-3 mb-5 rounded-md"
            placeholder="ram@domain.com"
          />
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="border focus:outline-green-500 w-full h-10 px-3 mb-5 rounded-md"
            placeholder="password"
          />
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
