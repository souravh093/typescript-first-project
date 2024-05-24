import { Model, Types } from 'mongoose';

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNo: string;
  user: Types.ObjectId;
  emergencyContactNo: string;
  email: string;
  profileImg?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isDeleted: boolean;
};

// for creating static
export interface StudentModal extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance

// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>;
// };
// export type StudentModal = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
