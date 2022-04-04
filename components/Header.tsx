import Link from 'next/link'

const Header = () => {
  return (
    <header className="mx-auto mb-10 flex max-w-7xl justify-between pt-6">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-40 cursor-pointer object-contain"
            src="https://lever-client-logos.s3.us-west-2.amazonaws.com/762fd4bd-7d50-4ac3-80d3-bad44702bf87-1604363975963.png"
            alt="medium__logo"
          />
        </Link>
        <div
          className="item-center hidden
          space-x-5 md:inline-flex"
        >
          <h3>Home</h3>
          <h3>Contact</h3>
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
        <h3>Sign In</h3>
        <h3
          className="rounded-full border border-green-600 px-4
        py-1"
        >
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
