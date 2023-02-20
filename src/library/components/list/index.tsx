import React from "react";
import {
  Droppable,
  DroppableProvided
} from "react-beautiful-dnd";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  onDragEnd: (data: any) => void;
  id: string;
  centerTitle?: boolean;
};

const List = ({ children, id, title, centerTitle }: ListProps) => {
  return (
    <div className="h-100 w-100">
      
      <div className="h-100">
        <Droppable droppableId={id}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} className="h-100">
              <div className="h-100  drag_box_container">
                {title ? <div className={`dragger_title ${centerTitle ? "center_title" : ""}`}>{title}</div> : ""}
                <div className={`drag_box ${title ? "drag_box_on_drag_tittle" : ""}`}>
                  {children}
                  {provided.placeholder}
                </div> 
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;
