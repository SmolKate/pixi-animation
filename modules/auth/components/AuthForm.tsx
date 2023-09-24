import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { deleteError, getAuthUser } from '@/modules/auth/store/authSlice'
import styles from '@/modules/auth/style/Auth.module.css'
import { authValidationSchema } from '@/modules/auth/utils/authValidationSchema'
import { FC } from 'react'

// Форма авторизации пользователя

interface IAuthFields {
  username: string
  password: string
}

const AuthForm: FC = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<IAuthFields>({
    resolver: yupResolver(authValidationSchema),
  })

  // Обработчик для удаления сообщений об ошибке, возникающей при отправке запроса на сервер
  const errorHandler = () => {
    dispatch(deleteError())
  }

  // Обработчик отправки формы
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
