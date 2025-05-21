import { useState } from "react"
import { auth, googleProvider} from "../Firebase/Firebase"
import { createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth"
 const Auth=()=>{
    const [email, setEmail]=useState("");
    const [pass, setPass]=useState("");
    const signin= async ()=>{
        try{
        await createUserWithEmailAndPassword(auth, email, pass)}
        catch(err){
            alert('password must be greater than six')
        }
    }
    const signIn= async ()=>{
        try{
        await signInWithPopup(auth, googleProvider)}
        catch(err){
            alert('password must be greater than six')
        }
    }
  return(  <div>
        <input placeholder="Email...." onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
        <button onClick={signin}>Sign in</button>
        <button onClick={signIn}>Sign in</button>
    </div>
  )
}

export default Auth