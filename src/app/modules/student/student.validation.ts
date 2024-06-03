import { z } from 'zod';

// Name Schema
const createNameValidationSchema = z.object({
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
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is Required'),
  fatherOccupation: z.string().min(1, 'Father occupation is Required'),
  fatherContactNo: z.string().min(1, 'Father contact number is Required'),
  motherContactNo: z.string().min(1, 'Mother contact number is Required'),
  motherOccupation: z.string().min(1, 'Mother occupation is Required'),
  motherName: z.string().min(1, 'Mother name is Required'),
});

// Local Guardian Schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is Required'),
  occupation: z.string().min(1, 'Local guardian occupation is Required'),
  contactNo: z.string().min(1, 'Local guardian contact number is Required'),
  address: z.string().min(1, 'Local guardian address is Required'),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'Password minimum 6 digit')
      .max(30, 'Password maximum 30 digit'),
    student: z.object({
      name: createNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is Required',
        invalid_type_error: '{#label} is not supported',
      }),
      dateOfBirth: z.string().optional(),
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
      guardian: createGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

// Name Schema
const updateNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must have at least 2 characters')
    .max(20, 'First name allowed 20 characters only')
    .refine((val) => val.trim().length > 0, 'First name is Required')
    .optional(),
  middleName: z
    .string()
    .max(20, 'Middle name allowed 20 characters only')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Last name must have at least 2 characters')
    .max(20, 'Last name allowed 20 characters only')
    .refine((val) => val.trim().length > 0, 'Last name is Required')
    .optional(),
});

// Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is Required').optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father occupation is Required')
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is Required')
    .optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is Required')
    .optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother occupation is Required')
    .optional(),
  motherName: z.string().min(1, 'Mother name is Required').optional(),
});

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is Required').optional(),
  occupation: z
    .string()
    .min(1, 'Local guardian occupation is Required')
    .optional(),
  contactNo: z
    .string()
    .min(1, 'Local guardian contact number is Required')
    .optional(),
  address: z.string().min(1, 'Local guardian address is Required').optional(),
});

// Student Schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateNameValidationSchema,
        gender: z
          .enum(['male', 'female', 'other'], {
            required_error: 'Gender is Required',
            invalid_type_error: '{#label} is not supported',
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        email: z
          .string()
          .email('Invalid email address')
          .min(1, 'Email is Required')
          .optional(),
        contactNo: z.string().min(1, 'Contact number is Required').optional(),
        emergencyContactNo: z
          .string()
          .min(1, 'Emergency contact number is Required')
          .optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
          .optional(),
        presentAddress: z
          .string()
          .min(1, 'Present address is Required')
          .optional(),
        permanentAddress: z
          .string()
          .min(1, 'Permanent address is Required')
          .optional(),
        guardian: updateGuardianValidationSchema,
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        localGuardian: updateLocalGuardianValidationSchema,
        profileImg: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
