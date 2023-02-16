import 'dotenv/config';

export const logging = {
  level: process.env.RPI_LOG_LEVEL || 'info',
  timestampFormat: process.env.RPI_LOG_TIME_FMT
};

export default {
  logging
};
