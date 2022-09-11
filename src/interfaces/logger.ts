interface ILogger {
  isDevBuild: boolean
  base: ILoggerBase
  level: LoggerLevelType
  levels: Record<LoggerLevels, string>
  logOnBuild: boolean

  validate: (level: LoggerLevelType, force?: boolean) => boolean
  time: (func: any) => void
  debug: (...messages: string[]) => void
  log: (...messages: string[]) => void
  force: (...messages: string[]) => void
  warn: (...messages: string[]) => void
  error: (...messages: string[]) => void
  info: (...messages: string[]) => void
  getCurrentLevel: () => LoggerLevelType
  setLevel: (level: LoggerLevelType) => void
  clear: () => void
  customHandler: (func: any, level: LoggerLevelType) => void
}

interface ILoggerBase {
  debug: string
  log: string
  warn: string
  error: string
  info: string
  force: string
}

enum LoggerLevels {
  off = 'off',
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
  log = 'log'
}

type LoggerLevelType = keyof typeof LoggerLevels;

export { ILogger, ILoggerBase, LoggerLevels, LoggerLevelType }