import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/bento";
import {
  HugeiconsCharacterPhonetic,
  IcRoundTransform,
  MaterialSymbolsBook2,
} from "@/icon/landing";
import { VelocityScroll } from "./components/scroll-text";

const features = [
  {
    Icon: IcRoundTransform,
    name: "语法分析工具",
    description:
      "使用AI快速分析出句子的结构，以及如何通过语法结构理解句子的含义",
    href: "/",
    cta: "用用",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: MaterialSymbolsBook2,
    name: "语法小书",
    description: "英语基础语法知识，包括词类、句型、句子成分等",
    href: "/",
    cta: "看看",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    content: (
      <>
        <VelocityScroll
          text="谓语动词，时态，虚拟语气，"
          default_velocity={4}
          className="font-display text-center text-3xl font-semibold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        />
      </>
    ),
  },
  {
    Icon: HugeiconsCharacterPhonetic,
    name: "音标速查表",
    description:
      "快速查询KK音标和国际音标，基础读法，例词，绕口令训练口腔肌肉。",
    href: "/",
    cta: "查看",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    // content: (
    //   <>
    //     <div className="relative">
    //       {/* Top blur */}
    //       <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent"></div>

    //       {/* Image */}
    //       <img
    //         src="/landing/vowel-chart.png"
    //         alt="Vowel Chart"
    //         className="w-full h-24 object-cover"
    //       />

    //       {/* Bottom blur */}
    //       <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
    //     </div>
    //   </>
    // ),
  },
];

export default function BentoDemo() {
  return (
    <div className="lg:h-screen xl:overflow-hidden flex justify-center items-center p-6 lg:p-0">
      <BentoGrid className="lg:grid-rows-3 lg:grid-cols-2 max-w-7xl ">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
