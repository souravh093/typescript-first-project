import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created Successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieves successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getSingleCourseIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieve successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.updateCourseIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.deleteCourseIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    req.params.courseId,
    req.body.faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course assign faculties successfully',
    data: result,
  });
});

const removeFacultiesWithCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.removeFacultiesWithCourseIntoDB(
    req.params.courseId,
    req.body.faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove faculties successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
