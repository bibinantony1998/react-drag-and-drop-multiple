import { ReactNode } from "react";

export interface MainContainerProps {
  width: string;
  height: number | string;
  data: any[];
  multiple?: boolean;
  draggerImg?: boolean;
  title?: boolean;
  centerTitle?: boolean;
  onChange(data: any[]): void;

  /**
   * Custom render function for each drag item
   * @param item - The data item to render
   * @param index - Index of the item in its list
   * @param listId - ID of the list containing this item
   * @returns React element to render inside the draggable wrapper
   */
  renderItem?: (item: any, index: number, listId: string) => ReactNode;

  /**
   * @deprecated Use renderItem instead
   * Legacy prop for backward compatibility
   */
  children?: any;
}

export interface CardProps {
  children?: React.ReactNode;
  data: any;
  inputId: string;
  draggerImg?: boolean;
}
