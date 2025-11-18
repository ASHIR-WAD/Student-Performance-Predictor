import React from 'react'
import { Link } from 'react-router-dom'


export default function Landing(){
return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
<div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-2xl grid md:grid-cols-2 gap-6">
<div className="p-4">
<h1 className="text-4xl font-extrabold mb-3">Campus Portal</h1>
<p className="text-gray-600 mb-6">Student & Faculty registration, authentication, and dashboard powered by Firebase.</p>
<div className="flex gap-3">
<Link to="/auth" className="px-4 py-2 rounded-lg bg-sky-600 text-white">Login / Signup</Link>
<Link to="/register" className="px-4 py-2 rounded-lg border border-sky-600 text-sky-600">Register</Link>
</div>
</div>
<div className="p-4 flex flex-col justify-center">
<img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=60" alt="campus" className="rounded-xl shadow-sm" />
</div>
</div>
</div>
)
}