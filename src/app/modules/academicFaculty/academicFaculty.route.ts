import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicValidation.createAcademicValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);
router.get(
  '/get-all-academic-faculty',
  AcademicFacultyController.getAllAcademicFaculty,
);
router.get(
  '/get-single-academic-faulty',
  AcademicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/update-academic-faculty',
  validateRequest(academicValidation.updateAcademicValidationSchema),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
