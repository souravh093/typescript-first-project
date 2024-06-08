import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';

const router = Router();

router.post(
  '/',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.get('/', OfferedCourseController.getAllOfferedCourse);

router.get('/', OfferedCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
export const OfferedCourseRoutes = router;
