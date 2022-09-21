import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import BackButton from './BackButton';
import BookCard from './BookCard';
import Header from './Header';

function CategoryBook() {
  const { books } = useSelector((state) => state.allBooks);

  let [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <Box
      sx={{
        py: { xs: '20px', sm: '30px' },
        px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
        gap: { xs: '6px', md: '10px' },
        position: 'relative',
      }}
    >
      <BackButton
        sx={{
          marginLeft: '-30px',
        }}
      >
        <Typography fontSize="1rem">Back</Typography>
      </BackButton>
      <Header fontWeight="bold">{capitalizeFirstLetter(category)} Books</Header>
      <Box
        sx={{
          py: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}
      >
        {books &&
          books
            .filter((book) => book.category === category)
            .map((book) => {
              return (
                <BookCard
                  key={book.ISBN}
                  book={book}
                  sx={{ marginX: 'auto' }}
                />
              );
            })}
      </Box>
    </Box>
  );
}

export default CategoryBook;
