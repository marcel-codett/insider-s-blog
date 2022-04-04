import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import PostLink from '../components/PostLink'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts)

  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div
        className="flex items-center justify-between
      border-y border-black bg-yellow-400 
      py-10 lg:p-0"
      >
        <div className=" space-y-5 px-10">
          <h1
            className="max-w-xl 
          font-serif text-6xl"
          >
            <span
              className="
           underline decoration-black
           decoration-4"
            >
              Medium
            </span>{' '}
            is a place to write read and connect
          </h1>

          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers
          </h2>
        </div>

        <img
          className=" hidden h-32 md:inline-flex lg:h-full"
          src="https://d15omoko64skxi.cloudfront.net/wp-content/uploads/2015/05/Medium-logo-dark500-300x300.png"
          alt=""
        />
      </div>

      {/* posts */}
      <div
        className="lg-grid-3 grid grid-cols-1 gap-3 p-2
    md:grid-cols-2 md:gap-6 md:p-6 "
      >
        {posts.map((post) => (
          <PostLink
            _id={post._id}
            author={post.author}
            description={post.description}
            mainImage={post.mainImage}
            slug={post.slug}
            title={post.title}
          />
        ))}
      </div>
    </div>
  )
}

// export default Home
export const getServerSideProps = async () => {
  const query = `*[ _type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
    
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
