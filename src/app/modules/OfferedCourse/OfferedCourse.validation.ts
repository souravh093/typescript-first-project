import { z } from 'zod';
import { Days } from './OfferedCourse.constant';

const DaysEnum = z.enum([...Days] as [string, ...string[]]);

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  { message: `Invalid time format, expected "HH:MM' accented 24 hours` },
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(DaysEnum),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00Z`);
        const end = new Date(`1970-01-01T${body.endTime}:00Z`);

        return end > start;
      },
      { message: 'Start time should be before end time' },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(DaysEnum),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00Z`);
        const end = new Date(`1970-01-01T${body.endTime}:00Z`);

        return end > start;
      },
      { message: 'Start time should be before end time' },
    ),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
