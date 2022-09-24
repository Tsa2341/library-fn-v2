export function formatAxiosError(error) {
  console.log(error, 'axios error');
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message
  );
}
