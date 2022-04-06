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
      border-y border-black bg-green-600 
      py-10 lg:p-0"
      >
        <div className=" space-y-5 p-10">
          <h1
            className="font-montserrat 
          max-w-xl text-6xl text-white"
          >
            <span
              className="
              font-extrabold
              text-white
           underline decoration-white
           decoration-4"
            >
              Insider
            </span>{' '}
            is a community that share Experience
          </h1>

          <h2 className="text-white">
            Give free to contents to millions of readers on variety of topics
            and connections with millions of readers
          </h2>
        </div>

        <img
          className=" mr-10 hidden h-32 md:inline-flex lg:h-full"
          src="insider.png"
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
