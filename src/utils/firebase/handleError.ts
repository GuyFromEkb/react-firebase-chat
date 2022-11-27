import { FirebaseError } from "firebase/app";

/**
 * Обработка (основных) ошибок firebase  по кодам
 *
 * @param {unknown} error unknown
 * @return Erroor Message
 */
const handleFirebaseError = (error: unknown) => {
  const errorCode = (error as FirebaseError).code

  switch (errorCode) {
    case "auth/user-not-found":
      return "User with such data was not found"
    case "auth/wrong-password":
      return "Wrong password"
    case "auth/popup-closed-by-user":
      return null
    default:
      return "Something went wrong :("
  }
}

export { handleFirebaseError }
