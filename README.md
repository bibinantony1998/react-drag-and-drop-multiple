## React drag and drop multiple dynamic column
A multiple column draggable drag and drop

Inspired from  React beautiful dnd

Just send a JSON in the given structure to create draggable and droppable column, the column will create as the depth of the JSON

Demo: https://codesandbox.io/s/boring-benz-8epbde

### Usage: 

`npm install react-drag-and-drop-multiple-dynamic-column`

<sup>* Requires `react` as a peer dependency: `npm install react`</sup>


```
import React from "react";
import { render } from "react-dom";
import ReactMDND from "react-drag-and-drop-multiple-dynamic-column";

const dragData = [
  {
    name: "available",
    data: [
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
    ]
  },
  {
    name: "assigned",
    data: [
      {
        id: 5,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a450"
      },
      {
        id: 6,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a451"
      },
    ]
  },
  {
    name: "thirdBox",
    data: [
      {
        id: 7,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a452"
      },
      {
        id: 8,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a453"
      },
    ]
  },
];

const App = () => (
    <App 
      width="100%" 
      height={"100%"} 
      data={dragData} 
      multiple 
      draggerImg 
    />
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

### Limitations
- The multiple dragging item will not show when dragging (in the hold cursor mode)
