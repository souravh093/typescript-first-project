import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await User.findOne({ id });

  if (user?.isDeleted === true) {
    return true;
  }
};

userSchema.statics.isUserStatus = async function (id: string) {
  const user = await User.findOne({ id });

  if (user?.status === 'blocked') {
    return true;
  }
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
