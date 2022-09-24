import { joiResolver } from '@hookform/resolvers/joi';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { sub } from 'date-fns';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import { fetchMember } from '../helpers/redux.helper';
import updateMemberSchema from '../validations/updateMember.validation';
import BackButton from './BackButton';
import Header from './Header';
import InputDate from './InputDate';
import InputDropDown from './InputDropDown';
import InputField from './InputField';
import LoadingButton from './LoadingButton';
import PasswordInputField from './PasswordInputField';

function EditMember() {
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.member);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, trigger, watch } = useForm({
    resolver: joiResolver(updateMemberSchema),
  });
  const data = watch();

  async function updateMember() {
    const valid = await trigger([
      'firstName',
      'lastName',
      'userName',
      data.password !== '' && 'password',
      data.password !== '' && 'confirmPassword',
      'phone',
      'gender',
      'occupation',
      'birthDate',
    ]);

    if (valid) {
      setLoading(true);

      delete data.confirmPassword;
      if (!data.password || data.password === '') {
        delete data.password;
      }

      await axiosInstance
        .patch('/users/members/update', data)
        .then(async (res) => {
          await fetchMember(dispatch);
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(formatAxiosError(error));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (member) {
      setValue('firstName', member.name.split(' ')[0]);
      setValue('lastName', member.name.split(' ')[1]);
      setValue('userName', member.userName);
      setValue('phone', member.phone);
      setValue('gender', member.gender);
      setValue('occupation', member.occupation);
      setValue('birthDate', member.birthDate);
    }
  }, []);

  return (
    <Box
      sx={{
        py: { xs: '20px', sm: '30px' },
        px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
      }}
    >
      <BackButton
        to="../details"
        sx={{
          marginLeft: '-30px',
        }}
      >
        <Typography fontSize="1rem">Back</Typography>
      </BackButton>
      <Header sx={{ marginBottom: '30px' }}>Edit Member Details</Header>
      <Box
        component="form"
        action=""
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', sm: 'repeat(2, 50%)' },
          columnGap: '30px',
          rowGap: '20px',
        }}
      >
        <InputField
          label="First Name"
          name="firstName"
          fontSize="1rem"
          control={control}
        />
        <InputField
          label="Last Name"
          name="lastName"
          fontSize="1rem"
          control={control}
        />
        <InputField
          label="Username"
          name="userName"
          fontSize="1rem"
          control={control}
        />
        <PasswordInputField
          label="Password"
          name="password"
          fontSize="1rem"
          control={control}
        />
        <PasswordInputField
          label="Confirm Password"
          name="confirmPassword"
          fontSize="1rem"
          control={control}
        />
        <InputDropDown
          label="Gender"
          name="gender"
          fontSize="1rem"
          control={control}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </InputDropDown>
        <InputDropDown
          label="Occupation"
          name="occupation"
          fontSize="1rem"
          control={control}
        >
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
          fontSize="1rem"
          control={control}
          datePickerProps={{
            disableFuture: true,
            min: sub(dayjs, { years: 100 }),
          }}
        />
        <InputField
          label="Phone Number"
          name="phone"
          fontSize="1rem"
          control={control}
        />
      </Box>
      <Stack direction="row-reverse">
        <LoadingButton
          loading={loading}
          variant="contained"
          color="secondary"
          sx={{
            marginTop: '30px',
            maxWidth: '200px',
            width: '100%',
          }}
          onClick={() => {
            updateMember();
          }}
        >
          <Typography color="white">Update Details</Typography>
        </LoadingButton>
      </Stack>
    </Box>
  );
}

export default EditMember;
