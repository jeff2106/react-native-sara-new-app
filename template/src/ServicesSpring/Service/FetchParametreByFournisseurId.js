import api, { handleError } from '@/ServicesSpring'

export default async fournisseurId => {
  if (!fournisseurId) {
    return handleError({ message: 'Le fournisseur est requis' })
  }
  let response
  try {
    response = await api.get(`parametre/fournisseur/${fournisseurId}`)
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
