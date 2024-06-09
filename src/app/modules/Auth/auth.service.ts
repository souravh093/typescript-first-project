import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.modal';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // check if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (await User.isUserDeleted(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User Already Deleted!');
  }

  if (await User.isUserStatus(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User Blocked!');
  }

  //   check if the password is corrected
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not matched');
  }

  //   console.log(isPasswordMatched);

  //   access granted: send accessToken, refreshToken
};

export const AuthServices = {
  loginUser,
};
