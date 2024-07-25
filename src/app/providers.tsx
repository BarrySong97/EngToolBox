"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
export default Providers;
