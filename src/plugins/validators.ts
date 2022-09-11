import _ from 'lodash'
import i18n from '~/plugins/localizations'
import { validatorInputValueType, IValidator } from '~/interfaces/validators'

export const isEmpty = (value: validatorInputValueType) => {
  if (value == null ||
    value === 0 ||
    value === 0.0 ||
    value === '0.0000' ||
    value === '0' ||
    value === '00000000-0000-0000-0000-000000000000' ||
    value.toString().trim() === '' ||
    (Array.isArray(value) && value.length === 0)) {
    return true
  }

  return false
}

export class Validator implements IValidator {
  error(name: string, other: any): string {
    return i18n.global.t('msg.invalidValue', [name])
  }
}

export class VRequired extends Validator {
  test(value: validatorInputValueType, obj: object): boolean {
    if (isEmpty(value)) {
      return false
    }

    return true
  }

  error(name: string): string {
    return i18n.global.t('msg.required', [name])
  }
}

export class VIranNationalCode extends Validator {
  test(value: validatorInputValueType): boolean {
    if (isEmpty(value)) {
      return true
    }

    let val = value

    if (!_.isString(value)) {
      val = _.toString(value)
    }

    if (!/^\d{10}$/.test(val)) {
      return false
    }

    let check = parseInt(val[9])
    let sum = 0
    for (let i = 0; i < 9; ++i) {
      sum += parseInt(val[i]) * (10 - i)
    }
    sum %= 11

    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
  }
}

export class VEmail extends Validator {
  test(value: validatorInputValueType): boolean {
    if (isEmpty(value)) {
      return true
    }

    value = value.toString().toLowerCase()

    let rejex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return rejex.test(value)
  }
}

export class VEqual extends Validator {
  
  prop

  constructor(prop: string) {
    super()
    this.prop = prop
  }

  test(value: validatorInputValueType, obj: any) {
    if (isEmpty(obj)) {
      return isEmpty(value)
    }

    let propValue = obj[this.prop]

    // we don't use isEmpty because (0 != null) or ('' != undefined)
    if (propValue == null && value == null) {
      return true
    }

    return _.isEqual(value, propValue)
  }

  error(name: string, other: any): string {
    return i18n.global.t('msg.must-be-equal', [name, other])
  }
}

export class VCustom extends Validator {

  validator
  errorGenerator

  constructor(validator: any, errorGenerator: any) {
    super()
    this.validator = validator
    this.errorGenerator = errorGenerator
  }

  test(value: validatorInputValueType, obj: object): boolean {
    return this.validator(value, obj)
  }

  error(name: string): string {
    if (this.errorGenerator && _.isFunction(this.errorGenerator)) {
      return this.errorGenerator(name)
    } else {
      return super.error(name, null)
    }
  }
}

export class Checker {

  errors: object[]
  nameResolver

  constructor(nameResolver: any) {
    this.errors = []
    this.nameResolver = nameResolver || ((n: any) => n)
  }

  test(dataModel: any, validatorModel: any) {
    this.errors = []
    this._testCol(null, null, validatorModel, dataModel)
    return this.errors
  }

  _testCol(key: any, value: any, validators: any, dataModel: any) {
    if (key && Array.isArray(validators)) {
      let vs = validators.filter(v => v instanceof Validator)
      for (let v of vs) {
        if (!v.test(value, dataModel)) {
          const error = this.nameResolver(key)
          this.errors.push({
            key,
            error: !_.isString(error) && _.has(error, 'message') ? _.get(error, 'message') : v.error(error, this.nameResolver(v.prop))
          })
          break
        }
      }
    } else {
      let props = Object.getOwnPropertyNames(validators).filter(n => n !== '__ob__')
      for (let prop of props) {
        let d = _.get(dataModel, prop)
        let v = _.get(validators, prop)
        this._testCol(prop, d, v, dataModel)
      }
    }
  }
}

export default function () {
  var arr: object[] = []
  if (arguments.length === 0) {
    return arr
  }

  let unique = [...new Set(arguments)]

  for (var i = 0; i < unique.length; i++) {
    var name = arguments[i]

    if (_.isFunction(name)) {
      name = name()
    }

    if (name instanceof Validator) {
      arr.push(name)
    } else if (_.isString(name)) {
      switch (name) {
        case 'required':
          arr.push(new VRequired())
          break
        case 'ir-national-code':
          arr.push(new VIranNationalCode())
          break
        case 'email':
          arr.push(new VEmail())
          break
      }
    }
  }

  return arr
}
