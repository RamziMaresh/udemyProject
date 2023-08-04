import { useSelector } from 'react-redux'
import { selectIsLoogedIn } from '../../redux/slice/authSlice'

const ShowOnLogin = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoogedIn)

    if (isLoggedIn) {
        return children
    }
    return null
};

export const ShowOnLogout = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoogedIn)

    if (!isLoggedIn) {
        return children
    }
    return null
}

export default ShowOnLogin;
