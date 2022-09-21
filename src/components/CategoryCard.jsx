import {
  Button,
  Card,
  CardMedia,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryCard({ book, sx, ...props }) {
  const {
    palette: { common },
  } = useTheme();
  const navigate = useNavigate();
  const params = new URLSearchParams();
  params.set('category', book.category);

  return (
    <Card
      sx={{
        maxWidth: '200px',
        width: '100%',
        height: '250px',
        marginX: '10px',
        position: 'relative',
        flexShrink: 0,
        scrollSnapAlign: 'center',
        ...sx,
      }}
      {...props}
    >
      <CardMedia
        component="img"
        width="100%"
        height="100%"
        image={book.cover}
        alt={book.title}
      />
      <Paper
        sx={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          padding: '20px',
          position: 'absolute',
        }}
      >
        <Button
          variant="contained"
          color="customWhite"
          sx={{
            width: '100%',
            padding: '7px',
            mt: '25px',
          }}
          onClick={() => {
            navigate(`/catalog/category?${params}`);
          }}
        >
          <Typography fontWeight="bold" textAlign="center">
            {book.category.toUpperCase()}
          </Typography>
        </Button>
      </Paper>
    </Card>
  );
}

export default CategoryCard;
