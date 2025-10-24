import Card from "./components/card";
import List from "./components/list";
import { FunctionComponent, useState } from "react";
import { MainContainerProps } from "./model";
import "./react-drag-drop-style.css";

const MainContainer: FunctionComponent<MainContainerProps> = (props) => {
  const [items, setItems] = useState(props.data);
  const [selectItems, setSelectItems] = useState<{
    items: any[];
    selectedArray: string;
  }>({ items: [], selectedArray: "" });
  const [draggedOver, setDraggedOver] = useState<{
    listId: string;
    index: number;
  } | null>(null);

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const selectFromList = (
    event: any,
    item: any,
    index: number,
    draggedArray: string
  ) => {
    let currentSelectedItems = { ...selectItems };
    if (selectItems.selectedArray !== draggedArray) {
      setSelectItems({ items: [], selectedArray: draggedArray });
      currentSelectedItems = { items: [], selectedArray: draggedArray };
    }

    let result = [];
    if (event.target.checked) {
      let data = [];
      data.push({ ...item, sourceIndex: index });
      result = [...currentSelectedItems.items, ...data];
    } else {
      let data = [...currentSelectedItems.items];
      var itemIndex = data.findIndex((el) => el.id === item.id);
      data.splice(itemIndex, 1);
      result = [...data];
    }
    result.sort((a, b) => {
      return a.sourceIndex - b.sourceIndex;
    });
    setSelectItems({ items: result, selectedArray: draggedArray });
  };

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const handleDragStart = (
    e: React.DragEvent,
    item: any,
    listId: string,
    index: number
  ) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        item,
        sourceListId: listId,
        sourceIndex: index,
      })
    );

    // Check if this item is part of a multi-selection
    const isMultiDrag =
      selectItems.items.findIndex((d) => d.sourceIndex === index) !== -1 &&
      selectItems.selectedArray === listId;

    if (isMultiDrag && selectItems.items.length > 1) {
      // Create custom drag image for multiple items
      const dragImage = createMultiDragImage(selectItems.items.length);
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 40, 40);

      // Clean up the drag image after a short delay
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }

    // Add dragging class for visual feedback
    (e.currentTarget as HTMLElement).classList.add("dragging");

    // If dragging multiple items, add visual feedback to all selected items
    if (isMultiDrag && selectItems.items.length > 1) {
      selectItems.items.forEach((selectedItem) => {
        const element = document.getElementById(
          `${listId}_${selectedItem.sourceIndex}`
        );
        if (element) {
          element
            .closest(".drag_item_wrapper")
            ?.classList.add("multi-dragging");
        }
      });
    }
  };

  const createMultiDragImage = (count: number): HTMLElement => {
    const container = document.createElement("div");
    container.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
    `;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");
    svg.setAttribute("viewBox", "0 0 70 70");
    svg.style.cssText = "pointer-events: none;";

    // Background card
    const bgRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    bgRect.setAttribute("x", "10");
    bgRect.setAttribute("y", "10");
    bgRect.setAttribute("width", "50");
    bgRect.setAttribute("height", "50");
    bgRect.setAttribute("rx", "8");
    bgRect.setAttribute("fill", "white");
    bgRect.setAttribute("stroke", "#e0e0e0");
    bgRect.setAttribute("stroke-width", "2");
    svg.appendChild(bgRect);

    // Add stacked cards icon (simple, minimal)
    const stackGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );

    // Back card (subtle gray)
    const rect1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect1.setAttribute("x", "28");
    rect1.setAttribute("y", "20");
    rect1.setAttribute("width", "22");
    rect1.setAttribute("height", "28");
    rect1.setAttribute("rx", "2");
    rect1.setAttribute("fill", "#f5f5f5");
    rect1.setAttribute("stroke", "#ccc");
    rect1.setAttribute("stroke-width", "1");

    // Middle card
    const rect2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect2.setAttribute("x", "26");
    rect2.setAttribute("y", "23");
    rect2.setAttribute("width", "22");
    rect2.setAttribute("height", "28");
    rect2.setAttribute("rx", "2");
    rect2.setAttribute("fill", "#fafafa");
    rect2.setAttribute("stroke", "#bbb");
    rect2.setAttribute("stroke-width", "1");

    // Front card (white, most prominent)
    const rect3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect3.setAttribute("x", "24");
    rect3.setAttribute("y", "26");
    rect3.setAttribute("width", "22");
    rect3.setAttribute("height", "28");
    rect3.setAttribute("rx", "2");
    rect3.setAttribute("fill", "white");
    rect3.setAttribute("stroke", "#999");
    rect3.setAttribute("stroke-width", "1.5");

    stackGroup.appendChild(rect1);
    stackGroup.appendChild(rect2);
    stackGroup.appendChild(rect3);
    svg.appendChild(stackGroup);

    // Add count badge (simple gray circle)
    const badge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    badge.setAttribute("cx", "52");
    badge.setAttribute("cy", "18");
    badge.setAttribute("r", "12");
    badge.setAttribute("fill", "#666");
    badge.setAttribute("stroke", "white");
    badge.setAttribute("stroke-width", "2");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "52");
    text.setAttribute("y", "23");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "13");
    text.setAttribute("font-weight", "700");
    text.setAttribute("font-family", "system-ui, -apple-system, sans-serif");
    text.textContent = count.toString();

    svg.appendChild(badge);
    svg.appendChild(text);
    container.appendChild(svg);

    return container;
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("dragging");

    // Remove multi-dragging class from all items
    document.querySelectorAll(".multi-dragging").forEach((el) => {
      el.classList.remove("multi-dragging");
    });

    setDraggedOver(null);
  };

  const handleDragOver = (
    e: React.DragEvent,
    listId: string,
    index: number
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDraggedOver({ listId, index });
  };

  const handleDrop = (
    e: React.DragEvent,
    destinationListId: string,
    destinationIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const { sourceListId, sourceIndex } = JSON.parse(data);

    const listCopy: any[] = [...items];

    // Check if multiple items are selected and being dragged
    if (
      selectItems.items.findIndex((d) => d.sourceIndex === sourceIndex) !==
        -1 &&
      selectItems.selectedArray === sourceListId
    ) {
      // Handle multiple items
      selectItems.items.forEach((el, i) => {
        let sourceId = listCopy.findIndex((list) => list.id === sourceListId);
        if (sourceId !== -1) {
          const sourceList = listCopy[sourceId].data;
          let adjustedSourceIndex = el.sourceIndex - i;
          const [removedElement, newSourceList] = removeFromList(
            sourceList,
            adjustedSourceIndex
          );
          listCopy[sourceId].data = newSourceList;

          let destinationId = listCopy.findIndex(
            (list) => list.id === destinationListId
          );
          if (destinationId !== -1) {
            const destinationList = listCopy[destinationId].data;
            listCopy[destinationId].data = addToList(
              destinationList,
              destinationIndex + i,
              removedElement
            );
          }
        }
      });
      setSelectItems({ items: [], selectedArray: "" });
    } else {
      // Handle single item
      let sourceId = listCopy.findIndex((list) => list.id === sourceListId);
      const sourceList = listCopy[sourceId].data;
      if (sourceId !== -1) {
        const [removedElement, newSourceList] = removeFromList(
          sourceList,
          sourceIndex
        );

        listCopy[sourceId].data = newSourceList;

        let destId = listCopy.findIndex(
          (list) => list.id === destinationListId
        );
        if (destId !== -1) {
          const destinationList = listCopy[destId].data;
          listCopy[destId].data = addToList(
            destinationList,
            destinationIndex,
            removedElement
          );
        }
      }
    }

    setItems(listCopy);
    setDraggedOver(null);
    props.onChange(listCopy);
  };

  const handleListDrop = (e: React.DragEvent, listId: string) => {
    // Get the list and drop at the end
    const list = items.find((l) => l.id === listId);
    if (list) {
      handleDrop(e, listId, list.data.length);
    }
  };

  return (
    <div style={{ width: props.width, height: props.height }}>
      <div className="d-flex h-100 p-2">
        {items.map((el) => {
          return (
            <List
              key={`drop_box_${el.id}`}
              centerTitle={props.centerTitle}
              title={props.title ? el.name : ""}
              id={el.id}
              onDrop={(e) => handleListDrop(e, el.id)}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              }}
            >
              {el.data.map((item: any, index: number) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, el.id, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, el.id, index)}
                  onDrop={(e) => handleDrop(e, el.id, index)}
                  className={`drag_item_wrapper ${
                    draggedOver?.listId === el.id &&
                    draggedOver?.index === index
                      ? "drag-over"
                      : ""
                  }`}
                >
                  <div className="drag_item_container">
                    <input
                      disabled={!props.multiple}
                      id={`${el.id}_${index}`}
                      type={"checkbox"}
                      checked={
                        selectItems.selectedArray === el.id &&
                        selectItems.items.findIndex((e) => e.id === item.id) !==
                          -1
                      }
                      onChange={(event) =>
                        selectFromList(event, item, index, el.id)
                      }
                    />
                    <div
                      className="drag_item_content"
                      onClick={() => {
                        document.getElementById(`${el.id}_${index}`)?.click();
                      }}
                    >
                      {props.renderItem ? (
                        // Use custom render function if provided
                        props.renderItem(item, index, el.id)
                      ) : (
                        // Fallback to default Card component for backward compatibility
                        <Card
                          draggerImg={props.draggerImg}
                          data={item}
                          inputId={`${el.id}_${index}`}
                        >
                          {props.children ? props.children : null}
                        </Card>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </List>
          );
        })}
      </div>
    </div>
  );
};

export default MainContainer;
