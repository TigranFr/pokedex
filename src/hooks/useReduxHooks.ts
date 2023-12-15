import {useDispatch , useSelector , type TypedUseSelectorHook} from 'react-redux'
import {type RootState , type AppDispatch} from '../store/store';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector 