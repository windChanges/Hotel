import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import renderRoutes from "./routes";
import Loading from "./components/Loading";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>{renderRoutes()}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
