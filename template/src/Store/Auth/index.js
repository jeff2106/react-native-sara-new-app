import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import LoginUser from '@/Store/Auth/LoginUser'
import Logout from '@/Store/Auth/Logout'
import RegisterUser from '@/Store/Auth/RegisterUser'
import RegisterOTP from '@/Store/Auth/RegisterOTP'
import ResetPasswordInit from '@/Store/Auth/ResetPasswordInit'
import ResetPasswordModifPassword from '@/Store/Auth/ResetPasswordModifPassword'
import ResetPasswordVerifOTP from '@/Store/Auth/ResetPasswordVerifOTP'
import ResetLogin from '@/Store/Auth/ResetLogin'
import SetEmail from '@/Store/Auth/SetEmail'
import ClearUser from '@/Store/Auth/ClearUser'
import FetchFournisseursConfigures from '@/Store/Auth/FetchFournisseursConfigures'
import UpdateProfilPicture from '@/Store/Auth/UpdateProfilPicture'
import DeleteProfilPicture from '@/Store/Auth/DeleteProfilPicture'
import UpdateParticulier from '@/Store/Auth/UpdateParticulier'
import UpdatePassword from '@/Store/Auth/UpdatePassword'

const sliceInitialState = {
  item: {},
  email: '',
  fournisseursConfigures: [],
}

export default buildSlice(
  'auth',
  [
    LoginUser,
    Logout,
    RegisterUser,
    RegisterOTP,
    ResetPasswordInit,
    ResetPasswordVerifOTP,
    ResetPasswordModifPassword,
    ResetLogin,
    SetEmail,
    ClearUser,
    FetchFournisseursConfigures,
    UpdateProfilPicture,
    DeleteProfilPicture,
    UpdateParticulier,
    UpdatePassword,
  ],
  sliceInitialState,
).reducer
