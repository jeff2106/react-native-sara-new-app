import api from '@/ServicesGraphQL'
import handleError from '@/Services/utils/handleError'

const queryFetchTypeMoyenPaiement = `
  query getTypeMoyenPaiement {
    typeMoyenPaiements {
      id
      r_code
      r_statut
      r_libelle
      r_image_url
    }
  }
`

export default async () => {
  let response
  try {
    response = await api.query(queryFetchTypeMoyenPaiement).toPromise()
    console.debug('typeMoyenPaiements --> ', response.data.typeMoyenPaiements)
  } catch (err) {
    return handleError({
      message: 'Erreur lors de la requête',
      data: '',
      status: '',
    })
  }
  return response.data.typeMoyenPaiements
}
