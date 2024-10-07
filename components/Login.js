import React from 'react'
import { Fugaz_One} from "next/font/google";
import Button from './Button';

const fugaz = Fugaz_One({ subsets: ["latin"], weight:['400']})

export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>Login / Register</h3>
      <p>Improve your spending habits today!</p>
      <input className="max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600 " placeholder="Email" />
      <input className="max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600 " placeholder="Password" type="password" />
      <div className="max-w-[400px] w-full mx-auto ">
        <Button text="Submit" full/>
      </div>
      <p className="text-center">Dont have an account? <span className="text-indigo-500">Sign up now</span></p>
    </div>
  )
}
