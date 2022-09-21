import { joiResolver } from '@hookform/resolvers/joi';
import { Box, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import registerMemberSchema from '../validations/registerMember.validation';
import InputField from './InputField';
import LoadingButton from './LoadingButton';
import PasswordInputField from './PasswordInputField';

const CustomTypography = styled(Typography)(() => ({
  textAlign: 'center',
  lineHeight: '1.3rem',
}));

function RegisterMember() {
  const {
    palette: { color, secondary },
  } = useTheme();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(registerMemberSchema),
  });

  async function registerMember(data) {
    setLoading(true);
    delete data.confirmPassword;
    await axiosInstance
      .post('/users/members/register', data)
      .then((res) => {
        reset();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(formatAxiosError(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Box
      sx={{
        backgroundImage: `url('/images/member_sign_bg.png')`,
        backgroundColor: 'rgba(255, 255, 255, 0.44)',
        backgroundBlendMode: 'overlay',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'Center',
          gap: '10px',
          bgcolor: 'white',
          margin: '10px',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <CustomTypography variant="h3" fontWeight="bold" fontSize="1.5rem">
          Sign Up
        </CustomTypography>
        <CustomTypography color={color.grey}>
          Welcome to <br />
          Kazakh National Library!
        </CustomTypography>
        <CustomTypography color={color.faintBlack} fontSize="0.7rem">
          Already have an account?{' '}
          <Link to="/member/signIn">
            <span style={{ color: secondary.main }}>Sign in</span>
          </Link>
        </CustomTypography>
        <Box
          component="form"
          action=""
          sx={{
            width: '100%',
            display: 'grid',
            columnGap: '10px',
            rowGap: '5px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          }}
        >
          <InputField label="First Name" name="firstName" control={control} />
          <InputField label="Last Name" name="lastName" control={control} />
          <InputField label="Email" name="email" control={control} />
          <InputField label="Username" name="userName" control={control} />
          <PasswordInputField
            label="Password"
            name="password"
            control={control}
          />
          <PasswordInputField
            label="Confirm Password"
            name="confirmPassword"
            control={control}
          />
          <InputField label="Phone Number" name="phone" control={control} />
        </Box>
        <LoadingButton loading={loading} onClick={handleSubmit(registerMember)}>
          Sign up
        </LoadingButton>
        <CustomTypography
          color={color.faintBlack}
          fontSize="0.7rem"
          maxWidth="300px"
        >
          By clicking the &quot;Sign Up&quot; button, you are creating an
          account, and you agree to the Terms of Use.
        </CustomTypography>
      </Box>
    </Box>
  );
}

export default RegisterMember;
