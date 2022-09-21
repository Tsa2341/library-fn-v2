import { Box, Modal, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import { getAllMembersAction } from '../redux/slices/allMembers.slice';
import LoadingButton from './LoadingButton';

function MemberShipStatusModal({
  open,
  setOpen,
  status,
  member,
  sx,
  ...props
}) {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.allMembers);
  const [loading, setLoading] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  // remove the owner of the tobe changed status
  const noMember = members.filter((mem) => {
    if (mem.id === member.id) {
      return false;
    }
    return true;
  });

  async function changeStatus() {
    setLoading(true);
    await axiosInstance
      .patch(`/users/members/${member.id}/status`, { status })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(
          getAllMembersAction([
            { ...member, card: res.data.data.card },
            ...noMember,
          ]),
        );
        handleClose();
      })
      .catch((error) => {
        toast.error(formatAxiosError(error));
        handleClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          margin: '15px',
          position: 'relative',
          backgroundColor: '#FFCBCB',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box sx={{ width: '100%', padding: '60px', pt: '80px' }}>
          <Typography
            fontSize={{ xs: '1.5rem', md: '2rem' }}
            textAlign="center"
          >
            Confirm {!status ? 'cancelation' : 'Activation'} of the{' '}
            {member.name}&apos;s membership
          </Typography>
        </Box>
        <Stack
          direction="row"
          padding="10px 20px"
          justifyContent="space-around"
          gap="20px"
        >
          <LoadingButton
            color="secondary"
            sx={{ maxWidth: '100px' }}
            onClick={() => {
              changeStatus();
            }}
            loading={loading}
          >
            <Typography color="white">Yes</Typography>
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="customWhite"
            sx={{ maxWidth: '100px', width: '100%' }}
            onClick={() => {
              handleClose();
            }}
            disabled={loading}
          >
            <Typography>No</Typography>
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
}

export default MemberShipStatusModal;
