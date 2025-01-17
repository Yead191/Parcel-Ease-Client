import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";

const Drawer = ({ children, className, ...props }) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content
        className={`${clsx(
          "fixed right-0 top-0 h-full bg-white shadow-lg z-50",
          className
        )}`}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const DrawerTrigger = Dialog.Trigger;
const DrawerContent = Dialog.Content;

export { Drawer, DrawerTrigger, DrawerContent };
