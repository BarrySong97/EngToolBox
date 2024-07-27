"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import React, { CSSProperties, Key, useState } from "react";
import { phoneticData } from "../../data";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export interface PhoneticItem {
  dj: string;
  kk: string;
  isVowel: boolean;
  short: string;
  isVoiceless: boolean;
}

export type PhoneticData = PhoneticItem[];

// types.ts
// PhoneticItem 组件
// App.tsx

// PhoneticItemProps 接口
interface PhoneticItemProps {
  data: PhoneticItem;
  selectKey: string;
  index: number;
}

// PhoneticItem 组件
const PhoneticItem: React.FC<PhoneticItemProps> = ({
  data,
  selectKey,
  index,
}) => {
  const allIndex = phoneticData.findIndex((item) => item === data);
  return (
    <Card
      as={Link}
      href={`/phonetic/${allIndex}?type=${selectKey}`}
      radius="sm"
      isHoverable
      isPressable
      className=" "
    >
      <CardBody>
        <div className="text-xl font-bold text-gray-800">
          {data[selectKey as keyof PhoneticItem]}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">{data.short}</div>
        </div>
      </CardBody>
    </Card>
  );
};

// PhoneticListProps 接口
interface PhoneticListProps {
  selectKey: string;
  phoneticData: PhoneticData;
}
// PhoneticList 组件
const PhoneticList: React.FC<PhoneticListProps> = ({
  phoneticData,
  selectKey,
}) => {
  return (
    <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {phoneticData.map((item, index) => (
        <PhoneticItem
          index={index}
          selectKey={selectKey}
          key={index}
          data={item}
        />
      ))}
    </div>
  );
};

// 音标数据

// 主应用组件
const List: React.FC = () => {
  const [selected, setSelected] = React.useState<Key>("dj");
  const [expandedKeys, setExpandedKeys] = useState<Record<string, string[]>>({
    dj: ["1", "2", "3"],
    kk: ["1", "2", "3"],
  });

  const Vowel = phoneticData.filter((item) => item.isVowel);
  const Voice = phoneticData
    .filter((item) => !item.isVoiceless)
    .filter((item) => !item.isVowel);
  const Voiceless = phoneticData.filter((item) => item.isVoiceless);
  const vowelCharacteristics = [
    "发音时气流不受阻碍的声音。",
    "发音时声带不振动，如 /p/、/t/。",
    "音时声带振动，如 /b/、/d/。",
  ];
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      headerClass: "!pl-0",
      label: (
        <div className="text-xl font-semibold">
          元音 - {vowelCharacteristics[0]}
        </div>
      ),
      children: (
        <PhoneticList selectKey={selected as string} phoneticData={Vowel} />
      ),
      style: panelStyle,
    },
    {
      key: "2",
      headerClass: "!pl-0",
      label: (
        <div className="text-xl font-semibold">
          清音 - {vowelCharacteristics[1]}
        </div>
      ),
      children: (
        <PhoneticList selectKey={selected as string} phoneticData={Voiceless} />
      ),
      style: panelStyle,
    },
    {
      key: "3",
      headerClass: "!pl-0",
      label: (
        <div className="text-xl font-semibold">
          浊音 - {vowelCharacteristics[2]}
        </div>
      ),
      children: (
        <PhoneticList selectKey={selected as string} phoneticData={Voice} />
      ),
      style: panelStyle,
    },
  ];
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "transparent",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Tabs
      className="mb-4"
      selectedKey={selected as string}
      onSelectionChange={setSelected}
      aria-label="Options"
    >
      <Tab key="dj" title="DJ音标">
        <Collapse
          bordered={false}
          activeKey={expandedKeys[selected as string]}
          onChange={(keys) => {
            setExpandedKeys({
              ...expandedKeys,
              [selected as string]: keys as string[],
            });
          }}
          style={{ background: "transparent", paddingLeft: 0 }}
          items={getItems(panelStyle)}
        />
      </Tab>
      <Tab key="kk" title="KK音标">
        <Collapse
          bordered={false}
          activeKey={expandedKeys[selected as string]}
          onChange={(keys) => {
            setExpandedKeys({
              ...expandedKeys,
              [selected as string]: keys as string[],
            });
          }}
          style={{ background: "transparent" }}
          items={getItems(panelStyle)}
        />
      </Tab>
    </Tabs>
  );
};

export default List;
