import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputProps } from "./types";

export default function Input({
  name,
  label,
  type,
  icon,
  shrink = true,
  ...props
}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          InputLabelProps={{
            shrink,
          }}
          InputProps={{
            startAdornment: icon?.left,
            endAdornment: icon?.right,
          }}
          fullWidth
          autoComplete="off"
          {...props}
        />
      )}
    />
  );
}
