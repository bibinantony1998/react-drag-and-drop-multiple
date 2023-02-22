import React from "react";
import ReactDOM from "react-dom";
import App from "./lib";
import "./demo.css";

const data = [
  {
    id: "1",
    name: "Drag drop 1",
    data: [
      {
        id: "1",
        value: "Test 1"
      },
      {
        id: "2",
        value: "Test 2"
      },
      {
        id: "3",
        value: "Test 3"
      },
    ]
  },
  {
    id: "2",
    name: "Drag drop 2",
    data: [
      {
        id: "5",
        value: "Test 4"
      },
      {
        id: "6",
        value: "Test 5"
      },
    ]
  },
  {
    id: "3",
    name: "Drag drop 3",
    data: [
      {
        id: "7",
        value: "Test 6"
      },
      {
        id: "8",
        value: "Test 7"
      },
    ]
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App 
      onChange={(data) => console.log(data)}
      width="100%" 
      height={"100%"} 
      data={data} 
      multiple 
      draggerImg
      title
    />
  </React.StrictMode>,
  document.getElementById("root")
);
