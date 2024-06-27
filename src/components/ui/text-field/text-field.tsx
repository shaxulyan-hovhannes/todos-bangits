import { FC, ChangeEvent, ComponentPropsWithoutRef } from "react";

import { TextField } from "@mui/material";

import { MAIN_THEME_COLOR } from "constants/common";

interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: string | false | undefined;
  multiline?: boolean;
  type?: string;
}

const MUITextField: FC<TextFieldProps> = ({
  name = "",
  label = "",
  value = "",
  onChange = () => {},
  error = false,
  helperText = "",
  multiline = false,
  type = "text",
}) => {
  return (
    <TextField
      type={type}
      multiline={multiline}
      fullWidth
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: MAIN_THEME_COLOR,
          },
          "&:hover fieldset": {
            borderColor: MAIN_THEME_COLOR,
          },
          "&.Mui-focused fieldset": {
            borderColor: MAIN_THEME_COLOR,
          },
        },
      }}
    />
  );
};

export default MUITextField;
