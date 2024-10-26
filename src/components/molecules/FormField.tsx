import { FieldError, UseFormRegister } from "react-hook-form/dist/types";
import { ErrorMessage } from "./Error";
import { FormInput } from "../../types/form";
import { ReactNode } from "react";

interface Props {
  name: "firstName" | "numberOfPeople" | "dayOfBooking" | "email" | "phone";
  label: string;
  errors: FieldError | undefined;
  children: ReactNode;
}

export const FormField = (props: Props) => {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>

      {props.children}

      {props.errors?.message && <ErrorMessage message={props.errors.message} />}
    </>
  );
};
