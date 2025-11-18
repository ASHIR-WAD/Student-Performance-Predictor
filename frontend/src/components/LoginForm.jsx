import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)
const validatePassword = (p) => p && p.length >= 6


export default function LoginForm(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate()


const handleLogin = async (e) =>{
e.preventDefault(); setError('')
if(!validateEmail(email)) return setError('Enter a valid email')
if(!validatePassword(password)) return setError('Enter a valid password')


try{
await signInWithEmailAndPassword(auth, email, password)
navigate('/dashboard')
}catch(err){
console.error(err); setError(err.message || 'Failed to sign in')
}
}


return (
<form onSubmit={handleLogin} className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700">Email</label>
<input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border p-2" placeholder="you@example.com" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700">Password</label>
<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border p-2" />
</div>
{error && <p className="text-sm text-red-600">{error}</p>}
<div>
<button className="w-full py-2 rounded-lg bg-sky-600 text-white font-semibold">Sign in</button>
</div>
</form>
)
}