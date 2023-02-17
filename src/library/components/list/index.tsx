import React from "react";
import {
  Droppable,
  DroppableProvided
} from "react-beautiful-dnd";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  onDragEnd: (data: any) => void;
  name: string;
};

const List = ({ children, name }: ListProps) => {
  return (
    <div className="h-100 w-100">
      <div className="h-100">
        <Droppable droppableId={name}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} className="h-100">
              <div className="h-100 drag_box">
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;
