import { Router } from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', StudentControllers.getAllStudents);
router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
