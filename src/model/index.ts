export interface MainContainerProps {
    width: string;
    height: number | string;
}
export interface CardProps {
    children?: React.ReactNode;
    data: {
        id: number;
        uuid: string;
    };
    inputId: string
}