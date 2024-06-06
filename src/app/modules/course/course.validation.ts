import { z } from 'zod';

const PreRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z
      .array(PreRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

const updateCourseValidationSchema = createCourseValidationSchema.partial();

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
