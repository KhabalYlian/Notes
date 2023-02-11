import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegistration, usersErrorMessage } from '../../../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';

export const SignIn = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();
	const checkRedirect = useSelector(state => state.users.checkRedirect);
	const errorMessage = useSelector(state => state.users.errorMessage);
	
	useEffect(() => {
        if (checkRedirect) {
            navigate('/');
        }
    }, [checkRedirect]);

    function register(e) {
        e.preventDefault();

        const forms = document.querySelectorAll('form')[1].elements;
        const form = document.querySelectorAll('form')[1];

        let user = {
            login: forms.logname.value,
            email: forms.logemail.value,
            password: forms.logpass.value
        };

		if(user.login === ''){
			dispatch(usersErrorMessage('Заповніть форму!'));
			return false;
		}

		const emailRegex = new RegExp(
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
            'gm'
        );

		if (!emailRegex.test(user.email)) {
            dispatch(usersErrorMessage('Invalid email'));
            return false;
        } 
		dispatch(userRegistration(user));
        form.reset();
    }

    async function login(e) {
        e.preventDefault();

        const forms = document.querySelector('form').elements;
        const form = document.querySelector('form');

        let user = {
            email: forms.logemail.value,
            password: forms.logpass.value
        };

        dispatch(userLogin(user));
        form.reset();
    }

    return (
        <div className='section'>
            <div className='container'>
                <div className='row full-height justify-content-center'>
                    <div className='col-12 text-center align-self-center py-5'>
                        <div className='section pb-5 pt-5 pt-sm-2 text-center'>
                            <h6 className='mb-0 pb-3 title'>
                                <span className='title__item'>Log In </span>
                                <span className='title__item'>Sign Up</span>
                            </h6>
                            <input
                                className='checkbox'
                                type='checkbox'
                                id='reg-log'
                                name='reg-log'
                            />
                            <label htmlFor='reg-log'></label>
                            <div className='card-3d-wrap mx-auto'>
                                <div className='card-3d-wrapper'>
                                    <div className='card-front'>
                                        <p className='error-message'>
                                            {errorMessage}
                                        </p>
                                        <div className='center-wrap'>
                                            <form
                                                onSubmit={e => login(e)}
                                                className='section text-center'
                                            >
                                                <h4 className='mb-4 pb-3 text'>
                                                    Log In
                                                </h4>
                                                <div className='form-group'>
                                                    <input
                                                        type='email'
                                                        name='logemail'
                                                        className='form-style'
                                                        placeholder='Your Email'
                                                        id='logemail'
                                                        autoComplete='off'
                                                    />
                                                    <i className='input-icon uil uil-at'></i>
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        type='password'
                                                        name='logpass'
                                                        className='form-style'
                                                        placeholder='Your Password'
                                                        id='logpass'
                                                        autoComplete='off'
                                                    />
                                                    <i className='input-icon uil uil-lock-alt'></i>
                                                </div>
                                                <button className='btn mt-4'>
                                                    submit
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='card-back'>
                                        <p className='error-message'>
                                            {errorMessage}
                                        </p>
                                        <div className='center-wrap'>
                                            <form
                                                onSubmit={e => register(e)}
                                                className='section text-center'
                                            >
                                                <h4 className='mb-4 pb-3 text'>
                                                    Sign Up
                                                </h4>
                                                <div className='form-group'>
                                                    <input
                                                        type='text'
                                                        name='logname'
                                                        className='form-style'
                                                        placeholder='Your Name'
                                                        id='logname'
                                                        autoComplete='off'
                                                    />
                                                    <i className='input-icon uil uil-user'></i>
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        type='email'
                                                        name='logemail'
                                                        className='form-style'
                                                        placeholder='Your Email'
                                                        id='reglogemail'
                                                        autoComplete='off'
                                                    />
                                                    <i className='input-icon uil uil-at'></i>
                                                </div>
                                                <div className='form-group mt-2'>
                                                    <input
                                                        type='password'
                                                        name='logpass'
                                                        className='form-style'
                                                        placeholder='Your Password'
                                                        id='reglogpass'
                                                        autoComplete='off'
                                                    />
                                                    <i className='input-icon uil uil-lock-alt'></i>
                                                </div>
                                                <button className='btn mt-4'>
                                                    submit
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
