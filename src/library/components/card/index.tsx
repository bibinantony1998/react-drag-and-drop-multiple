import React, { FunctionComponent } from "react";
import { CardProps } from "../../model";

const Card: FunctionComponent<CardProps> = (props) => {

  const itemClicked = (): void => {
    document.getElementById(props.inputId)?.click()
  }

  return (
    <div className="cursor-pointer drag_item_content" onClick={itemClicked}>
      <main className={`drag_item ${props.draggerImg ? "drag_item_drag_img" : ""}`}>
        <span className="">
          <div>{props.data.value}</div>
        </span>
      </main>
    </div>
  );
};

export default Card;
