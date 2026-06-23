"use client";

import React, { HTMLInputTypeAttribute } from "react";
import { Field, FieldDescription, FieldError } from "./field";
import { Input } from "./input";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<
  T extends FieldValues,
> extends React.ComponentProps<"input"> {
  name: Path<T>;
  control: Control<T, unknown, T>;
  placeholder: string;
  description: string;
  type: HTMLInputTypeAttribute;
  errors: FieldErrors<T>;
}

export default function FormInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  description,
  type,
  errors,
}: FormInputProps<T>) {
  const isError = errors[name]?.message;

  return (
    <Field data-invalid={isError}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            onInput={field.onChange}
          />
        )}
      />

      {isError ? (
        <FieldError>{errors[name]?.message?.toString()}</FieldError>
      ) : (
        <FieldDescription>{description}</FieldDescription>
      )}
    </Field>
  );
}
