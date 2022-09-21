import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import { getAddBookaction } from '../redux/slices/addBook.slice';
import BackButton from './BackButton';
import DeleteBookModal from './DeleteBookModal';
import Header from './Header';

const CustomButton = ({ disabled, children, sx, ...props }) => {
  const {
    palette: { color },
  } = useTheme();

  return (
    <Button
      variant="contained"
      disabled={disabled}
      sx={{
        maxWidth: '300px',
        width: '100%',
        border: `1px solid ${color.grey}`,
        marginBottom: '10px',
        ...sx,
      }}
      {...props}
    >
      <Typography color="white">{children}</Typography>
    </Button>
  );
};

const ActionButton = ({ children, sx, ...props }) => {
  const {
    palette: { color },
  } = useTheme();

  return (
    <Button
      variant="contained"
      color="error"
      sx={{
        maxWidth: '150px',
        width: '100%',
        ...sx,
      }}
      {...props}
    >
      <Typography fontSize="0.7rem" color="white">
        {children}
      </Typography>
    </Button>
  );
};

const Detail = ({ title, children, ...props }) => {
  return (
    <Stack direction="row" gap="10px" alignItems="center">
      <Typography
        fontSize="1.5rem"
        sx={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
      >
        {title} :{' '}
      </Typography>
      <Typography
        fontSize="1rem"
        mt="10px"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
};

function BookDetails() {
  const {
    palette: { color },
  } = useTheme();
  const { id } = useParams();
  const { books } = useSelector((state) => state.oneBook);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const userType = JSON.parse(localStorage.getItem('type'));

  const book = books[id];

  let checkedOut;
  let reserved;

  if (userType === 'member') {
    checkedOut = book.check_out_books.length !== 0;
    reserved = book.book_reservations.length !== 0;
  }

  return (
    <>
      <Box
        sx={{
          py: { xs: '20px', sm: '30px' },
          px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
        }}
      >
        <BackButton
          sx={{
            marginLeft: '-30px',
          }}
        >
          <Typography fontSize="1rem">Back</Typography>
        </BackButton>
        <Header sx={{ marginBottom: '30px' }}>{book.title}</Header>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '100%', sm: 'auto 1fr' },
            gridTemplateRows: 'auto auto',
            gridAutoRows: 'auto',
            rowGap: '20px',
            columnGap: '50px',
          }}
        >
          <Box
            sx={{
              gridColumn: 1,
              gridRow: { sm: 1, md: ' 1 / span 2' },
              display: 'flex',
              flexFlow: 'column nowrap',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={book.cover}
              alt={book.title}
              sx={{
                objectFit: 'cover',
                maxWidth: '350px',
                width: '100%',
                height: '470px',
                marginBottom: '30px',
                marginX: 'auto',
                border: `1px solid ${color.grey}`,
              }}
            />
            {userType === 'member' && (
              <>
                <CustomButton
                  disabled={checkedOut}
                  onClick={() => {
                    navigate('../check-out');
                  }}
                >
                  {checkedOut
                    ? 'Not available to Check out'
                    : 'Available to Check out'}
                </CustomButton>
                <>
                  {checkedOut && (
                    <CustomButton
                      disabled={reserved}
                      onClick={() => {
                        navigate('../reserve');
                      }}
                    >
                      {!reserved
                        ? 'Available to Reserve'
                        : 'Not available to Reserve'}
                    </CustomButton>
                  )}
                </>
              </>
            )}
            {userType === 'librarian' && (
              <Stack direction="row" gap="15px" justifyContent="space-around">
                <ActionButton
                  onClick={() => {
                    navigate('/catalog/add-book');
                    dispatch(getAddBookaction(book));
                  }}
                >
                  Edit Book
                </ActionButton>
                <ActionButton onClick={() => setOpenDeleteModal(true)}>
                  Delete Book
                </ActionButton>
              </Stack>
            )}
          </Box>
          <Box
            sx={{
              gridColumn: { xs: 1, sm: 2 },
              gridRow: { xs: 2, sm: 1 },
              display: 'flex',
              flexFlow: 'column nowrap',
            }}
          >
            <Detail title="ISBN">{book.ISBN}</Detail>
            <Detail title="Written by">{book.author}</Detail>
            <Detail title="Publisher">{book.publisher}</Detail>
            <Detail title="Language">
              {capitalizeFirstLetter(book.laguage)}
            </Detail>
            <Detail title="Pages">{book.pages}</Detail>
            <Detail title="Category">
              {capitalizeFirstLetter(book.category)}
            </Detail>
          </Box>
          <Box
            sx={{
              gridColumn: { xs: 1, sm: '1 / span 2', md: 2 },
              gridRow: { xs: '3', sm: '2' },
              display: 'flex',
              flexFlow: 'column nowrap',
              gap: '10px',
            }}
          >
            <Typography
              fontSize="1.5rem"
              sx={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
            >
              About :
            </Typography>
            <Typography
              fontSize="1rem"
              sx={{
                wordBreak: 'break-word',
              }}
            >
              {book.about}
            </Typography>
          </Box>
        </Box>
      </Box>
      <DeleteBookModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        book={book}
      />
    </>
  );
}

export default BookDetails;
