import * as yup from 'yup'

// Схема валидации для формы авторизации
export const authValidationSchema = yup
  .object({
    username: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Имя слишком короткое.')
      .max(20, 'Имя слишком длинное.'),
    password: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Пароль слишком короткий.')
      .max(20, 'Пароль слишком длинный'),
  })
  .required()