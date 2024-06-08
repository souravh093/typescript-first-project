import { TSchedule } from './OfferedCourse.interface';

export const hasTimeConflict = (
  assignSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = new Date(`1970-01-01${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01${schedule.endTime}`);
    const currentStartTime = new Date(`1970-01-01${newSchedule.startTime}`);
    const currentEndTime = new Date(`1970-01-01${newSchedule.endTime}`);

    if (
      currentStartTime < existingEndTime &&
      currentEndTime > existingStartTime
    ) {
      return true;
    }
  }

  return false;
};
