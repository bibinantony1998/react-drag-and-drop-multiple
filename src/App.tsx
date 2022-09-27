import Card from "./components/card";
import List from "./components/list";
import {
  DragDropContext,
  Draggable,
  DraggableProvided
} from "react-beautiful-dnd";
import { FunctionComponent, useState } from "react";
import { MainContainerProps } from "./model";

const MainContainer: FunctionComponent<MainContainerProps> = () => {
  const itemsNormal = {
    available: [
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
    ],

    assigned: [
      {
        id: 5,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a450"
      },
      {
        id: 6,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a451"
      },
    ],

    thirdBox: [
      {
        id: 7,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a452"
      },
      {
        id: 8,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a453"
      },
    ],
  };

  const [items, setItems] = useState(itemsNormal);
  const [selectItems, setSelectItems] = useState<{items: any[], selectedArray: string}>({items: [], selectedArray: ''});

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const selectFromList = (event: any, item: any, index: number, draggedArray: string) => {
    let currentSelectedItems = {...selectItems}
    if(selectItems.selectedArray !== draggedArray) {
      setSelectItems({items: [], selectedArray: draggedArray});
      currentSelectedItems = {items: [], selectedArray: draggedArray}
    }
   
    let result = []
    if (event.target.checked){
      let data = [];
      data.push({...item, sourceIndex: index});
      result = [...currentSelectedItems.items, ...data]
    } else {
      let data = [...currentSelectedItems.items];
      var itemIndex = data.findIndex(el => el.id === item.id)        
      data.splice(itemIndex, 1)
      result = [...data]
    } 
    result.sort((a, b) => {
      return a.sourceIndex - b.sourceIndex;
    });
    setSelectItems({items: result, selectedArray: draggedArray})
  }

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: any = { ...items };
    if((selectItems.items.findIndex(d=> d.sourceIndex == result.source.index) !== -1) && selectItems.selectedArray === result.source.droppableId) {
      selectItems.items.map((el, i) => {
        const sourceList = listCopy[result.source.droppableId];
        let sourceIndex = el.sourceIndex - (i);
        const [removedElement, newSourceList] = removeFromList(
          sourceList,
          sourceIndex
        );
        listCopy[result.source.droppableId] = newSourceList;
    
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
          destinationList,
          (result.destination.index) + i,
          removedElement
        );  
      })
      setSelectItems({items: [], selectedArray: ''})
    }
    else { 
      const sourceList = listCopy[result.source.droppableId];
      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );
      listCopy[result.source.droppableId] = newSourceList;
  
      const destinationList = listCopy[result.destination.droppableId];
      listCopy[result.destination.droppableId] = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );     
    }
    setItems(listCopy);
  };

  return (
    <>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <div className="flex p-12">
              <List title="" onDragEnd={(e) => onDragEnd(e)} name="available">
                {items.available.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id + ""} index={index}>
                    {(
                      provided: DraggableProvided | any
                    ) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="drag_item_container"
                        >
                          <input 
                            id={`available_${index}`}  
                            type={"checkbox"}  
                            checked={selectItems.selectedArray === 'available' && selectItems.items.findIndex((e) => e.id === item.id) !== -1} 
                            onChange={(event) => selectFromList(event, item, index, 'available')} 
                          />
                          <Card data={item} inputId={`available_${index}`} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </List>
              <List title="" onDragEnd={onDragEnd} name="assigned">
                {items.assigned.map((item, index) => (
                  <Draggable draggableId={item.uuid} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="drag_item_container"
                      >
                        <input 
                          id={`assigned_${index}`}  
                          type={"checkbox"} 
                          checked={selectItems.selectedArray === 'assigned' && selectItems.items.findIndex((e) => e.id === item.id) !== -1} 
                          onChange={(event) => selectFromList(event, item, index, 'assigned')} 
                        />
                        <Card data={item} inputId={`assigned_${index}`} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </List>
              <List title="" onDragEnd={onDragEnd} name="thirdBox">
                {items.thirdBox?.map((item, index) => (
                  <Draggable draggableId={item.uuid} index={index} key={item.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="drag_item_container"
                      >                         
                        <input 
                          id={`thirdBox_${index}`} 
                          type={"checkbox"} 
                          checked={selectItems.selectedArray === 'thirdBox' && selectItems.items.findIndex((e) => e.id === item.id) !== -1} 
                          onChange={(event) => selectFromList(event, item, index, 'thirdBox')} 
                        />
                        <Card data={item} inputId={`thirdBox_${index}`}/>
                      </div>
                    )}
                  </Draggable>
                ))}
              </List>
          </div>
      </DragDropContext>
    </>
  );
};

export default MainContainer;