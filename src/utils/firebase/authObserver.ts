import { User, onAuthStateChanged, Auth } from "firebase/auth"
/**
 * Пришлось самому делать промис, на observerAuth от Firebase, т.к. это асинъронная ф-ция, но они почему то её сделали как синхронную..
 *
 * @param {Auth} auth getAuth() in firebase
 * @return user (если авторизован) | null
 */
const authObserver = (auth: Auth) => {
  return new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user || null)
    })
  })
}

export { authObserver }
