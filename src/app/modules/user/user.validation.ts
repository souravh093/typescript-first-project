import { z } from 'zod';
import { UserStatus } from './user.contstant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be String',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .min(8, { message: 'Password can not be less than 8 characters' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
