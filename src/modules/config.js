import 'dotenv/config';

export const logging = {
  level: process.env.RPI_LOG_LEVEL || 'info',
  timestampFormat: process.env.RPI_LOG_TIME_FMT
};

export const smtp = {
  hostname: process.env.RPI_SMTP_HOSTNAME || 'localhost',
  port: parseInt(process.env.RPI_SMTP_PORT || '25', 10),
  secure: process.env.RPI_SMTP_SECURE.toLowerCase() === 'true' || false,
  username: process.env.RPI_SMTP_USERNAME,
  password: process.env.RPI_SMTP_PASSWORD
};

export const polling = {
  categories: process.env.RPI_POLLING_CATEGORIES.split(/,/),
  interval: parseInt(process.env.RPI_POLLING_INTERVAL || '240000', 10)
};
