import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.modal';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.modal';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // set student role and password
  const userData: Partial<TUser> = {
    password: password || (config.default_pass as string),
    role: 'student',
    id: '00934324',
  };

  // find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set Generate id
  userData.id = admissionSemester ? generateStudentId(admissionSemester) : '';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);

    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
