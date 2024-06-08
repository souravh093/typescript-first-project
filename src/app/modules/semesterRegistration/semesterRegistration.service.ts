import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.modal';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterRegistrationsStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;

  // check is there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: SemesterRegistrationsStatus.UPCOMING },
        { status: SemesterRegistrationsStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`,
    );
  }

  // check if the semester is exits
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }

  // check if semester already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'Already Semester Registered');
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the requested registered semester is exists
  const isAcademicSemesterExists = await SemesterRegistration.findById(id);
  const requestedSemesterStatus = payload?.status;

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }

  // if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isAcademicSemesterExists?.status;

  if (currentSemesterStatus === SemesterRegistrationsStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === SemesterRegistrationsStatus.UPCOMING &&
    requestedSemesterStatus === SemesterRegistrationsStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from  ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === SemesterRegistrationsStatus.ONGOING &&
    requestedSemesterStatus === SemesterRegistrationsStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from  ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
