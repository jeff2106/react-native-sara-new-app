import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.get(`_get_dashbord_items/?p_session=${data.p_session}`)
    if (response.data._status !== 1) {
      return handleError({
        message: response.data.lib_error,
        data: '',
        status: response.data._status,
      })
    }
    return response.data._description
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
