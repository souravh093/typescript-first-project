import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/create-student', UserController.createStudent);
router.post('/create-admin');
router.post('/create-faculty');

export const UserRoutes = router;
