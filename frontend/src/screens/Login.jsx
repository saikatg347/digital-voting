import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/user/userActions'
import { useEffect } from 'react'
import Error from '../components/Error'

const LoginScreen = () => {
  const { register, handleSubmit } = useForm()

  const { loading, userInfo, error } = useSelector((state) => state.user)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <>
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className='form-group'>
        <label htmlFor='phone'>Phone</label>
        <input
          type='phone'
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
      <button type='submit' className='button' disabled={loading}>
        Login
      </button>
    </form>
    <p>Not registered?</p>
          </>
  )
}

export default LoginScreen
