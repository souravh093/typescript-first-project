import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.modal';

export const findLastStudentId: {
  id: string;
} = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .lean()
    .exec();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

// year, semesterCode, 4 digit number
export const generateStudentId = (payload: TAcademicSemester) => {
  // first time 0000
  const currentId = (0).toString().padStart(4, '0');

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
