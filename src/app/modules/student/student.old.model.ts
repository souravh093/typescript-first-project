import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from './student.interface';
import validator from 'validator';

const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: [true, 'First name is Required'],
    trim: true,
    maxlength: [20, 'First name allowed 20 character only'],
    validate: {
      validator: function (value: string): boolean {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is Required'],
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: '{VALUE} in not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is Required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is Required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is Required'],
  },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'Student ID is Required'],
    unique: true,
  },
  name: {
    type: nameSchema,
    required: [true, 'Student name is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Gender is Required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is Required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is Required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is Required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is Required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is Required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is Required'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<TStudent>('Student', studentSchema);
