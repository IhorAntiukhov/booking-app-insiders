import * as zod from "zod";
import formErrorMessages from "../constants/form-error-messages";

const zodObject = {
  name: zod.string(formErrorMessages.fieldRequired),
  email: zod.email({
    error: (issue) =>
      !issue.input
        ? formErrorMessages.fieldRequired
        : formErrorMessages.invalidEmail,
  }),
  password: zod
    .string(formErrorMessages.fieldRequired)
    .nonempty(formErrorMessages.fieldRequired)
    .min(6, formErrorMessages.passwordTooShort),
  confirmPassword: zod
    .string(formErrorMessages.fieldRequired)
    .nonempty(formErrorMessages.fieldRequired),
};

export const signUpFormSchema = zod
  .object(zodObject)
  .refine((data) => data.password === data.confirmPassword, {
    error: formErrorMessages.passwordsUnmatch,
    path: ["confirmPassword"],
  });

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
