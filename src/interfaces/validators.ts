interface IValidator {
  error: (name: string, other: any) => string
  test?: (value: validatorInputValueType, obj?: object) => boolean
}

type validatorInputValueType = any // string | number | object[] | object

export { validatorInputValueType, IValidator }