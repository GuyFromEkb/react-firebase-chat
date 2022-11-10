import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth"
import { setDoc, doc, getDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { makeAutoObservable, runInAction } from "mobx"
import { auth, storage, db } from "../firebase"
import { IFormDataLogin } from "../pages/login/LoginPage"
import { IFormData } from "../pages/register/RegisterPage"
import { authObserver } from "../utils/firebase/authObserver"

export class AuthStore {
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

  login = async (userData: IFormDataLogin) => {
    this.isLoading = true
    const { user } = await signInWithEmailAndPassword(auth, userData.email, userData.password)

    runInAction(() => {
      this.user = user
      this.isLoading = false
    })
  }

  loginWithGoogleAcc = async () => {
    const provider = new GoogleAuthProvider()
    this.isLoading = true

    try {
      const { user } = await signInWithPopup(auth, provider)

      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await Promise.all([
          setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
          setDoc(doc(db, "userChats", user.uid), {}),
        ])
      }

      runInAction(() => {
        this.user = user
        this.isLoading = false
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  logOut = async () => {
    await signOut(auth)

    runInAction(() => {
      this.user = null
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
