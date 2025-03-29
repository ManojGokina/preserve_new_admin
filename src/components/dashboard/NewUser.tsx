import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { registerUser, resetState } from '../../store/userSlice';
import type { AppDispatch, RootState } from '../../store/store';
import { useToast } from '../../common/toastContainer';

type FormDataType = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalcode: string;
  passcode: string;
};

function NewUser() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormDataType>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    city: '',
    state: '',
    postalcode: '',
    passcode: '',
  });

  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (success) {
      toast.success('User created successfully!');
      dispatch(resetState());
      navigate('/dashboard/users');
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate, dispatch, toast]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length > 25) {
      errors.username = 'Username must not exceed 25 characters';
    }

    // First name validation
    if (!formData.firstname) {
      errors.firstname = 'First name is required';
    } else if (formData.firstname.length > 50) {
      errors.firstname = 'First name must not exceed 50 characters';
    }

    // Last name validation
    if (!formData.lastname) {
      errors.lastname = 'Last name is required';
    } else if (formData.lastname.length > 50) {
      errors.lastname = 'Last name must not exceed 50 characters';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    } else if (formData.email.length > 50) {
      errors.email = 'Email must not exceed 50 characters';
    }

    // Phone validation
    if (formData.phone && formData.phone.length > 20) {
      errors.phone = 'Phone number must not exceed 20 characters';
    }

    // Country validation
    if (formData.country && formData.country.length > 25) {
      errors.country = 'Country must not exceed 25 characters';
    }

    // Address validation
    if (formData.address && formData.address.length > 200) {
      errors.address = 'Address must not exceed 200 characters';
    }

    // City validation
    if (formData.city && formData.city.length > 25) {
      errors.city = 'City must not exceed 25 characters';
    }

    // State validation
    if (formData.state && formData.state.length > 25) {
      errors.state = 'State must not exceed 25 characters';
    }

    // Postal code validation
    if (formData.postalcode && formData.postalcode.length > 15) {
      errors.postalcode = 'Postal code must not exceed 15 characters';
    }

    // Password validation
    if (!formData.passcode) {
      errors.passcode = 'Password is required';
    } else if (formData.passcode.length < 6) {
      errors.passcode = 'Password must be at least 6 characters';
    } else if (formData.passcode.length > 200) {
      errors.passcode = 'Password must not exceed 200 characters';
    }

    if (formData.passcode !== confirmPasscode) {
      errors.confirmPasscode = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await dispatch(registerUser(formData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/dashboard/users')} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-white">Add New User</h1>
        </div>
        <div className="rounded-lg backdrop-blur-lg bg-white/10 shadow-lg border border-white/10">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  maxLength={25}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.username ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter username"
                />
                {formErrors.username && <p className="mt-1 text-sm text-red-400">{formErrors.username}</p>}
              </div>

              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-white mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  maxLength={50}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.firstname ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter first name"
                />
                {formErrors.firstname && <p className="mt-1 text-sm text-red-400">{formErrors.firstname}</p>}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-white mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  maxLength={50}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.lastname ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter last name"
                />
                {formErrors.lastname && <p className="mt-1 text-sm text-red-400">{formErrors.lastname}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={50}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.email ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter email"
                />
                {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={20}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.phone ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter phone number"
                />
                {formErrors.phone && <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  maxLength={25}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.country ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter country"
                />
                {formErrors.country && <p className="mt-1 text-sm text-red-400">{formErrors.country}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  maxLength={200}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.address ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter address"
                />
                {formErrors.address && <p className="mt-1 text-sm text-red-400">{formErrors.address}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  maxLength={25}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.city ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter city"
                />
                {formErrors.city && <p className="mt-1 text-sm text-red-400">{formErrors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-white mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  maxLength={25}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.state ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter state"
                />
                {formErrors.state && <p className="mt-1 text-sm text-red-400">{formErrors.state}</p>}
              </div>

              <div>
                <label htmlFor="postalcode" className="block text-sm font-medium text-white mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalcode"
                  name="postalcode"
                  value={formData.postalcode}
                  onChange={handleChange}
                  maxLength={15}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.postalcode ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter postal code"
                />
                {formErrors.postalcode && <p className="mt-1 text-sm text-red-400">{formErrors.postalcode}</p>}
              </div>
            </div>
            <hr className="border-white/20 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="passcode" className="block text-sm font-medium text-white mb-1">
                  Passcode
                </label>
                <input
                  type="password"
                  id="passcode"
                  name="passcode"
                  value={formData.passcode}
                  onChange={handleChange}
                  maxLength={200}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.passcode ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Enter passcode"
                />
                {formErrors.passcode && <p className="mt-1 text-sm text-red-400">{formErrors.passcode}</p>}
              </div>
              <div>
                <label htmlFor="confirmPasscode" className="block text-sm font-medium text-white mb-1">Confirm Passcode</label>
                <input
                  type="password"
                  id="confirmPasscode"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  maxLength={200}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 ${formErrors.confirmPasscode ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  placeholder="Confirm password"
                />
                {formErrors.confirmPasscode && <p className="mt-1 text-sm text-red-400">{formErrors.confirmPasscode}</p>}
              </div>
            </div>
            <hr className="border-white/20 my-4" />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard/users')}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create User</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;