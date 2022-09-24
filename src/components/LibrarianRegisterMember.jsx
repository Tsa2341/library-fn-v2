import { joiResolver } from '@hookform/resolvers/joi';
import {
  Box,
  MenuItem,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { sub } from 'date-fns';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import { fetchAllMembers } from '../helpers/redux.helper';
import registerMemberSchema from '../validations/registerMember.validation';
import InputDate from './InputDate';
import InputDropDown from './InputDropDown';
import InputField from './InputField';
import LoadingButton from './LoadingButton';
import PasswordInputField from './PasswordInputField';

const CustomTypography = styled(Typography)(() => ({
  textAlign: 'center',
  lineHeight: '1.3rem',
}));

function LibrarianRegisterMember() {
  const {
    palette: { color, secondary },
  } = useTheme();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(registerMemberSchema),
  });

  async function registerMember(data) {
    setLoading(true);
    delete data.confirmPassword;
    await axiosInstance
      .post('/users/members/register/librarian', data)
      .then(async (res) => {
        await fetchAllMembers(dispatch);
        reset();
        toast.success(res.data.message);
        navigate('..');
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
          <InputField label="Username" name="userName" control={control} />
          <InputField label="Email" name="email" control={control} />
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
          <InputDropDown label="Gender" name="gender" control={control}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </InputDropDown>
          <InputDropDown label="Occupation" name="occupation" control={control}>
            <MenuItem value="Accounting & Consulting">
              Accounting & Consulting
            </MenuItem>
            <MenuItem value="Admin Support">Admin Support</MenuItem>
            <MenuItem value="Customer Service">Customer Service</MenuItem>
            <MenuItem value="Data Science & Analytics">
              Data Science & Analytics
            </MenuItem>
            <MenuItem value="Design & Creative">Design & Creative</MenuItem>
            <MenuItem value="Engineering & Architecture">
              Engineering & Architecture
            </MenuItem>
            <MenuItem value="IT & Networking">IT & Networking</MenuItem>
            <MenuItem value="Legal">Legal</MenuItem>
            <MenuItem value="Sales & Marketing">Sales & Marketing</MenuItem>
            <MenuItem value="Web, Mobile & Software Dev">
              Web, Mobile & Software Dev
            </MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Writing">Writing</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
          </InputDropDown>
          <InputDate
            label="Date of birth"
            name="birthDate"
            control={control}
            datePickerProps={{
              disableFuture: true,
              min: sub(dayjs, { years: 100 }),
            }}
          />
          <InputField label="Phone Number" name="phone" control={control} />
        </Box>
        <Stack
          direction="row"
          gap="10px"
          justifyContent="space-between"
          width="100%"
        >
          <LoadingButton
            color="error"
            onClick={() => {
              navigate('..');
            }}
            disabled={loading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit(registerMember)}
          >
            Sign up
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default LibrarianRegisterMember;
