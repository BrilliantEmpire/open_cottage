import React, { useReducer } from "react";
import { Input, Form, Button } from "antd";
import { Trash } from "@phosphor-icons/react";

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function stepsReducer(state, action) {
  switch (action.type) {
    case "ADD_STEP":
      return [...state, { id: generateUniqueId(), content: "" }];
    case "UPDATE_STEP":
      return state.map((step) =>
        step.id === action.payload.id ? action.payload : step
      );
    case "DELETE_STEP":
      return state.filter((step) => step.id !== action.payload);
    default:
      throw new Error("Invalid action type");
  }
}

export default function Steps({ onChange }) {
  const initialSteps = Array.from({ length: 5 }, () => ({
    id: generateUniqueId(),
    content: "",
  }));

  const [steps, dispatch] = useReducer(stepsReducer, initialSteps);

  const handleChange = (id, value) => {
    dispatch({ type: "UPDATE_STEP", payload: { id, content: value } });
    onChange(steps);
  };

  const handleDeleteStep = (id) => {
    dispatch({ type: "DELETE_STEP", payload: id });
    onChange(steps);
  };

  const handleAddStep = () => {
    dispatch({ type: "ADD_STEP" });
    onChange(steps);
  };

  return (
    <div className="steps-sec">
      <div className="flex mt-8">
        <div className="flex-grow">
          <h2>Directions</h2>
        </div>
        <div className="flex items-center ml-auto text-base add-step-link">
          <Button type="link" onClick={handleAddStep}>
            Add Step
          </Button>
        </div>
      </div>
      {steps.map((step, index) => (
        <div key={step.id}>
          <div className="relative mt-5 mb-3 sm:mt-2">
            <h5 className="text-sm">STEP {index + 1}</h5>
          </div>
          <Form.Item
            name={`step${index + 1}`}
            rules={[
              {
                required: false,
                message: "Please input the content of this step",
              },
            ]}
          >
            <div style={{ position: "relative" }}>
              <textarea
                name="step"
                value={step.content}
                onChange={(e) => handleChange(step.id, e.target.value)}
                className="step-input"
              />
              {index >= 5 && (
                <Button
                  type="text"
                  shape="circle"
                  icon={<Trash color="#D0001E" weight="fill" size={20} />}
                  style={{
                    position: "absolute",
                    top: "46%",
                    right: "0",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => handleDeleteStep(step.id)}
                />
              )}
            </div>
          </Form.Item>
        </div>
      ))}
    </div>
  );
}
