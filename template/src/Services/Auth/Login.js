import api from '@/Services'
import handleError from '@/Services/utils/handleError'
import publicIP from 'react-native-public-ip'

export default async loginData => {
  console.debug('loginData : ', loginData)

  if (!loginData.p_login && !loginData.p_mdp) {
    return handleError({
      message: "L'identifiant et le mot de passe sont requis",
      data: '',
      status: '',
    })
  }

  let p_ip
  try {
    p_ip = await publicIP()
  } catch (e) {
    p_ip = null
  }

  let response
  try {
    response = await api.post('_auth', { ...loginData, p_ip })
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }

  if (!response.data) {
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }

  if (response.data && response.data._status !== 1) {
    console.debug(response.data)
    return handleError({
      message: response?.data.lib_error,
      data: '',
      status: response?.data._status,
    })
  }

  return response.data
}
