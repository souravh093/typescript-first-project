import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully',
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationIntoDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is fetched successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationIntoDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is fetched successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      req.params.id,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is update successfully',
    data: result,
  });
});

export const SemesterController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
