import { useDispatch } from 'react-redux';
import { userLogout } from '../../../slice/userSlice';

export const ProfileMenu = ({ viewMenu }) => {
    const dispatch = useDispatch();

    return (
        <div
            className='profile__menu'
            style={
                viewMenu
                    ? { animation: `show-menu 0.5s linear forwards` }
                    : { animation: `none` }
            }
        >
            <ul className='profile__list'>
                <li
                    onClick={() => dispatch(userLogout())}
                    className='profile__item'
                >
                    Вийти
                </li>
            </ul>
        </div>
    );
};
