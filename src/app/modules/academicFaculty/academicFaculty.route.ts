import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post(
  '/',
  validateRequest(academicValidation.createAcademicValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(academicValidation.updateAcademicValidationSchema),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
