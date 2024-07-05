import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./redux_state/store.js";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#288B22",
          },
          components: {
            Button: {
              // colorPrimary: "#00B96B",
              colorPrimary: "#288B22",
              borderRadius: 4,
              algorithm: true, // Enable algorithm
            },
            Input: {
              // colorPrimary: "#EB2F96",
              colorPrimary: "#98989A",
              borderRadius: 4,
              algorithm: true, // Enable algorithm
            },
            Card: {
              backgroundColor: "#FFFFFF",
              padding: 12,
              borderRadius: 12,
              algorithm: true,
              fontSizeParagraph: "16px",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
