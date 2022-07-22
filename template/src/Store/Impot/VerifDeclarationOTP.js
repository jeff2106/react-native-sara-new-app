import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { VerifDeclarationOTP } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('verifDeclarationOTP'),
  action: buildAsyncActions('impot/verifDeclarationOTP', VerifDeclarationOTP),
  reducers: buildAsyncReducers({
    errorKey: 'verifDeclarationOTP.error',
    loadingKey: 'verifDeclarationOTP.loading',
    itemKey: null,
  }),
}
