import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';

import { usersRegistrationInfo } from '../../../slice/userSlice';

export const ModalRegistrationInfo = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state.users.registrationInfo);

    const infoMessage = useMemo(() => {
        if (Object.entries(message).length !== 0) {
            setTimeout(() => {
                dispatch(usersRegistrationInfo());
            }, 3000);
            return message.text;
        }
    }, [message]);

    return Object.entries(message).length !== 0 ? (
        <div
            className='registration-info'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                right: '0',
                top: '80%',
                width: '250px',
                height: '70px',
                backgroundColor: '#7f9f9f',
                borderRadius: '5px 0 0 5px',
                padding: '5px',
                zIndex: '30'
            }}
        >
            <p className='registration-info__text'>{infoMessage}</p>
        </div>
    ) : null;
};
