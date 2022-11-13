import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../../../firebase"

const putStorageImgItem = async (file: File, chatId: string) => {
  const date = new Date().getTime()
  const storageRef = ref(storage, `imgsChat/${chatId}/${file.name + date}`)
  await uploadBytesResumable(storageRef, file)
  return await getDownloadURL(storageRef)
}

const getStoregeImgItemUrls = async (chatId: string, files: File[]) => {
  return await Promise.all(files.map((file) => putStorageImgItem(file, chatId)))
}

export { getStoregeImgItemUrls }
