import { Router } from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { User_ROLE } from './user.contstant';

const router = Router();

router.post(
  '/create-student',
  auth(User_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(User_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

router.post('/create-faculty');

router.put('/change-status/:id', auth('admin'), UserController.changeStatus);

router.get('/me', auth('admin', 'faculty', 'student'), UserController.getMe);

export const UserRoutes = router;
