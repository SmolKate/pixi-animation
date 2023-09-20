import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { authAPI } from "@/assets/api/authApi";

interface IAuthFields {
    username: string
    password: string
}

interface IProps {
    loginHandler: (username: string, password: string) => void
}

const schema = yup.object({
    username: yup.string().min(6, 'Имя слишком короткое.').max(20, 'Имя слишком длинное.').required(),
    password: yup.string().min(6, 'Пароль слишком короткий.').max(20, 'Пароль слишком длинный').required(),
  }).required();

const AuthForm = ({loginHandler}: IProps) => {
    const { register, handleSubmit, formState:{ errors }, reset } = useForm<IAuthFields>({
        resolver: yupResolver(schema)
      });
    const onSubmit: SubmitHandler<IAuthFields> = async (data) => {
        loginHandler(data.username, data.password)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} type='text' placeholder="Имя"/>
            <p>{errors.username?.message}</p>
            <input {...register("password")} type='password' placeholder="Пароль"/>
            <p>{errors.password?.message}</p>
            <button type="submit">Войти</button>
        </form>
    )
}

export default AuthForm