import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
  StudentModal,
} from './student.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  fatherContactNo: {
    type: String,
  },
  motherContactNo: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  motherName: {
    type: String,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  address: {
    type: String,
  },
});

const studentSchema = new Schema<TStudent, StudentModal>(
  {
    id: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: nameSchema,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    email: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    emergencyContactNo: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    guardian: {
      type: guardianSchema,
    },
    localGuardian: {
      type: localGuardianSchema,
    },
    profileImg: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function (next) {
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // document
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// creating a custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModal>('Student', studentSchema);
