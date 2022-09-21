import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';

function SearchBookInput({ books, setFilteredBooks, sx, ...props }) {
  const {
    palette: { secondary },
  } = useTheme();

  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef();

  function filterBooks(value) {
    const words = value.toLowerCase().trim().split(' ');

    if (value === '') {
      setFilteredBooks(books);
    }

    setFilteredBooks(
      books.filter((value) => {
        for (let i = 0; i < words.length; i++) {
          if (
            value.title.toLowerCase().includes(words[0]) ||
            value.ISBN.toLowerCase().includes(words[0]) ||
            value.author.toLowerCase().includes(words[0])
          ) {
            return true;
          }
        }
        return false;
      }),
    );
  }

  return (
    <TextField
      ref={inputRef}
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
        filterBooks(e.target.value);
      }}
      variant="filled"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon color="secondary" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={{ padding: 0 }}
              onClick={() => {
                setSearchInput('');
                filterBooks('');
              }}
            >
              <CancelIcon fontSize="0.7rem" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        width: '100%',
        '& .MuiFilledInput-input': {
          padding: '15px 0px',
        },
        '& .MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
          {
            marginTop: '2px',
          },
        '& .MuiFilledInput-root:after': {
          borderBottomColor: secondary.main,
        },
        ...sx,
      }}
      {...props}
    />
  );
}

export default SearchBookInput;
