import Joi from 'joi';

export const StudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is Required',
  }),
  name: Joi.object({
    firstName: Joi.string().max(20).min(2).required().messages({
      'string.empty': 'First name is Required',
      'string.max': 'First name allowed 20 characters only',
      'string.min': 'First name must have at least 2 characters',
    }),
    middleName: Joi.string().max(20).min(2).allow(null, '').messages({
      'string.max': 'Middle name allowed 20 characters only',
      'string.min': 'Middle name must have at least 2 characters',
    }),
    lastName: Joi.string().max(20).min(2).required().messages({
      'string.empty': 'Last name is Required',
      'string.max': 'Last name allowed 20 characters only',
      'string.min': 'Last name must have at least 2 characters',
    }),
  }).required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.empty': 'Gender is Required',
    'any.only': '{#label} is not supported',
  }),
  dateOfBirth: Joi.date(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is Required',
    'string.email': '{#label} is not a valid email type',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is Required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is Required',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'AB+',
    'AB-',
    'B+',
    'B-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is Required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is Required',
  }),
  guardian: Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': 'Father name is Required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'string.empty': 'Father occupation is Required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'string.empty': 'Father contact number is Required',
    }),
    motherContactNo: Joi.string().required().messages({
      'string.empty': 'Mother contact number is Required',
    }),
    motherOccupation: Joi.string().required().messages({
      'string.empty': 'Mother occupation is Required',
    }),
    motherName: Joi.string().required().messages({
      'string.empty': 'Mother name is Required',
    }),
  }).required(),
  localGuardian: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Local guardian name is Required',
    }),
    occupation: Joi.string().required().messages({
      'string.empty': 'Local guardian occupation is Required',
    }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Local guardian contact number is Required',
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Local guardian address is Required',
    }),
  }).required(),
  profileImg: Joi.string().allow(null, ''),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});
