interface ILogger {
  isDevBuild: boolean
  base: ILoggerBase
  level: LoggerLevelType
  levels: LoggerLevels
  logOnBuild: boolean

  validate: (level: string, force: boolean) => boolean
  time: (func: any) => void
  debug: (messages: string[]) => void
  log: (messages: string[]) => void
  force: (messages: string[]) => void
  warn: (messages: string[]) => void
  error: (messages: string[]) => void
  info: (messages: string[]) => void
  getCurrentLevel: () => number
  setLevel: (level: string) => void
  clear: () => void
  customHandler: (func: any, level: string) => void
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
  Log = 0,
  debug,
  info,
  warn,
  error,
  off = 99
}

type LoggerLevelType = 'Log' | 'Debug' | 'Info' | 'Warn' | 'Error' | 'Off'

export { ILogger, ILoggerBase, LoggerLevels, LoggerLevelType }