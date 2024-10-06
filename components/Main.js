import React from 'react'

// Home/index page (default page upon opening up website)
export default function Main(props) {
    const { children } = props
  return (
    <main>
        {children}
    </main>
  )
}
