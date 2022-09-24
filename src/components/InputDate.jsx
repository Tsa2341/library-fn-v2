import { Box, TextField, Typography, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputDate({
  label,
  name,
  control,
  fontSize = '0.7rem',
  inputProps,
  datePickerProps,
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
        defaultValue={dayjs().toISOString()}
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={(e) => {
                onChange(e.toISOString());
              }}
              {...datePickerProps}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
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
                  {...params}
                />
              )}
            />

            <Typography fontSize="0.7rem" color="error.light">
              {errors[name]
                ? errors[name].message.replace(/['"`]/gi, '')
                : undefined}
            </Typography>
          </LocalizationProvider>
        )}
      />
    </Box>
  );
}

export default InputDate;
