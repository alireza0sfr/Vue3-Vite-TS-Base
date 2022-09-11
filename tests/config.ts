import { config } from '@vue/test-utils'
import mixins from '../src/plugins/mixins'
import i18n from '../src/plugins/localizations'
import { createTestingPinia } from '@pinia/testing'
import sinon from 'sinon'

config.global.mixins = [mixins]

config.global.mocks = {
  $t: i18n.global.t,
}

config.global.plugins = [createTestingPinia(
  { createSpy: sinon.spy }
)]