import {
  showErrorToast,
  showInfoToast,
  showSucessToast,
} from '@/Components/Alert'
import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native'

// file:{ ext: '', name: ''}
export default function async(downloadUrl, { name, ext }) {
  const signalError = () => {
    showErrorToast('Erreur', 'Erreur lors du téléchargement du document')
  }

  try {
    const {
      dirs: { DownloadDir, DocumentDir },
    } = RNFetchBlob.fs
    const isIOS = Platform.OS === 'ios'
    const directoryPath = Platform.select({
      ios: DocumentDir,
      android: DownloadDir,
    })
    const filePath = `${directoryPath}/${name}.${ext}`
    const fileExt = ext
    let mimeType = ''

    if (fileExt === 'pdf') {
      mimeType = 'application/pdf'
    }
    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
      mimeType = 'image/*'
    }
    if (fileExt === 'avi' || fileExt === 'mp4' || fileExt === 'mov') {
      mimeType = 'video/*'
    }

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: fileExt,
        notification: true,
      },
      android: {
        fileCache: true,
        appendExt: fileExt,
        addAndroidDownloads: {
          useDownloadManager: true,
          mime: mimeType,
          title: name,
          mediaScannable: true,
          notification: true,
        },
      },
    })

    showInfoToast('Information', 'Téléchargement en cours')

    RNFetchBlob.config(configOptions)
      .fetch('GET', downloadUrl)
      .then(resp => {
        console.log(resp)
        showSucessToast('Succès', 'Téléchargement terminé')
        if (isIOS) {
          RNFetchBlob.ios.openDocument(resp.data)
        }
      })
      .catch(e => {
        // signalError()
        console.log('fetch error: ', e)
      })
  } catch (error) {
    signalError()
    console.log('general error: ', error)
  }
}
