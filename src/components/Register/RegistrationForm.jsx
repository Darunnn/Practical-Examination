import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data) => {
    
    setShowForm(false); 
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {!showForm && (
        <button 
          onClick={() => setShowForm(true)} 
          className="w-full bg-green-500 text-white py-2 rounded-md mb-4"
        >
          Create Register
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className="w-full p-2 border rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Register</button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)} 
              className="bg-gray-400 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
