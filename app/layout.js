import { Fugaz_One, Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"]})
const fugaz = Fugaz_One({ subsets: ["latin"], weight:['400']})

export const metadata = {
  title: "TrackR",
  description: "Track your spending throughout the year",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>TrackR</h1>
      <div className="flex items-center justify-between ">
        PLACEHOLDER
      </div>
    </header>
  )
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-600 ' + fugaz.className}>Created with Node.js</p>
    </footer>
  )

  return (
    <html lang="en">
      <body
        className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700'}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
