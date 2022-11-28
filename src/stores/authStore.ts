import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { makeAutoObservable, runInAction } from "mobx"

import { auth, db, storage } from "../firebase"
import { IRegisterInputs } from "../pages/register/RegisterPage"
import { authObserver } from "../utils/firebase/authObserver"
import { handleFirebaseError } from "../utils/firebase/handleError"

export class AuthStore {
  user: User | null = null
  isLoading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  reset = () => {
    this.isLoading = false
    this.error = null
  }

  registerUser = async (userData: IRegisterInputs) => {
    this.reset()
    this.isLoading = true

    const { email, password, displayName, avatar } = userData
    const avatarImg = avatar?.[0]

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      runInAction(() => (this.user = user))

      const avatarUrl = await this.uploadAvatar(avatarImg, displayName)

      await Promise.all([
        updateProfile(user, {
          displayName,
          photoURL: avatarUrl,
        }),
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName,
          email,
          photoURL: avatarUrl,
        }),
        setDoc(doc(db, "userChats", user.uid), {}),
      ])

      return true
    } catch (error) {
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  private uploadAvatar = async (avatarImg: File | undefined, displayName: string) => {
    if (!avatarImg) return null

    const date = new Date().getTime()
    const storageRef = ref(storage, `${displayName + date}`)
    await uploadBytesResumable(storageRef, avatarImg)

    const avatarURL = await getDownloadURL(storageRef)
    return avatarURL
  }

  login = async (userData: { email: string; password: string }) => {
    this.reset()
    this.isLoading = true
    try {
      const { user } = await signInWithEmailAndPassword(auth, userData.email, userData.password)
      runInAction(() => {
        this.user = user
      })
      return true
    } catch (error) {
      runInAction(() => {
        this.error = handleFirebaseError(error)
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  loginWithGoogleAcc = async () => {
    this.reset()
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
    } catch (error) {
      handleFirebaseError(error)
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

  firstRenderCheckAuth = async () => {
    this.isLoading = true
    const res = await authObserver(auth)

    runInAction(() => {
      this.user = res
      this.isLoading = false
    })
  }
}

// registerUser = async (userData: IRegisterInputs) => {
//   this.reset()
//   const { email, password, displayName, avatar } = userData

//   console.log("userData", userData.avatar?.[0])

//   // if (!avatar) return
//   // this.isLoading = true
//   // const { user } = await createUserWithEmailAndPassword(auth, email, password)
//   // runInAction(() => (this.user = user))

//   // const date = new Date().getTime()
//   // const storageRef = ref(storage, `${displayName + date}`)

//   // await uploadBytesResumable(storageRef, avatar)
//   // const avatarURL = await getDownloadURL(storageRef)

//   // await updateProfile(user, {
//   //   displayName,
//   //   photoURL: avatarURL,
//   // })

//   // await setDoc(doc(db, "users", user.uid), {
//   //   uid: user.uid,
//   //   displayName,
//   //   email,
//   //   photoURL: avatarURL,
//   // })

//   // await setDoc(doc(db, "userChats", user.uid), {})

//   // runInAction(() => {
//   //   this.isLoading = false
//   // })
// }
