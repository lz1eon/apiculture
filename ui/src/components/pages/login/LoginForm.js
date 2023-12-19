import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {Modal} from '../../common';
import Button from '@mui/material/Button';
import { useAuth } from '../../../hooks/useAuth';


const LoginForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const [status, setStatus] = useState({
        type: '',
        message: '',
        error: '',
    });

    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState({
        title: '',
        content: '',
        buttons: ['Submit'],
    });

    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    };

    const { login } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();
        
        let api_base = process.env.REACT_APP_API_BASE;
        
        fetch(`${api_base}/login/`, {
            method: 'post',
            body: JSON.stringify(inputs),
        })
            .then((res) => res.json())
            .then((result) => {
                /*
                 * NOTE:
                 * Only an example. make the authentication stronger by using your own authentication.
                 * */

                if (result.message === 'OK') {
                    setLoggedIn(true);
                    login(result.user);
                } else {
                    setLoggedIn(false);
                    setStatus({
                        type: 'danger',
                        message: 'Something went wrong',
                        error: result.detail,
                    });
                    openModal({
                        title:'Error',
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                setStatus({
                    type: 'danger',
                    message: 'Something went wrong',
                    error: error,
                });
            });
    };

    const openModal = (modal) => {
        setModal(modal);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    console.log('isLoggedIn: ' + loggedIn)
    return loggedIn ? (
        <Navigate to={'/apiaries'} />
    ) : (
        <>
            <Modal modal={modal} closeModal={closeModal} isOpen={isOpen}>
                {status.error}
            </Modal>

            <div className="login-wrapper rounded-2xl px-8 md:px-16 pt-14 mt-6">
                <h1
                    className={
                        'font-thin text-3xl text-center mb-6 flex items-end justify-center items-center'
                    }>
                    <span className={'font-bold pr-2 mr-2 border-gray-500 text-4xl'}>
                        Вход
                    </span>
                </h1>
                {/* <p className={'text-center text-sm mb-8 text-gray-800'}>
                    Не сте регистриран?{' '}
                    <Link className={'font-bold hover:text-black'} to={'/register'}>
                        Регистрирай се
                    </Link>
                </p> */}
                <form onSubmit={handleSubmit}>
                    <div className={'my-3'}>
                        <label className={'text-sm mb-1 inline-block'}>Имейл</label>
                        <input
                            type="text"
                            className={
                                'p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700'
                            }
                            placeholder={'Имейл'}
                            name={'username'}
                            onChange={handleChange}
                            autoComplete={'off'}
                        />
                    </div>
                    <div className={'my-3'}>
                        <label className={'text-sm mb-1 inline-block'}>Парола</label>
                        <input
                            type="password"
                            className={
                                'p-2 rounded-lg w-full border-2 focus:border-primary hover:border-gray-400 outline-none dark:bg-gray-700'
                            }
                            placeholder={'Парола'}
                            name={'password'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'flex justify-end mt-6'}>
                        <Button type={'submit'} className={'py-3 btn-primary'} variant='contained'>
                            Влез
                        </Button>
                    </div>
                </form>
            </div>
            <div
                className={
                    'login-wrapper text-white rounded-2xl px-8 py-6 mt-6 ' +
                    (status.type !== '' ? 'bg-' + status.type : '')
                }>
                {status.error}
            </div>
        </>
    );
};


export default LoginForm;
