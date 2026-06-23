import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import IconButton from "./icon-button";

interface SharedDialogProps extends React.PropsWithChildren {
  title: string;
}

interface TextButtonDialogProps extends SharedDialogProps {
  type: "text";
  triggerLabel: string;
}

interface IconButtonDialogProps extends SharedDialogProps {
  type: "icon";
  icon: React.ReactNode;
}

type FormDialogProps = TextButtonDialogProps | IconButtonDialogProps;

export default function FormDialog(props: FormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.type === "text" ? (
          <Button>{props.triggerLabel}</Button>
        ) : (
          <IconButton>{props.icon}</IconButton>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>

        {props.children}
      </DialogContent>
    </Dialog>
  );
}
