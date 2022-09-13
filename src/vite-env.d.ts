/// <reference types="vite/client" />

import axios from 'axios'
import { ILogger } from '../src/interfaces/logger'
import type { DefineComponent } from 'vue'
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $const: Record<string, unknown>
    logger: typeof ILogger
    $http: typeof axios
    $translate: (key: string) => string
  }
}