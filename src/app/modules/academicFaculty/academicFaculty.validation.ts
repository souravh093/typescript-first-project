import { z } from 'zod';

const createAcademicValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty must be String',
  }),
});

const updateAcademicValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic faculty must be String',
    })
    .optional(),
});

export const academicValidation = {
  createAcademicValidationSchema,
  updateAcademicValidationSchema,
};
