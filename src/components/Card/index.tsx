import React, { FunctionComponent } from "react";
import { CardProps } from "../../model";

const Card: FunctionComponent<CardProps> = (props) => {

  const itemClicked = (): void => {
    document.getElementById(props.inputId)?.click()
  }

  return (
    <div className="flex w-full cursor-pointer drag_item_content" onClick={itemClicked}>
      <main className="py-5 px-5 w-full bg-white drag_item">
        <span className="flex flex-row justify-between">
          <h4 className="uppercase font-normal">{props.data.id}</h4>
        </span>
      </main>
    </div>
  );
};

export default Card;
