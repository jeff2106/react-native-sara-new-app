import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ session, acteur }) => {
  let response
  try {
    response = await api.get(
      `_get_declaration_client/?p_session=${session}&p_id_client=${acteur}`,
    )
    if (response.data._status !== 1) {
      return handleError({
        message: response.data.lib_error,
        data: '',
        status: response.data._status,
      })
    }
    return response.data
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
