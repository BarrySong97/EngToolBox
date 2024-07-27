import { Page } from "@/components/page-container";
import React, { FC } from "react";
import Basic from "./components/basic-info";
import Function from "./components/function";
export interface PhoneticProps {
  params: { id: string };
}
const Phonetic: FC<PhoneticProps> = ({ params }) => {
  const id = params.id;

  return (
    <Page className="max-w-full p-6 flex bg-[#F8FAFC] h-[calc(100vh-64px)]">
      <div className="w-[600px] h-full p-6 ">
        <Basic index={id} />
      </div>
      <div className="bg-white flex-1 h-full">
        <Function />
      </div>
    </Page>
  );
};

export default Phonetic;
