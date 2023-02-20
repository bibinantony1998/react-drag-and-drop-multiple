export interface MainContainerProps {
    width: string;
    height: number | string;
    data: any[];
    multiple?: boolean;
    draggerImg?: boolean;
    title?: boolean;
}
export interface CardProps {
    children?: React.ReactNode;
    data: {
        id: number;
        uuid: string;
    };
    inputId: string;
    draggerImg?: boolean;
}