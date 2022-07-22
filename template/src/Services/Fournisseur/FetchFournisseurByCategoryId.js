import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ categoryId, session }) => {
  if (!categoryId) {
    console.debug('La categorie est requise')
    return handleError({ message: 'La categorie est requise' })
  }
  let response
  try {
    response = await api.post('_get_fournisseur_by_categorie', {
      p_categorie_fournisseur: categoryId,
      p_session: session,
    })
    if (response.data._status !== 1) {
      return handleError({
        message: "Erreur lors de l'exécution de la requête, veuillez réessayer",
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
