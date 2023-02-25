export interface Control {
  name: string
  label: string
  value: string
  type: string
  price: number
  wat: number
  qty: number
  totalCost: number
  validators: Validators
}

export interface Validators {
  required?: boolean
  minLength?: number
}

export interface JsonFormData {
  lamps: Control[]
}
