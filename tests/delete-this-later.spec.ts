import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// @ts-ignore
import DeleteThisLater from '../src/components/delete-this-later.vue'

describe('DeleteThisLater', () => {

  const msg = 'Unit test!'

  const wrapper = mount(DeleteThisLater, {
    props: {
      msg: msg
    },
  })

  const element = wrapper.find(`[data-testid="delete"]`)

  it('Renders', () => {

    expect(element.exists())
    expect(element.get('[class="msg"]').text()).toBe(msg)
  })
})