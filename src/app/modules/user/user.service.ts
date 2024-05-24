import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.modal';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // set student role and password
  const userData: Partial<TUser> = {
    password: password || (config.default_pass as string),
    role: 'student',
    id: '2030100001',
  };

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);

    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
