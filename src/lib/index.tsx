import Card from "./components/card";
import List from "./components/list";
import {
  DragDropContext,
  Draggable,
  DraggableProvided
} from "react-beautiful-dnd";
import { FunctionComponent, useEffect, useState } from "react";
import { MainContainerProps } from "./model";
import "./react-drag-drop-style.css";

const MainContainer: FunctionComponent<MainContainerProps> = (props) => {
  const [items, setItems] = useState(props.data);
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
      const listCopy: any[] = [...items];
      if((selectItems.items.findIndex(d=> d.sourceIndex == result.source.index) !== -1) && selectItems.selectedArray === result.source.droppableId) {
          selectItems.items.map((el, i) => {
            let sourceId = listCopy.findIndex(el => el.id === result.source.droppableId);
            if(sourceId !== -1) {
                const sourceList = listCopy[sourceId].data;
                let sourceIndex = el.sourceIndex - (i);
                const [removedElement, newSourceList] = removeFromList(
                  sourceList,
                  sourceIndex
                );
                listCopy[sourceId].data = newSourceList;
            
                let destinationIndex = listCopy.findIndex(el => el.id === result.destination.droppableId);
                if(destinationIndex !== -1) {
                    const destinationList = listCopy[destinationIndex].data;
                    listCopy[destinationIndex].data = addToList(
                      destinationList,
                      (result.destination.index) + i,
                      removedElement
                    ); 
                }
            } 
          })
          setSelectItems({items: [], selectedArray: ''})
      }
      else { 
          let sourceId = listCopy.findIndex(el => el.id === result.source.droppableId);
          const sourceList = listCopy[sourceId].data;
          if(sourceId !== -1) {
              const [removedElement, newSourceList] = removeFromList(
                  sourceList,
                  result.source.index
              );

              listCopy[sourceId].data = newSourceList;

              let destinationIndex = listCopy.findIndex(el => el.id === result.destination.droppableId);
              if(destinationIndex !== -1) {
                  const destinationList = listCopy[destinationIndex].data;
                  listCopy[destinationIndex].data = addToList(
                    destinationList,
                    result.destination.index,
                    removedElement
                  );   
              }
          }
      }
      setItems(listCopy);
      props.onChange(listCopy)
  };

  return (
    <div style={{width: props.width, height: props.height}}>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <div className="d-flex h-100 p-2">
              {items.map(el=> {
                return (
                  <List key={`drop_box_${el.id}`} centerTitle={props.centerTitle} title={props.title ? el.name : ""} onDragEnd={(e) => onDragEnd(e)} id={el.id}>
                    {el.data.map((item: any, index: number) => (
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
                                disabled={!props.multiple}
                                id={`${el.id}_${index}`}  
                                type={"checkbox"}  
                                checked={selectItems.selectedArray === el.id && selectItems.items.findIndex((e) => e.id === item.id) !== -1} 
                                onChange={(event) => selectFromList(event, item, index, el.id)} 
                              />
                              <Card draggerImg={props.draggerImg} data={item} inputId={`${el.id}_${index}`}>{props.children ? props.children : null}</Card>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </List>
                  )
              })} 
          </div>
      </DragDropContext>
    </div>
  );
};

export default MainContainer;