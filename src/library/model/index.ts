export interface MainContainerProps {
    width: string;
    height: number | string;
    data: any[];
    multiple?: boolean;
    draggerImg?: boolean;
    title?: boolean;
    centerTitle?: boolean;
}
export interface CardProps {
    children?: React.ReactNode;
    data: {
        id: number;
        value: string;
    };
    inputId: string;
    draggerImg?: boolean;
}