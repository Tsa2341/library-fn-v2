import { Box, useTheme } from '@mui/material';
import React from 'react';
import CategoryCard from './CategoryCard';

function Category({ books, sx, ...props }) {
  const {
    palette: { primary },
  } = useTheme();
  const categoryArray = books.map((book) => book.category.toLowerCase());

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        height: 'max-content',
        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
        ...sx,
      }}
      {...props}
    >
      {books
        .filter(
          (book, i, arr) =>
            categoryArray.indexOf(book.category.toLowerCase()) === i,
        )
        .map((book) => (
          <CategoryCard key={book.ISBN} book={book} />
        ))}
    </Box>
  );
}

export default Category;
