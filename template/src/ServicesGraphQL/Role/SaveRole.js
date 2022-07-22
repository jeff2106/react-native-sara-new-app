import api from '@/ServicesGraphQL'
import handleError from '@/Services/utils/handleError'

const mutationSaveRole = `
   mutation saveRole($r_code: String! $r_libelle: String!) {
     createProfil(input: {data: { r_code: $r_code, r_libelle: $r_libelle }}){
        profil {
          id
          r_code
          r_libelle
        }
     }
   }
`

export default async ({ code, libelle }) => {
  let response
  try {
    response = await api
      .mutation(mutationSaveRole, { r_code: code, r_libelle: libelle })
      .toPromise()
  } catch (err) {
    return handleError({
      message: 'Erreur lors de la sauvegarde',
      data: '',
      status: '',
    })
  }
  return response.data.createProfil.profil
}
