import { z } from 'zod';

// Name Schema
const nameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must have at least 2 characters')
    .max(20, 'First name allowed 20 characters only')
    .refine((val) => val.trim().length > 0, 'First name is Required'),
  middleName: z
    .string()
    .max(20, 'Middle name allowed 20 characters only')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Last name must have at least 2 characters')
    .max(20, 'Last name allowed 20 characters only')
    .refine((val) => val.trim().length > 0, 'Last name is Required'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is Required'),
  fatherOccupation: z.string().min(1, 'Father occupation is Required'),
  fatherContactNo: z.string().min(1, 'Father contact number is Required'),
  motherContactNo: z.string().min(1, 'Mother contact number is Required'),
  motherOccupation: z.string().min(1, 'Mother occupation is Required'),
  motherName: z.string().min(1, 'Mother name is Required'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is Required'),
  occupation: z.string().min(1, 'Local guardian occupation is Required'),
  contactNo: z.string().min(1, 'Local guardian contact number is Required'),
  address: z.string().min(1, 'Local guardian address is Required'),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    // need help
    password: z
      .string()
      .min(6, 'Password minimum 6 digit')
      .max(30, 'Password maximum 30 digit'),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is Required',
        invalid_type_error: '{#label} is not supported',
      }),
      dateOfBirth: z.date().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is Required'),
      contactNo: z.string().min(1, 'Contact number is Required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is Required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is Required'),
      permanentAddress: z.string().min(1, 'Permanent address is Required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
