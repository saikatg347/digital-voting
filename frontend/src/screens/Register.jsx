import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import { userRegister } from '../features/user/userActions'

const RegisterScreen = () => {
  const { register, handleSubmit } = useForm()
  
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) navigate('/profile')
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }

    dispatch(userRegister(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-input'
          {...register('name')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='phone'>Phone</label>
        <input
          type='tel'
          className='form-input'
          {...register('phone')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Confirm Password</label>
        <input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        Register
      </button>
    </form>
  )
}

export default RegisterScreen
