import fb from "firebase/app"
import firebaseConfig from "../config/keys"
export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app()