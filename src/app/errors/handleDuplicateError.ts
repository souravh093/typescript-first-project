/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = 400;
  const extractedMessage = error.message.match(/name:\s*"([^"]+)"/);

  const errorSources: TErrorSources = [
    {
      path: '',
      message: extractedMessage && `${extractedMessage[1]} is Already Exists`,
    },
  ];

  return {
    statusCode,
    message: 'Already Exist',
    errorSources,
  };
};

export default handleDuplicateError;
