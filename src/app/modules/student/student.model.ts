import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Name, Student } from './student.interface';

const nameSchema = new Schema<Name>({
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

const guardianSchema = new Schema<Guardian>({
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

const localGuardianSchema = new Schema<LocalGuardian>({
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

const studentSchema = new Schema<Student>({
  id: {
    type: String,
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
  isActive: {
    type: String,
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
