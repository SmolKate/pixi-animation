import { AppDispatch, RootState } from '@/shared/store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Типизированные хуки для redux
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
