import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
} from '../../store/selectors/authSelectors.js';
import { setLoginModal} from '../../store/uiSlice.js';

const useAuthAction = ()=>{
  const isAuth = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  return (fn)=>{
    return (...args) =>{
      if(!isAuth){
        dispatch(setLoginModal(true));
        return;
      }
      return fn(...args)
    }
  }
}
export default useAuthAction;