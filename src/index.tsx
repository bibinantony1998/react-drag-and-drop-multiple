import React from "react";
import ReactDOM from "react-dom";
import App from "./library/App";
import "./demo.css";

const itemsNormal = [
  {
    id: 1,
    name: "available",
    data: [
      {
        id: 1,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a4477"
      },
      {
        id: 2,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448"
      },
      {
        id: 3,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a449"
      },
    ]
  },
  {
    id: 2,
    name: "assigned",
    data: [
      {
        id: 5,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a450"
      },
      {
        id: 6,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a451"
      },
    ]
  },
  {
    id: 3,
    name: "thirdBox",
    data: [
      {
        id: 7,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a452"
      },
      {
        id: 8,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a453"
      },
    ]
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App 
      width="100%" 
      height={"100%"} 
      data={itemsNormal} 
      multiple 
      draggerImg
      title
    />
  </React.StrictMode>,
  document.getElementById("root")
);
