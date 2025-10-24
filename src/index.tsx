import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DragDropComponent from "./lib";
import "./demo.css";

// Example 1: Rich data structure with custom rendering
const data = [
  {
    id: "1",
    name: "Todo",
    data: [
      {
        id: "1",
        title: "Design System",
        description: "Create component library",
        priority: "high",
        assignee: "John Doe",
        dueDate: "2025-11-01",
      },
      {
        id: "2",
        title: "API Integration",
        description: "Connect backend endpoints",
        priority: "medium",
        assignee: "Jane Smith",
        dueDate: "2025-11-05",
      },
      {
        id: "3",
        title: "Testing",
        description: "Write unit tests",
        priority: "low",
        assignee: "Bob Johnson",
        dueDate: "2025-11-10",
      },
    ],
  },
  {
    id: "2",
    name: "In Progress",
    data: [
      {
        id: "5",
        title: "Authentication",
        description: "Implement OAuth2",
        priority: "high",
        assignee: "Alice Brown",
        dueDate: "2025-10-28",
      },
      {
        id: "6",
        title: "Database Schema",
        description: "Design tables",
        priority: "medium",
        assignee: "Charlie Wilson",
        dueDate: "2025-10-30",
      },
    ],
  },
  {
    id: "3",
    name: "Done",
    data: [
      {
        id: "7",
        title: "Project Setup",
        description: "Initialize repository",
        priority: "high",
        assignee: "John Doe",
        dueDate: "2025-10-20",
      },
      {
        id: "8",
        title: "Requirements",
        description: "Gather specifications",
        priority: "medium",
        assignee: "Jane Smith",
        dueDate: "2025-10-22",
      },
    ],
  },
];

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

// Custom render function - users can render ANYTHING they want!
const renderTaskItem = (item: any) => {
  const priorityColors = {
    high: "#ff4757",
    medium: "#ffa502",
    low: "#2ed573",
  };

  return (
    <div
      style={{
        padding: "12px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "white",
        marginBottom: "8px",
        cursor: "move",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
          {item.title}
        </h3>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "11px",
            fontWeight: "600",
            color: "white",
            backgroundColor:
              priorityColors[item.priority as keyof typeof priorityColors],
          }}
        >
          {item.priority.toUpperCase()}
        </span>
      </div>
      <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#666" }}>
        {item.description}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#999",
        }}
      >
        <span>👤 {item.assignee}</span>
        <span>📅 {item.dueDate}</span>
      </div>
    </div>
  );
};

// Now using native HTML5 drag-and-drop - fully compatible with StrictMode!
root.render(
  <StrictMode>
    <DragDropComponent
      onChange={(data) => {
        console.log("Data changed:", data);
        // Users can handle state updates, API calls, etc.
      }}
      width="100%"
      height={"100%"}
      data={data}
      multiple
      title
      centerTitle
      renderItem={renderTaskItem} // 🎉 Custom render function!
    />
  </StrictMode>
);
