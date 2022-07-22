import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ p_session, p_id_otp, p_code }) => {
  console.debug(`{
      p_session : ${p_session},
      p_id_otp: ${p_id_otp},
      p_code: ${p_code},
    }`)
  let response
  try {
    response = await api.post('_verification_otp_declaration', {
      p_session,
      p_id_otp,
      p_code,
    })
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response.data._status !== 1) {
    console.debug(response.data)
    return handleError({
      message: response.data.lib_error,
      data: '',
      status: response.data._status,
    })
  }
  return response.data
}
