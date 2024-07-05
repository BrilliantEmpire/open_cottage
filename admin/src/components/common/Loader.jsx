import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Spin } from "antd";

function Loader() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col justify-center items-center bg-white">
      {/* <Player
        autoplay
        loop
        src="/assets/jsons/loader.json"
        style={{ height: "200px", width: "200px" }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player> */}
      <Spin size="large" />

      <h3 className="text-gray-400 mt-4">Loading</h3>
    </div>
  );
}

export default Loader;
