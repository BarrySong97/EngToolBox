import { cn } from "@/lib/utils";
import type { JSX } from "react";

export const Page: Component<{
  as?: keyof JSX.IntrinsicElements | Component;
}> = ({ children, className, as: As = "main" }) => {
  return <As className={cn("max-w-7xl mx-auto", className)}>{children}</As>;
};
