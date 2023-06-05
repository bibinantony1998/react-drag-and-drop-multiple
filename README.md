## React drag and drop multiple dynamic column
A multiple column draggable drag and drop

Inspired from  React beautiful dnd

Just send a JSON in the given structure to create draggable and droppable column, the column will create as the length of the JSON that pass in props

Now you can add your custom drag item component in drag drop component as children (now, its only one component accepted on single parent, future version will add whole drag drop container and drag item as HOC)

## demo
[Live demo](https://bibinantony1998.github.io/react-drag-and-drop-multiple/)

### Usage: 

`npm install react-drag-and-drop-multiple-dynamic-column`

<sup>* Requires `react` as a peer dependency: `npm install react`</sup>


```
import React from "react";
import { render } from "react-dom";
import ReactMDND from "react-drag-and-drop-multiple-dynamic-column";

const data = [
  {
    id: "1",
    name: "Drag drop 1",
    data: [
      {
        id: "1",
        value: "Test 1"
      },
      {
        id: "2",
        value: "Test 2"
      },
      {
        id: "3",
        value: "Test 3"
      },
    ]
  },
  {
    id: "2",
    name: "Drag drop 2",
    data: [
      {
        id: "5",
        value: "Test 4"
      },
      {
        id: "6",
        value: "Test 5"
      },
    ]
  },
  {
    id: "3",
    name: "Drag drop 3",
    data: [
      {
        id: "7",
        value: "Test 6"
      },
      {
        id: "8",
        value: "Test 7"
      },
    ]
  },
];

const App = () => (
    <DragDropComponent 
      onChange={(data) => console.log(data)}
      width="100%" 
      height={"100%"} 
      data={data} 
      multiple 
      draggerImg
      title
  >Try your custom drag item html component here</DragDropComponent>
);

render(<App />, document.body);
```

### Props

| Prop Name  | Type | Default Value | Description |
| ------------- | ------------- | ------------- | ------------- |
| width | number/string | `0` | The width for dragger |
| height | number/string | `0` | The height for dragger |
| multiple | boolean | false | The items can select and drag in multiple |
| draggerImg | boolean | false | set an image in left side of drag item,  (users to know its draggable) |
| title | boolean | false | to show title in dragging box |
| onChange | function |  | This Function will return the updated JSON |

[Bibin Antony](https://github.com/bibinantony1998)

### Limitations
- The multiple dragging item will not show when dragging (in the hold cursor mode)
