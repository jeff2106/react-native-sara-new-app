import api, { handleError } from '@/ServiceUpload'

export default async ({ file, id_acteur }) => {
  let formData = new FormData()
  formData.append('file', file)

  let response
  try {
    response = await api.post('_uploadFileUser', formData)
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur lors du chargement du fichier, veuillez réessayer.',
      data: '',
      status: -1,
    })
  }
  return response.data
}
