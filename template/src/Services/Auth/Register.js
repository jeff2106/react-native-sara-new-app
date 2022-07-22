import api from '@/Services'
import apiUpload from '@/ServiceUpload'
import handleError from '@/Services/utils/handleError'

export default async ({ registerData, file = null }) => {
  console.debug('registerData : ', registerData)
  let responseUpload
  if (file) {
    try {
      let formData = new FormData()
      formData.append('r_acteur', 0)
      formData.append('file', file)

      responseUpload = await apiUpload.post('_uploadFileUser', formData)
    } catch (e) {
      console.debug(e)
      return handleError({
        message: 'Erreur lors du chargement du fichier, veuillez réessayer.',
        data: '',
        status: -1,
      })
    }
    if (responseUpload?.data._status !== 1) {
      console.debug(responseUpload.data)
      return handleError({
        message: responseUpload?.data._description,
        data: '',
        status: responseUpload?.data._status,
      })
    }
  }

  let response
  try {
    response = await api.post('_create_user_acteur', {
      ...registerData,
      p_procuration_url: responseUpload
        ? responseUpload.data._description.url
        : 'Ok',
    })
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response?.data._status !== 1) {
    console.debug(response.data)
    return handleError({
      message: response?.data._description,
      data: '',
      status: response?.data._status,
    })
  }
  return response.data
}
