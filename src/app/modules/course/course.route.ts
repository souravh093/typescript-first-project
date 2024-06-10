import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  CourseController.getAllCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  CourseController.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
