import api from '@/ServicesGraphQL'
import handleError from '@/Services/utils/handleError'

const queryFetchSupportPaiement = `
  query getSupport ($id_acteur: ID!) {
    supports (where: { r_acteur: { id: $id_acteur }}) {
      id
      r_alias
      r_numero
      r_statut
      r_intitule
      r_reference
      r_moyen_paiement{
        id
        r_libelle
        r_image_url
        r_type_moyen_paiement{
          id
          r_libelle
        }
      }
    }
  }
`

export default async ({ id }) => {
  let response
  try {
    response = await api
      .query(queryFetchSupportPaiement, { id_acteur: id })
      .toPromise()
  } catch (err) {
    console.debug(err)
    return handleError({
      message: 'Erreur lors de la requête',
      data: '',
      status: '',
    })
  }
  return response.data.supports
}
