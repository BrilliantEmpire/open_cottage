import { Card } from "antd";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

function NotFound() {
  return (
    <Card className="flex justify-center items-center h-[70vh]">
      <Player
        autoplay
        loop
        src="/assets/jsons/notfound.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
      <div className="text-center mt-5 text-lg font-bold">
        <h3 className="mb-5"> 🚀 Page not found!</h3>
        <Link
          to={"/dashboard"}
          className="px-6 py-2 rounded text-white bg-primary hover:bg-gray-500"
        >
          Go back to Dashboard
        </Link>
      </div>
    </Card>
  );
}

export default NotFound;
