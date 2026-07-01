import React from "react";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  id: string;
  centerTitle?: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  isDragged?: boolean;
  isDragOver?: boolean;
};

const List = ({
  children,
  title,
  centerTitle,
  onDrop,
  onDragOver,
  draggable,
  onDragStart,
  onDragEnd,
  isDragged,
  isDragOver,
}: ListProps) => {
  return (
    <div className={`h-100 w-100 ${isDragged ? "dragging-board" : ""} ${isDragOver ? "board-drag-over" : ""}`}>
      <div className="h-100">
        <div className="h-100" onDrop={onDrop} onDragOver={onDragOver}>
          <div
            className="h-100 drag_box_container"
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            {title ? (
              <div
                className={`dragger_title ${centerTitle ? "center_title" : ""}`}
              >
                {title}
              </div>
            ) : (
              ""
            )}
            <div
              className={`drag_box ${title ? "drag_box_on_drag_tittle" : ""}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
