import { Box, Select, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputDropDown({
  label,
  name,
  control,
  fontSize = '0.7rem',
  inputProps,
  children,
  ...props
}) {
  const {
    palette: { secondary },
  } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '100%',
        ...props,
      }}
    >
      <Typography htmlFor={name} fontSize="0.7rem" pb="3px">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <>
            <Select
              variant="outlined"
              value={value}
              onChange={onChange}
              placeholder="Choose title"
              sx={{
                fontSize: '1rem',
                lineHeight: '1rem',
                borderRadius: '5px',
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: secondary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '7px 10px',
                  fontSize: `${fontSize}`,
                },
              }}
              {...inputProps}
            >
              {children}
            </Select>
            <Typography fontSize="0.7rem" color="error.light">
              {errors[name]
                ? errors[name].message.replace(/['"`]/gi, '')
                : undefined}
            </Typography>
          </>
        )}
      />
    </Box>
  );
}

export default InputDropDown;
