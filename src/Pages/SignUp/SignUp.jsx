import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { saveUser } from '../../Api/Auth';

const SignUp = () => {
  const { loading, setLoading, signInWithGoogle, updateUserProfile, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = event => {
    const password = event.target.value;
    const confirmPassword = event.target.form.confirmPassword.value;
    setPasswordMatch(password === confirmPassword);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        toast.success('Success Login');
        saveUser(result.user);
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;
    const name = from.name.value;
    const confirmPassword = from.confirmPassword.value;

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const image = from.image.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGBB_KEY}`;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(imageData => {
        const imageUrl = imageData.data.display_url;
        createUser(email, password)
          .then(result => {
            updateUserProfile(name, imageUrl)
              .then(() => {
                toast.success('Sign Up Success');
                saveUser(result.user);
                navigate(from, { replace: true });
                navigate('/');
              })
              .catch(err => {
                setLoading(false);
                console.log(err.message);
                toast.error(err.message);
              });
          })
          .catch(err => {
            setLoading(false);
            console.log(err.message);
            toast.error(err.message);
          });
      })
      .catch(err => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to AirCNC</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
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
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label htmlFor='confirmPassword' className='block mb-2 text-sm'>
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                onChange={handlePasswordChange}
              />
              {!passwordMatch && (
                <p className='text-red-500 text-xs mt-1'>Passwords do not match</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-green-500 w-full rounded-md py-3 text-white'
              disabled={!passwordMatch || loading}
            >
              {loading ? (
                <TbFidgetSpinner className='m-auto animate-spin' size={24} />
              ) : (
                'Sign Up'
              )}
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
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
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
