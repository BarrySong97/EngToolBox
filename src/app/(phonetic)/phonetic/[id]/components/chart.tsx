"use client";
import React, { useEffect, useRef, useState } from "react";

type VowelMap = {
  [key: string]: { x: number; y: number }[];
};

const columnHeaders = ["Front", "Near front", "Central", "Near back", "Back"];
const rowHeaders = [
  "Close",
  "Near close",
  "Close mid",
  "Mid",
  "Open mid",
  "Near open",
  "Open",
];
const vowelMap: VowelMap = {
  i: [{ x: 0, y: 0 }], // Close, Front
  ["iː"]: [{ x: 0, y: 0 }], // Close, Front
  ɪ: [{ x: 1, y: 1 }], // Near close, Front
  e: [{ x: 0, y: 2 }], // Close mid, Front
  ɛ: [{ x: 0, y: 4 }], // Open mid, Front
  æ: [{ x: 0, y: 5 }], // Near open, Front
  a: [{ x: 0, y: 6 }], // Open, Front
  ["ɑː"]: [{ x: 0, y: 6 }], // Open, Front
  ə: [{ x: 2, y: 3 }], // Mid, Central
  ʌ: [{ x: 4, y: 4 }], // Open mid, Back
  u: [{ x: 4, y: 0 }], // Close, Back
  ["uː"]: [{ x: 4, y: 0 }], // Close, Back
  ʊ: [{ x: 3, y: 1 }], // Near close, Near back
  o: [{ x: 4, y: 2 }], // Close mid, Back
  ɔ: [{ x: 4, y: 3 }], // Mid, Back
  ["ɔː"]: [{ x: 4, y: 3 }], // Mid, Back
  ɑ: [{ x: 4, y: 5 }], // Near open, Back
  əʊ: [{ x: 4, y: 2 }],
  ʊə: [
    { x: 3, y: 1 },
    { x: 2, y: 3 },
  ],
  aɪ: [],
  ɔɪ: [],
  eɪ: [],
  aʊ: [],
  eə: [],
  ɪə: [],
};

interface GridProps {
  text: string;
}
interface Point {
  x: number;
  y: number;
}

interface ArrowProps {
  start: Point;
  end: Point;
}

const Arrow: React.FC<ArrowProps> = ({ start, end }) => {
  const length = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${start.x}px, ${start.y}px) rotate(${angle}deg)`,
        transformOrigin: "0 0",
      }}
      width={length}
      height="2"
    >
      <line
        x1="0"
        y1="1"
        x2={length}
        y2="1"
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="3"
          orient="auto"
          fill="black"
        >
          <polygon points="0 0, 10 3, 0 6" />
        </marker>
      </defs>
    </svg>
  );
};
export default function VowelGrid(props: GridProps) {
  const item = vowelMap[props.text];
  const isMany = item.length > 1;
  const [positions, setPositions] = useState<{ start: Point; end: Point }>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const updatePositions = () => {
    if (startRef.current && endRef.current) {
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      setPositions({
        start: {
          x: startRect.left + startRect.width / 2,
          y: startRect.top + startRect.height / 2,
        },
        end: {
          x: endRect.left + endRect.width / 2,
          y: endRect.top + endRect.height / 2,
        },
      });
    }
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, []);
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-7 gap-8 text-xs items-center justify-center ">
        {/* Column headers */}
        <Arrow start={positions.start} end={positions.end} />
        {columnHeaders.map((header, index) => (
          <div
            key={header}
            className="text-center"
            style={{
              gridColumnStart: index + 2,
              gridRowStart: 1,
              gridRowEnd: 1,
            }}
          >
            {header}
          </div>
        ))}
        <div
          className="font-semibold text-base text-center"
          ref={startRef}
          style={{
            gridColumnStart: item[0].x + 2,
            gridRowStart: item[0].y + 2,
          }}
        >
          {props.text[0]}
        </div>
        {isMany ? (
          <div
            className="font-semibold text-base text-center"
            ref={endRef}
            style={{
              gridColumnStart: item[1].x + 2,
              gridRowStart: item[1].y + 2,
            }}
          >
            {props.text[1]}
          </div>
        ) : null}

        {rowHeaders.map((header, index) => (
          <div
            key={header}
            style={{
              gridRowStart: index + 2,
              gridColumnStart: 1,
            }}
          >
            {header}
          </div>
        ))}
      </div>
    </>
  );
}
