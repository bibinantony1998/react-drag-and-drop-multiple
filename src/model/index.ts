export interface MainContainerProps {
    width: string;
    height: number | string;
    data: any[]
}
export interface CardProps {
    children?: React.ReactNode;
    data: {
        id: number;
        uuid: string;
    };
    inputId: string
}