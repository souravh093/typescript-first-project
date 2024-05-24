import { Router } from 'express';
import { StudentControllers } from './student.controller';

const router = Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
