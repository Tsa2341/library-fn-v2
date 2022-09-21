import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from '../helpers/error.helper';
import createBookSchema from '../validations/addBook.validation';
import BackButton from './BackButton';
import Header from './Header';
import InputField from './InputField';
import LoadingButton from './LoadingButton';

function AddBook() {
  const { book } = useSelector((state) => state.addBook);
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState(undefined);
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: joiResolver(createBookSchema),
  });

  async function addBook(data) {
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    if (cover) {
      formData.append('cover', cover);
    }

    if (!book) {
      await axiosInstance
        .post('/books', formData)
        .then((res) => {
          toast.success(res.data.message);
          reset();
        })
        .catch((error) => {
          toast.error(formatAxiosError(error));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      await axiosInstance
        .patch(`/books/${book.id}`, formData)
        .then((res) => {
          toast.success(res.data.message);
          reset();
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
    if (book) {
      setValue('title', book.title);
      setValue('ISBN', book.ISBN);
      setValue('publisher', book.publisher);
      setValue('about', book.about);
      setValue('author', book.author);
      setValue('category', book.category);
      setValue('language', book.language);
      setValue('pages', book.pages);
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
        sx={{
          marginLeft: '-30px',
        }}
      >
        <Typography fontSize="1rem">Back</Typography>
      </BackButton>
      <Header sx={{ marginBottom: '30px' }}>
        {!book ? 'Add book' : 'Edit Book'}
      </Header>
      <Box
        component="form"
        action=""
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', sm: 'repeat(2, auto)' },
          columnGap: '30px',
          rowGap: '20px',
        }}
      >
        <InputField
          label="Title"
          name="title"
          control={control}
          fontSize="1rem"
        />
        <InputField
          label="ISBN"
          name="ISBN"
          control={control}
          fontSize="1rem"
        />
        <InputField
          label="Publisher"
          name="publisher"
          control={control}
          fontSize="1rem"
        />
        <InputField
          label="Language"
          name="language"
          control={control}
          fontSize="1rem"
        />
        <InputField
          label="Author"
          name="author"
          control={control}
          fontSize="1rem"
        />
        <InputField
          label="Number of pages"
          name="pages"
          control={control}
          fontSize="1rem"
        />
        <InputField
          label="Category"
          name="category"
          control={control}
          fontSize="1rem"
        />
        <Stack>
          <Typography mb="5px">Add book cover</Typography>
          <input
            onChange={(e) => {
              setCover(e.target.files[0]);
            }}
            type="file"
            name="file-upload"
            id="file-upload"
            style={{ width: 0, height: 0 }}
          />
          <Button
            component="label"
            htmlFor="file-upload"
            variant="contained"
            color="secondary"
            sx={{
              maxWidth: '200px',
              width: '100%',
            }}
          >
            <Typography fontSize="0.75rem">Add cover</Typography>
          </Button>
        </Stack>
      </Box>
      <InputField
        label="About"
        name="about"
        mt="20px"
        inputProps={{
          multiline: true,
          minRows: 4,
        }}
        control={control}
        fontSize="1rem"
      />
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
          onClick={handleSubmit(addBook)}
        >
          <Typography>{!book ? 'Add book' : 'Edit Book'}</Typography>
        </LoadingButton>
      </Stack>
    </Box>
  );
}

export default AddBook;
