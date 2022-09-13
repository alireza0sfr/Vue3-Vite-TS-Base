class Logger implements ILogger {

  isDevBuild
  base
  level
  levels
  logOnBuild

  constructor(level: LoggerLevelType = 'log', logOnBuild = false) {
    this.isDevBuild = !(process.env.NODE_ENV && process.env.NODE_ENV === 'production')
    this.base = {
      debug: '[LOGGER DEBUG]',
      log: '[LOGGER LOG]',
      warn: '[LOGGER WARN]',
      error: '[LOGGER ERROR]',
      info: '[LOGGER INFO]',
      force: '[LOGGER FORCE]',
    }


    this.levels = LoggerLevels

    this.level = this.levels[level]

    this.logOnBuild = logOnBuild
  }

  validate(level: LoggerLevelType, force?: boolean): boolean {

    if (force)
      return true

    if (!this.isDevBuild && !this.logOnBuild)
      return false

    if (level > this.level)
      return false

    return true
  }

  time(func: any): void {
    console.time()
    func()
    console.timeEnd()
  }

  debug(...messages: string[]): void {
    if (this.validate(this.levels.debug))
      console.log(this.base.debug, ...messages)
  }

  log(...messages: string[]) {
    if (this.validate(this.levels.log))
      console.log(this.base.log, ...messages)
  }

  force(...messages: string[]) {
    console.log(this.base.force, ...messages)
  }

  warn(...messages: string[]) {
    if (this.validate(this.levels.warn))
      console.warn(this.base.warn, ...messages)
  }

  error(...messages: string[]) {
    if (this.validate(this.levels.error))
      console.error(this.base.error, ...messages)
  }

  info(...messages: string[]) {
    if (this.validate(this.levels.info))
      console.log(this.base.info, ...messages)
  }

  getCurrentLevel() {
    return this.level
  }

  setLevel(level: LoggerLevelType) {
    this.level = this.levels[level]
  }

  clear() {
    console.clear()
  }

  customHandler(func: any, level: LoggerLevelType = 'log') {
    if (this.validate(level))
      func()
  }
}

import { ILogger, LoggerLevels, LoggerLevelType } from '../interfaces/logger'

const globalLogger = new Logger()

export { globalLogger as Logger }