import api from '@/ServicesGraphQL'
import handleError from '@/Services/utils/handleError'

const queryFetchCategory = `
query getCategories {
    categories (where: { r_statut: 1 } sort :"r_rang") {
      id
      r_code
      r_libelle
      r_statut
      r_image_url
      r_rang
    }
}
`

export default async () => {
  let response
  try {
    response = await api.query(queryFetchCategory).toPromise()
  } catch (err) {
    return handleError({
      message: 'Erreur lors de la requête',
      data: '',
      status: '',
    })
  }
  return response.data.categories
}
