import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { user, loading, setLoading, signIn,  updateUserProfile, signInWithGoogle, createUser, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'


    // handle Google Sign In
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                setLoading(false)
                navigate(from, { replace: true });
                
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    // Handle User Register 
    const handleSubmit = event => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const image = event.target.image.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGBB_KEY}`

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(ImageData => {
                const imageUrl = ImageData.data.display_url;
                createUser(email, password)
                    .then((result) => {
                        updateUserProfile(name, imageUrl)
                            .then((result) => {
                                setLoading(false)
                                toast.success("Success SingUp");
                                navigate(from, { replace: true });
                            })
                            .catch((err) => {
                                toast.error(err.message);
                                setLoading(false);
                            });
                        navigate(from, { replace: true });
                    })
                    .catch((err) => {
                        toast.error(err.message);
                        setLoading(false);
                    });

            })

    }



    // confirm Password Matching Function
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const isSignUpDisabled = password !== confirmPassword;







    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold text-green-500'>Sign Up</h1>
                    <p className='text-sm text-green-600'>Welcome to Royal Academy</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                className='text-green-500'
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                value={password}
                                onChange={handlePasswordChange}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='confirmPassword' className='text-sm mb-2'>
                                    Confirm Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                required
                                placeholder='*******'
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            disabled={isSignUpDisabled}
                            className={`bg-green-500 w-full rounded-md py-3 text-white ${isSignUpDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? <TbFidgetSpinner className='m-auto animate-spin' size={24} /> : 'Continue'}
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />
                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-green-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;