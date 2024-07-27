"use client";
import { cn } from "@/lib/utils";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
export interface HeaderProps {}
const AppHeader: FC<HeaderProps> = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Navbar
      className={cn({
        "bg-transparent lg:backdrop-saturate-0 lg:backdrop-blur-none":
          pathname === "/",
      })}
      classNames={{
        wrapper: pathname.includes("phonetic/")
          ? "max-w-full "
          : "max-w-7xl px-0",
      }}
    >
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl">
          ETB - 英语学习工具箱
        </Link>
      </NavbarBrand>
      {/* <NavbarContent justify="center">英语工具箱</NavbarContent> */}
      <NavbarContent justify="end" className="">
        <div
          style={{
            fontSize: "0.85rem",
            color: "#666",
            marginRight: "1rem",
          }}
        >
          Made by{" "}
          <a
            href="https://barrysong4real.cc/"
            target="_blank"
            className="underline"
          >
            4Real
          </a>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default AppHeader;
