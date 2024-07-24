import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React, { FC } from "react";
export interface HeaderProps {}
const AppHeader: FC<HeaderProps> = () => {
  return (
    <Navbar
      classNames={{
        wrapper: "max-w-full",
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="center">222</NavbarContent>
      <NavbarContent justify="end">222</NavbarContent>
    </Navbar>
  );
};

export default AppHeader;
