"use client";
import { phoneticData } from "@/app/(phonetic)/data";
import { Card, CardBody } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import VowelChart from "./chart";
export interface FunctionProps {
  index: string;
}
const Basic: FC<FunctionProps> = ({ index }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const item = phoneticData[Number(index)];
  const text = item[type as keyof typeof item];
  return (
    <div className="flex flex-col justify-between h-full items-center">
      <Card className="relative mx-auto w-48 h-48 shadow-slate-200 ">
        <CardBody className="items-center justify-center">
          <div className="text-slate-800 font-bold text-7xl">{text}</div>
        </CardBody>
      </Card>
      {text ? <VowelChart text={text as string} /> : null}
    </div>
  );
};

export default Basic;
