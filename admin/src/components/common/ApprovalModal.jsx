/* eslint-disable react/prop-types */

import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Modal } from "antd";

function ApprovalModal({ isOpen, onToggle, title }) {
  return (
    <Modal open={isOpen} onCancel={onToggle} footer={false}>
      <div className="flex justify-center flex-col items-center m-6">
        <p className="text-2xl text-center">{title}</p>
        <Player
          autoplay
          loop
          src="/assets/jsons/confirm.json"
          style={{ height: "200px", width: "200px" }}
        ></Player>
        <div className="flex gap-4">
          <Button onClick={onToggle}>Close</Button>
          {/* <Button onClick={handleSend} type="primary">
            Confirm
          </Button> */}
        </div>
      </div>
    </Modal>
  );
}

export default ApprovalModal;