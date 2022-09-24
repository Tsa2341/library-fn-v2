import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import {
  allMembersErrorAction,
  getAllMembersAction,
  loadingGetAllMembersAction,
} from '../redux/slices/allMembers.slice';
import {
  getMemberAction,
  loadingGetMemberAction,
  memberErrorAction,
} from '../redux/slices/member.slice';
import { formatAxiosError } from './error.helper';

export const fetchMember = async (dispatch) => {
  const type = JSON.parse(localStorage.getItem('type'));

  dispatch(loadingGetMemberAction());
  await axiosInstance
    .get(type === 'member' ? '/users/members' : '/users/librarians')
    .then((res) => {
      let data;
      if (type === 'member') {
        data = res.data.data.member;
      } else {
        data = res.data.data.librarian;
      }
      dispatch(getMemberAction(data));
    })
    .catch((error) => {
      dispatch(memberErrorAction(formatAxiosError(error)));
      toast.error(formatAxiosError(error));
    });
};

export const fetchAllMembers = async (dispatch) => {
  dispatch(loadingGetAllMembersAction());
  await axiosInstance
    .get('/users/members/all')
    .then((res) => {
      console.log(res);
      dispatch(getAllMembersAction(res.data.data.members));
    })
    .catch((error) => {
      dispatch(allMembersErrorAction(formatAxiosError(error)));
      toast.error(formatAxiosError(error));
    });
};
