import React from "react";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  id: string;
  centerTitle?: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
};

const List = ({
  children,
  id,
  title,
  centerTitle,
  onDrop,
  onDragOver,
}: ListProps) => {
  return (
    <div className="h-100 w-100">
      <div className="h-100">
        <div className="h-100" onDrop={onDrop} onDragOver={onDragOver}>
          <div className="h-100 drag_box_container">
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
