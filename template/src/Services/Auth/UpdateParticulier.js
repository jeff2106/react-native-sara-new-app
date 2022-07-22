import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({
  p_session,
  p_nom,
  p_prenom,
  p_mobile,
  p_email,
  p_genre,
  p_indicatif_pays,
  p_code_pays_residence,
  p_id_acteur,
}) => {
  let response
  try {
    response = await api.post('_maj_acteur', {
      p_session,
      p_nom,
      p_prenom,
      p_mobile,
      p_email,
      p_genre,
      p_indicatif_pays,
      p_code_pays_residence,
      p_id_acteur,
    })
  } catch (e) {
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response.data._status !== 1) {
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response.data._status,
    })
  }

  return response.data
}
