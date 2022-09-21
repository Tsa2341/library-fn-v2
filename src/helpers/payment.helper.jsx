import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { formatAxiosError } from './error.helper';

export async function getFine(onSuccess) {
  await axiosInstance
    .get('/payments/fine')
    .then((res) => {
      if (onSuccess) {
        onSuccess(parseInt(res.data.data.fine, 10));
      }
    })
    .catch((error) => {
      toast.success(formatAxiosError(error));
    });
}
