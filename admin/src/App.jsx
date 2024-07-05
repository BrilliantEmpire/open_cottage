/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
