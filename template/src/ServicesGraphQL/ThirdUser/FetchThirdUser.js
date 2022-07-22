import api from '@/ServicesGraphQL'
import handleError from '@/Services/utils/handleError'

const queryFetchThirdUser = `
  query getAcces ($acteur_id: ID!) {
    acces (where: { r_acteur: { id: $acteur_id } r_particulier: { id_ncontains: 133 } }) {
      id
      r_login
      r_particulier {
        id
        r_nom
        r_prenom
      }
      r_profil {
        id
        r_code
        r_libelle
      }
    }
  }
`

export default async ({ acteurId }) => {
  let response
  try {
    response = await api
      .query(queryFetchThirdUser, { acteur_id: acteurId })
      .toPromise()
  } catch (err) {
    return handleError({
      message: 'Erreur lors de la requête',
      data: '',
      status: '',
    })
  }
  console.debug('queryFetchThirdUser : ', response.data.acces)
  return response.data.acces
}
