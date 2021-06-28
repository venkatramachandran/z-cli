import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({
  level: process.env.level || 'warning',
  format: winston.format.json(),
  defaultMeta: { service: 'z-cli' },
  transports: [new winston.transports.Console()],
});

export default logger;
