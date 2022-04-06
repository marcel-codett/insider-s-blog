import Link from 'next/link'
import { useState } from 'react'
import { auth, provider } from '../firebase'

interface user {
  user: {
    email: string
  }
}
const Header = () => {
  const [user, setUser] = useState<any>()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result: object) => {
        console.log(result)
        setUser(result)
      })
      .catch((error: any) => {
        alert(error.message)
      })
  }
  return (
    <header className="mx-auto mb-10 flex max-w-7xl justify-between pt-6">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-40 cursor-pointer object-contain"
            src="https://www.linkpicture.com/q/logo_366.png"
            alt="insiders_logo"
          />
        </Link>
        <div
          className="item-center hidden
          space-x-5 md:inline-flex"
        >
          <Link href="/">
            <h3 className="cursor-pointer">Home</h3>
          </Link>
          <Link href="/">
            <h3 className="cursor-pointer">Contact</h3>
          </Link>
          <h3
            className="rounded-full bg-green-600
          px-4 py-1 text-white"
          >
            Follow
          </h3>
        </div>
      </div>
      <div
        className="flex
        items-center space-x-5
      text-green-600"
      >
        <h3 onClick={signIn} className="cursor-pointer">
          {!user ? `Sign In` : `Sign Out`}
        </h3>
        <h3
          className="cursor-pointer rounded-full border border-green-600 px-4
        py-1"
        >
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
