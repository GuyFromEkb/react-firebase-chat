import { IPervImg } from "../../components/chatInput/ChatInput"

/**
 * Принимает массив файлов с инпута
 *
 * @param {FileList} allFiles File[] in input
 * @return obj {name: file.name url: base64Url}
 */
const readAllFilesAsUrl = async (allFiles: FileList) => {
  return await Promise.all(
    [...allFiles].map((file) => {
      return readFileAsUrl(file)
    })
  )
}

const readFileAsUrl = (file: File) => {
  return new Promise<IPervImg>((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve({
        name: file.name,
        url: String(reader.result),
      })
    }

    reader.onerror = () => {
      reject(reader)
    }

    reader.readAsDataURL(file)
  })
}

export { readAllFilesAsUrl }
