import { FieldProps } from "formik";
import * as React from "react";
import { Input } from "./ui/input";

export const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps): JSX.Element => {
  const errorText = touched[field.name] && errors[field.name];

  return (
    <>
      <Input {...field} {...props} />
      <small>{errorText && errorText.toString()}</small>
    </>
  );
};
