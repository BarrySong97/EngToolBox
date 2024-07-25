import { cn } from "@/lib/utils";
import type { JSX } from "react";

export const Page: Component<{
  as?: keyof JSX.IntrinsicElements | Component;
}> = ({ children, className, as: As = "main" }) => {
  return <As className={cn("p-6", className)}>{children}</As>;
};
