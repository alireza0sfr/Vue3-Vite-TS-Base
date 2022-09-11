import mixins from './plugins/mixins'

export default {
  install: (app: any, options: any): void => {
    app.mixin(mixins)
  }
}