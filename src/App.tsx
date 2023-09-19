import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense, useState } from "react";
import Loader from "./components/Loader";
import Login from "./components/Login";
import { useSelector } from "react-redux";

const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));

const App = () => {
  const { loading } = useSelector((state: { root: StateType }) => state.root);
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <div
          className={
            loading
              ? "flex justify-center items-center max-h-screen mt-[2rem]"
              : "flex justify-center mt-[2rem]"
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learning />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loader" element={<Loader />} />
            
          </Routes>
        </div>
      </Suspense>
    </>
  );
};

export default App;
