import React from "react";

type Props = {
  children?: React.ReactNode;
  data: {
    id: number;
    uuid: string;
  };
};

const Card = ({ data }: Props) => {
  return (
    <div className="shadow-lg flex w-full cursor-pointer">
      <div className="rounded-l-md p-5 w-36 bg-blue-200">
      </div>

      <main className="py-7 px-5 rounded-r-md w-full bg-white">
        <span className="flex flex-row justify-between">
          <h4 className="uppercase font-normal">{data.id}</h4>
        </span>
      </main>
    </div>
  );
};

export default Card;
