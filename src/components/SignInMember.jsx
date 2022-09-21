import { joiResolver } from '@hookform/resolvers/joi';
import { Box, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import signInMemberSchema from '../validations/signInMemberSchema.validation';
import InputField from './InputField';
import LoadingButton from './LoadingButton';
import PasswordInputField from './PasswordInputField';

const CustomTypography = styled(Typography)(() => ({
  textAlign: 'center',
  lineHeight: '1.3rem',
}));

function SignInMember() {
  const {
    palette: { color, secondary },
  } = useTheme();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(signInMemberSchema),
  });

  async function signInMember(data) {
    setLoading(true);
    await axiosInstance
      .post('/users/members/login', data)
      .then((res) => {
        const { id, email, userName, name } = res.data.data.member;

        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        localStorage.setItem('type', JSON.stringify('member'));
        localStorage.setItem(
          'userData',
          JSON.stringify({ id, email, userName, name }),
        );
        toast.success(res.data.message);
        reset();
        window.location.href = '/catalog';
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
          padding: '40px',
          pb: '60px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'Center',
          gap: '10px',
          bgcolor: 'white',
          margin: '10px',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <CustomTypography variant="h3" fontWeight="bold" fontSize="1.5rem">
          Sign In
        </CustomTypography>
        <CustomTypography color={color.grey}>
          Welcome to <br />
          Kazakh National Library!
        </CustomTypography>
        <CustomTypography color={color.faintBlack} fontSize="0.7rem">
          Don&apos;t have an account?{' '}
          <Link to="/member/register">
            <span style={{ color: secondary.main }}>Sign up</span>
          </Link>
        </CustomTypography>
        <Box
          component="form"
          action=""
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            gap: '5px',
            width: '100%',
            pb: '10px',
          }}
        >
          <InputField label="Username" name="userName" control={control} />
          <PasswordInputField
            label="Password"
            name="password"
            control={control}
          />
        </Box>
        <LoadingButton loading={loading} onClick={handleSubmit(signInMember)}>
          Sign In
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default SignInMember;
