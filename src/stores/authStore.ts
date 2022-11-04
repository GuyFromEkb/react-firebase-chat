import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { makeAutoObservable, runInAction } from "mobx"
import { auth, storage, db } from "../firebase"
import { IFormDataLogin } from "../pages/login/LoginPage"
import { IFormData } from "../pages/register/RegisterPage"
import { authObserver } from "../utils/firebase/authObserver"

class AuthStore {
  user: User | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
    this._checkAuth()
  }

  registerUser = async (userData: IFormData) => {
    const { email, password, displayName, avatar } = userData
    if (!avatar) return

    this.isLoading = true
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    runInAction(() => (this.user = user))

    const date = new Date().getTime()
    const storageRef = ref(storage, `${displayName + date}`)

    await uploadBytesResumable(storageRef, avatar)
    const avatarURL = await getDownloadURL(storageRef)

    await updateProfile(user, {
      displayName,
      photoURL: avatarURL,
    })

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName,
      email,
      photoURL: avatarURL,
    })

    await setDoc(doc(db, "userChats", user.uid), {})

    runInAction(() => {
      this.isLoading = false
    })
  }

  logOut = async () => {
    await signOut(auth)

    runInAction(() => {
      this.user = null
    })
  }

  login = async (userData: IFormDataLogin) => {
    this.isLoading = true
    const { user } = await signInWithEmailAndPassword(auth, userData.email, userData.password)

    runInAction(() => {
      this.user = user
      this.isLoading = false
    })
  }

  private _checkAuth = async () => {
    this.isLoading = true
    const res = await authObserver(auth)

    runInAction(() => {
      this.user = res
      this.isLoading = false
    })
  }
}

const authStore = new AuthStore()

export { authStore }
