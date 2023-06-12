import winston, { format, transports } from 'winston';

const {
  combine, timestamp, colorize, printf,
} = format;

let logger: winston.Logger;

const loggerFormat = () => {
  const formatMessage = ({
    level, message, timestamp, ...rest
  }: winston.Logform.TransformableInfo) => `${timestamp} | ${level} | ${message}`;

  // Errors don't have a decent toString, so we need to format them manually
  const formatError = ({
    error: { stack }, ...rest
  }: winston.Logform.TransformableInfo) => `${formatMessage(rest)}\n\n${stack}\n`;
  const format = (info: winston.Logform.TransformableInfo) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);
  return combine(
    colorize(), timestamp(), printf(format),
  );
};

/**
 * Get the root logger.
 */
export const getLogger = (): winston.Logger => {
  if (!logger) throw new Error('You must first initialize the logger');
  return logger;
};

/**
 * Initialize the root logger.
 *
 * @param {object} options - The log options.
 * @param {string} options.level - The log level.
 * @param {boolean} options.disabled - Disable all logging.
 * @param {object} options.defaultMeta - Default metadata to show.
 * @param {winston.transport[]} options.extraTransports - Extra transports to add besides console.
 */
export const initializeLogger = ({
  level,
  disabled,
  defaultMeta = {},
  extraTransports = [],
}: {
  level: string;
  disabled: boolean;
  defaultMeta?: Record<string, any>;
  extraTransports?: winston.transport[];
}): void => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: loggerFormat(),
    transports: [
      new transports.Console({
        silent: disabled,
      }),
      ...extraTransports,
    ],
  });

  logger.info(` Logger initialized with minimum log level ${level}`);
};
