import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/get-all-academic-semester',
  AcademicSemesterController.getAllAcademicSemester,
);

router.get(
  '/get-single-academic-semester/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  '/update-academic-semester/:semesterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademesSemesterRoutes = router;
