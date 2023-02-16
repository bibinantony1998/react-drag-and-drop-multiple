import Card from "./components/card";
import List from "./components/list";
import {
  DragDropContext,
  Draggable,
  DraggableProvided
} from "react-beautiful-dnd";
import { FunctionComponent, useState } from "react";
import { MainContainerProps } from "./model";

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
            let sourceId = listCopy.findIndex(el => el.name === result.source.droppableId);
            if(sourceId !== -1) {
                const sourceList = listCopy[sourceId].data;
                let sourceIndex = el.sourceIndex - (i);
                const [removedElement, newSourceList] = removeFromList(
                  sourceList,
                  sourceIndex
                );
                listCopy[sourceId].data = newSourceList;
            
                let destinationIndex = listCopy.findIndex(el => el.name === result.destination.droppableId);
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
          let sourceId = listCopy.findIndex(el => el.name === result.source.droppableId);
          const sourceList = listCopy[sourceId].data;
          if(sourceId !== -1) {
              const [removedElement, newSourceList] = removeFromList(
                  sourceList,
                  result.source.index
              );

              listCopy[sourceId].data = newSourceList;

              let destinationIndex = listCopy.findIndex(el => el.name === result.destination.droppableId);
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
  };

  return (
    <>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <div className="flex p-12">
              {items.map(el=> {
                return (
                  <List title="" onDragEnd={(e) => onDragEnd(e)} name={el.name}>
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
                                id={`${el.name}_${index}`}  
                                type={"checkbox"}  
                                checked={selectItems.selectedArray === el.name && selectItems.items.findIndex((e) => e.id === item.id) !== -1} 
                                onChange={(event) => selectFromList(event, item, index, el.name)} 
                              />
                              <Card data={item} inputId={`${el.name}_${index}`} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </List>
                  )
              })}
              
              {/* <List title="" onDragEnd={onDragEnd} name="assigned">
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
              </List> */}
          </div>
      </DragDropContext>
    </>
  );
};

export default MainContainer;