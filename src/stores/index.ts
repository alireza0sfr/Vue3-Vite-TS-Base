import { defineStore } from 'pinia'

interface State {
  object: object
}

export const useObjectStore = defineStore('object', {
  
  state: (): State => ({
    object: {
      message: 'Store Works Fine!'
    },
  }),

  actions: {
    updateObject (payload: object) {
      this.object = payload
    },
    clearObject () {
      this.$reset()
    }
  }
})