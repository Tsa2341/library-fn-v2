import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from './LoadingButton';
import PickUpFailedModal from './PickUpFailedModal';

function BookCard({ book, sx, ...props }) {
  const { cover, title, author } = book;
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const navigate = useNavigate();

  async function pickBook() {
    if (!localStorage.getItem('token')) {
      return setOpenMessageModal(true);
    } else {
      navigate(`/catalog/book/${book.id}`);
    }
  }

  return (
    <>
      <Card sx={{ width: '300px', height: '400px', ...sx }} {...props}>
        <CardMedia
          component="img"
          src={cover}
          alt={title}
          sx={{
            width: '100%',
            height: '70%',
          }}
        />
        <CardContent sx={{ width: '100%' }}>
          <Typography
            fontSize="1rem"
            textAlign="center"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          <Typography
            fontSize="0.75rem"
            textAlign="center"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              whiteSpace: 'nowrap',
            }}
          >
            By {author}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0, width: '100%' }}>
          <LoadingButton
            color="primary"
            loading={false}
            sx={{ borderRadius: 0, marginX: 'auto' }}
            onClick={pickBook}
          >
            <Typography color="white">Pick</Typography>
          </LoadingButton>
        </CardActions>
      </Card>
      <PickUpFailedModal
        open={openMessageModal}
        setOpen={setOpenMessageModal}
      />
    </>
  );
}

export default BookCard;
