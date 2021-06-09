import { Screen } from '~/screens'

export default {
  [Screen.LOGIN]: {
    title: 'Titulo de prueba',
    validation: {
      required: 'Este dato es requerido',
      maxLength: 'Superaste el máximo de {{codeMaxLength}} caracteres',
      minLength: 'El mínimo de caracteres es de {{codeMinLength}}',
      fixedLength: 'El dato debe contener {{codeMaxLength}} caracteres',
      codeInvalid: 'El dato ingresado es incorrecto',
    },
  },
}
