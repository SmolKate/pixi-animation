import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAppDispatch } from "@/assets/hooks/redux";
import { getAuthUser } from "@/assets/store/reducers/authSlice";

interface IAuthFields {
    username: string
    password: string
}

const schema = yup.object({
    username: yup.string().min(6, 'Имя слишком короткое.').max(20, 'Имя слишком длинное.').required(),
    password: yup.string().min(6, 'Пароль слишком короткий.').max(20, 'Пароль слишком длинный').required(),
  }).required();

const AuthForm = () => {
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState:{ errors }, reset } = useForm<IAuthFields>({
        resolver: yupResolver(schema)
      });
    const onSubmit: SubmitHandler<IAuthFields> = async (data) => {
        dispatch(getAuthUser(data))
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