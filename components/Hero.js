import React from 'react'
import { Fugaz_One} from "next/font/google";
import Button from './Button';
import Calendar from './Calendar';
import Link from 'next/link';


const fugaz = Fugaz_One({ subsets: ["latin"], weight:['400']})

export default function Hero() {
  return (
    <div className='px-4 md:px-10 py-4 md:py-10 flex flex-col gap-4 sm:gap-8'>
        <h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}><span className="textGradient">TrackR</span> Helps you track your <span className="textGradient">daily</span> spending</h1>
        <p className='text-lg sm:text-xl md:text-2x w-full mx-auto max-w-[700px] text-center'>Create your spending record to see how much you're spending <span className='font-semibold'>throughout the year</span></p>
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
          <Link href={'/dashboard'}>
            <Button text="Sign up"/>
          </Link>
          <Link href={'/dashboard'}>
            <Button text="Log In" dark/>
          </Link>
        </div>
        <Calendar demo />
    </div>
  )
}
