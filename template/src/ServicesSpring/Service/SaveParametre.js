import api from '@/ServicesSpring'
import handleError from '@/ServicesSpring/utils/handleError'
import { Upload } from '@/ServiceUpload/Upload'

export default async data => {
  let response
  try {
    let newParametreList = []
    console.debug('started save parametre')

    for (const parametre of data.r_parametres) {
      console.debug('parametre ::: ', parametre)
      if (parametre.r_type === 'file') {
        console.debug("parametre.r_type === 'file'")
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
          ...parametre,
          r_valeur: responseUpload?._description.url,
        }
        delete newParametre.file
        newParametreList.push(newParametre)
      }

      newParametreList.push(parametre)
    }

    data.r_parametres = newParametreList.slice()

    response = await api.post('configuration/save', { ...data })
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response.data._status !== 1) {
    return handleError({
      message: response.data.lib_error,
      data: '',
      status: response.data._status,
    })
  }
  return response.data
}
