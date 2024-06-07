import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterController } from './semesterRegistration.controller';

const router = Router();

router.post(
  '/',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterController.createSemesterRegistration,
);

router.get('/', SemesterController.getAllSemesterRegistrations);

router.get('/:id', SemesterController.getSingleSemesterRegistration);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
