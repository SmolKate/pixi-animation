import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch } from '@/assets/hooks/redux'
import { deleteError, getAuthUser } from '@/assets/store/reducers/authSlice'
import styles from '@/styles/Auth.module.css'

interface IAuthFields {
  username: string
  password: string
}

const schema = yup
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

const AuthForm = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<IAuthFields>({
    resolver: yupResolver(schema),
  })

  const errorHandler = () => {
    dispatch(deleteError())
  }

  const onSubmit: SubmitHandler<IAuthFields> = async data => {
    dispatch(getAuthUser(data))
    reset()
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={errors.username ? styles.errorMsgCont : ''} onClick={errorHandler}>
        <input {...register('username')} type="text" placeholder="Имя" />
      </div>
      <div className={styles.errorMsg}>{errors.username?.message}</div>
      <div className={errors.username ? styles.errorMsgCont : ''} onClick={errorHandler}>
        <input {...register('password')} type="password" placeholder="Пароль" />
      </div>
      <div className={styles.errorMsg}>{errors.password?.message}</div>
      <div
        className={
          (!touchedFields.password && !touchedFields.username) || errors.username || errors.password
            ? styles.errorMsgBtn
            : ''
        }
      >
        <button type="submit">Войти</button>
      </div>
    </form>
  )
}

export default AuthForm
