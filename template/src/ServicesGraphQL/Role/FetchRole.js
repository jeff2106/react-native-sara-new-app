import api from '@/ServicesGraphQL'
import handleError from '@/Services/utils/handleError'

const queryFetchRole = `
  query FetchRole($id: ID!) {
    acteurs (where: { id: $id }) {
      r_profils {
        id
        r_code
        r_libelle
        r_services {
          id
          r_code
          r_libelle
        }
        r_habilitations {
          id
          r_code
          r_libelle
          r_nature
          r_statut
        }
      }
    }
  }
`

export default async ({ acteurId }) => {
  let response
  try {
    response = await api.query(queryFetchRole, { id: acteurId }).toPromise()
  } catch (err) {
    return handleError({
      message: 'Erreur lors de la requête',
      data: '',
      status: '',
    })
  }
  return response.data.acteurs[0]?.r_profils
}
