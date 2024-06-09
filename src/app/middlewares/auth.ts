import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.modal';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // if the token not valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      async function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Your are nto authorized',
          );
        }

        const { role, userId, iat } = decoded as JwtPayload;

        const user = await User.isUserExistsByCustomId(userId);

        if (!user) {
          throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
        }

        if (await User.isUserDeleted(userId)) {
          throw new AppError(httpStatus.FORBIDDEN, 'User Already Deleted!');
        }

        if (await User.isUserStatus(userId)) {
          throw new AppError(httpStatus.FORBIDDEN, 'User Blocked!');
        }

        if (
          user.passwordChangedAt &&
          User.isJWTIssuedBeforePasswordChanged(
            user.passwordChangedAt,
            iat as number,
          )
        ) {
          throw new AppError(httpStatus.FORBIDDEN, 'ur are nto authorized');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Your are nto authorized',
          );
        }

        req.user = decoded as JwtPayload;

        next();
      },
    );
  });
}; // need help

export default auth;

// need help how to all controller access user
