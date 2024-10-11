'use client'

import React, { useState, useEffect} from 'react'
import { Fugaz_One} from "next/font/google";
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';

const fugaz = Fugaz_One({ subsets: ["latin"], weight:['400']})


export default function Dashboard() {
  const {currentUser, userDataObj, setUserDataObj, loading} = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  function countValues() {
    let total_number_of_days = 0
    let sum_spending = 0
    for (let year in data) {
      for (let month in data[year]){
        for (let day in data[year][month]) {
          let days_spending = data[year][month][day]
          total_number_of_days++
          sum_spending += days_spending
        }
      }
    }
    return {num_days : total_number_of_days, average_spending_rating: sum_spending / total_number_of_days}
  }
  
  async function handleSetSpending(spending) {

    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    try {
      const newData = {...userDataObj}
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = spending

      setData(newData)
      setUserDataObj(newData)

      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: spending
          }
        }
      }, { merge: true })
    } catch (error) {
      console.log('Failed to set data: ', error.message)
    }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}h ${60 - now.getMinutes()}m`
  }

  const spendings = {
    'Way below limit': '🔵',
    'Below limit': '🟢',
    'On limit': '🟡',
    'Above limit': '🟠',
    'Way above limit': '🔴',
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)

  }, [currentUser, userDataObj])


  if (loading) {
    return <Loading/>
  }

  if (!currentUser) {
    return <Login />
  }


  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12 ">
      <div className="p-4 grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg gap-4">
        {Object.keys(statuses).map((status, statusIndex) => {
          return(
            <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-s truncate ">{status.replaceAll('_', ' ')}</p>
              <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}</p>
            </div>
          )
        })}
      </div>
      <h4 className={'text-3xl sm:text-4xl md:text-5xl text-center ' + fugaz.className}>
        How much did you <span className='textGradient '>spend today?</span>
      </h4>
      <div className="grid grid-cols-5 md:grid-cols-5 gap-4">
        {Object.keys(spendings).map((spending, spendingIndex) => {
          return(
            <button onClick={() => {
              const currentSpendingValue = spendingIndex + 1
              handleSetSpending(currentSpendingValue)
            }}className={'p-4 rounded-2xl items-center purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center ' + (spendingIndex == 4 ? 'cols-span-2 ' : ' ')} key={spendingIndex}>
              <p className='text-indigo-500 '>{spending}</p>
              <p className={'text-1xl md:text-3xl ' + fugaz.className}>{spendings[spending]}</p>
            </button>
          )
        })}
      </div>
      <Calendar completeData={data} handleSetSpending={handleSetSpending}/>
    </div>
  )
}
