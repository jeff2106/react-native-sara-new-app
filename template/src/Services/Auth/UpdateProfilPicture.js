import api from '@/Services'
import apiUpload from '@/ServiceUpload'
import handleError from '@/Services/utils/handleError'

export default async ({ acteur, particulier, session, file = null }) => {
  console.debug('acteur : ', acteur)
  console.debug('particulier : ', particulier)
  console.debug('session : ', session)
  console.debug('file : ', file)
  let responseUpload
  try {
    let formData = new FormData()

    formData.append('file', {
      name: file.fileName,
      size: file.fileSize,
      type: file.type,
      uri: file.uri,
      height: file.height,
      width: file.width,
    })
    formData.append('p_id_acteur', acteur)

    responseUpload = await apiUpload.post('_uploadFileUser', formData)
    console.debug(responseUpload?.data)
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur lors du chargement du fichier, veuillez réessayer.',
      data: '',
      status: -1,
    })
  }
  if (responseUpload?.data._status !== 1) {
    return handleError({
      message: responseUpload?.data._description,
      data: '',
      status: responseUpload?.data._status,
    })
  }

  let response
  try {
    response = await api.post('_maj_acteur_url', {
      p_session: session,
      p_id_particulier: particulier,
      p_image_url: responseUpload.data._description.url,
    })
  } catch (e) {
    console.log(response)
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response?.data._status !== 1) {
    console.log(response)
    return handleError({
      message: response?.data._description,
      data: '',
      status: response?.data._status,
    })
  }
  return response.data
}
