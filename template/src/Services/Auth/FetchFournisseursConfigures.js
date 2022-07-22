import api, { handleError } from '@/Services'

export default async ({ acteur, session }) => {
  if (!session) {
    console.debug('La session est requise')
    return handleError({ message: 'La session est requise' })
  }
  let response
  try {
    response = await api.get(
      `_get_configuration_by_client/?p_session=${session}&p_id_acteur=0&p_id_client=${acteur}`,
    )
    if (response.data._status !== 1) {
      return handleError({
        message: response.data.lib_error,
        data: '',
        status: response.data._status,
      })
    }
    console.debug('_get_configuration_by_client :', response.data._description)
    return response.data._description
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
