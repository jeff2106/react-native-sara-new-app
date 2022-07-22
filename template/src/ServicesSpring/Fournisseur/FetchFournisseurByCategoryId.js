import api, { handleError } from '@/ServicesSpring'

export default async categoryId => {
  if (!categoryId) {
    console.debug('La categorie est requise')
    return handleError({ message: 'La categorie est requise' })
  }
  let response
  try {
    response = await api.get(`service/fournisseur/category/${categoryId}`)
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
