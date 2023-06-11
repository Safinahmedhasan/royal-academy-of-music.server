import React from 'react'
// import { DateRange } from 'react-date-range'
import { TbFidgetSpinner } from 'react-icons/tb'
// import { categories } from '../Categories/categoriesData'
const AddClassForm = ({
  handleSubmit,
  // dates,
  handleDates,
  loading = false,
  handleImageChange,
  uploadButtonText,
}) => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='location' className='block text-gray-600'>
                Class name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                name='name'
                id='name'
                type='text'
                placeholder='Name'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              {/* <label htmlFor='category' className='block text-gray-600'>
                Category
              </label> */}
              {/* <select
                required
                className='w-full px-4 py-3 border-green-300 focus:outline-green-500 rounded-md'
                name='category'
              >
                {categories.map(category => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select> */}
            </div>

            {/* <div className='space-y-1'>
              <label htmlFor='location' className='block text-gray-600'>
                Select Availability Range
              </label>
              <DateRange rangeColors={['#F43F5E']} />
            </div> */}
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Instructor name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                name='Instructor'
                id='Instructor'
                type='text'
                placeholder='Enter Your Name'
                required
              />
            </div>

            <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      onChange={event=>{handleImageChange(event.target.files[0])}}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-green-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-green-500'>
                      {uploadButtonText}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600'>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price'
                  required
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='guest' className='block text-gray-600'>
                  Available seats
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                  name='seats'
                  id='seats'
                  type='number'
                  placeholder='Available seats
                  '
                  required
                />
              </div>
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Instructor Email
              </label>


              <input
                id='email'
                className='block rounded-md focus:green-300 w-full px-4 py-3 text-gray-800  border border-green-300 focus:outline-green-500 '
                name='email'
                type="email"
              ></input>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-green-500'
        >
          {/* {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Save & Continue'
          )} */}
          Save
        </button>
      </form>
    </div>
  )
}

export default AddClassForm;
