import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PasswordInputField({
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
  const [showPassword, setShowPassword] = useState(false);

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
              type={showPassword ? 'text' : 'password'}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {!showPassword ? (
                        <VisibilityIcon
                          sx={{ fontSize: '1rem' }}
                          color="secondary"
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ fontSize: '1rem' }}
                          color="secondary"
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
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

export default PasswordInputField;
