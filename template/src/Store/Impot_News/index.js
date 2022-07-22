import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchDeclarations from './FetchDeclarations'
import FetchFormDeclaration from '@/Store/Impot/FetchFormDeclaration'
import SaveFormDeclaration from '@/Store/Impot/SaveFormDeclaration'
import VerifDeclarationOTP from '@/Store/Impot/VerifDeclarationOTP'
import FetchDeclarationsEffectue from '@/Store/Impot/FetchDeclarationsEffectue'
import UpdateFormDeclaration from '@/Store/Impot/UpdateFormDeclaration'
import UpdateConfig from '@/Store/Impot/UpdateConfig'
import FetchPayment from '@/Store/Impot/FetchPayment'
import FetchPaymentSuccess from '@/Store/Impot/FetchPaymentSuccess'
import FetchPaymentReject from '@/Store/Impot/FetchPaymentReject'
import FetchPaymentRequest from '@/Store/Impot/FetchPaymentRequest'

const sliceInitialState = {
  item: [],
  declarations: [],
  declarationsEffectue: [],
  form: [],
  paymentEnattente: [],
  paymentSuccess: [],
  paymentReject: [],
  R_fetchPaymentRequest: [],
}

export default buildSlice(
  'impot',
  [
    FetchDeclarations,
    FetchDeclarationsEffectue,
    FetchFormDeclaration,
    SaveFormDeclaration,
    VerifDeclarationOTP,
    UpdateFormDeclaration,
    UpdateConfig,
    FetchPayment,
    FetchPaymentSuccess,
    FetchPaymentReject,
    FetchPaymentRequest
  ],
  sliceInitialState,
).reducer
