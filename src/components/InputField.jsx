import { Box, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputField({
  label,
  name,
  control,
  fontSize = '0.7rem',
  inputProps,
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
            <TextField
              variant="outlined"
              value={value}
              onChange={onChange}
              sx={{
                borderRadius: '30px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '5px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '7px 10px',
                  fontSize: `${fontSize}`,
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: secondary.main,
                  },
                },
              }}
              {...inputProps}
            />
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

export default InputField;
