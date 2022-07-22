import api from '@/Services'
import handleError from '@/Services/utils/handleError'
import { Upload } from '@/ServiceUpload/Upload'

export default async ({
  p_session,
  p_formulaire,
  p_client,
  p_fournisseur,
  p_param_formulaire_valeur,
  p_param_formulaire_saisi_service,
}) => {
  let response
  try {
    let newParametreList = []
    console.debug('started save parametre')

    for (const parametre of p_param_formulaire_valeur) {
      console.debug('parametre :: ', parametre)
      if (parametre.r_type === 'file') {
        console.debug("parametre.r_type == 'file'")
        if (!parametre.file) {
          return handleError({
            message: 'Le fichier est requis',
            data: '',
            status: response?.data._status,
          })
        }
        // save file here
        console.debug('Upload started')
        const responseUpload = await Upload(parametre.file)
        console.debug('responseUpload : ', responseUpload)
        let newParametre = {
          id: parametre.id,
          r_obligatoire: parametre.r_obligatoire,
          r_valeur: responseUpload?._description.url,
        }
        newParametreList.push(newParametre)
      } else {
        newParametreList.push(parametre)
      }
    }

    p_param_formulaire_valeur = newParametreList.slice()

    const data = {
      p_session,
      p_client,
      p_fournisseur,
      p_formulaire,
      p_param_formulaire_valeur,
      p_param_formulaire_saisi_service,
    }

    console.debug(data)

    response = await api.post('_ajout_conf_param_service', data)
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response.data._status !== 1) {
    console.debug(response.data)
    return handleError({
      message: response.data.lib_error,
      data: '',
      status: response.data._status,
    })
  }
  return response.data
}
