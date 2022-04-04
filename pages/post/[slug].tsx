import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  await fetch('.api/createComment', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(() => {
      console.log(data)
    })
    .catch((error) => console.log(error.message))
}

function Post({ post }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  return (
    <main>
      <Header />

      <img
        className="mx-auto h-60 w-full  object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5 ">
        <h1 className="mt-10 mb-10 text-4xl ">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500"></h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full
            object-cover"
            src={urlFor(post.author.image).url()}
            alt=""
          />
          <p className="font-extraLight text-xs">
            Blog post by{' '}
            <span className="text-green-500">{post.author.name}</span> -
            Published at
            {/* {new Date(post._createdAt.toLocaleString())} */}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => <h1 className="py-5 text-xl">{props}</h1>,
              h2: (props: any) => <h1 className="py-5 text-xl">{props}</h1>,
              li: ({ children }: any) => (
                <h1 className="ml-4 list-disc">{children}</h1>
              ),
              link: ({ children, href }: any) => (
                <h1 className="text-blue-500 hover:underline">{children}</h1>
              ),
            }}
          />
        </div>
      </article>

      <hr className="my-5 mx-auto max-w-lg border border-yellow-500 " />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 mx-auto mb-10 flex max-w-2xl flex-col"
      >
        <h3 className="text-sm text-yellow-500">Enjoyed this Article</h3>
        <h3 className="text-3xl font-bold">Leave a comment below!</h3>
        <hr className="mt-2 py-3" />

        <input {...register(`_id`)} type="hidden" name="_id" value={post._id} />
        <label className="black mb-5">
          <span className="text-grey-700">Name</span>
          <input
            {...register('name', { required: true })}
            className="form-input mt-1 block w-full rounded border py-2 px-3
           shadow outline-none ring-1 ring-yellow-500 focus:ring"
            placeholder="John Kennedy "
            type="text"
          />
        </label>
        <label className="black mb-5">
          <span className="text-grey-700">Email</span>
          <input
            {...register('email', { required: true })}
            className="form-input mt-1 block w-full rounded border py-2 px-3
          shadow outline-none ring-1 ring-yellow-500 focus:ring"
            placeholder="John Kennedy "
            type="emai"
          />
        </label>
        <label className="black mb-5">
          <span className="text-grey-700">Comment</span>
          <textarea
            {...register('comment', { required: true })}
            className="form-textarea block w-full rounded border py-2 px-3 pt-1
            shadow outline-none ring-1 ring-yellow-500 focus:ring"
            placeholder="type message"
            rows={8}
          ></textarea>
        </label>

        <div className="flex flex-col p-5">
          {errors.name && (
            <span className="text-red-500">The Name field is required</span>
          )}
          {errors.email && (
            <span className="text-red-500">The Email field is required</span>
          )}
          {errors.comment && (
            <span className="text-red-500">The Comment field is required</span>
          )}
        </div>

        <input
          type="submit"
          className="focus:shadow-outline cursor-pointer
        rounded bg-yellow-500 py-2
        px-4 font-bold text-white hover:bg-yellow-400 focus:outline-none"
        />
      </form>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[ _type == "post"]{
        _id,
        slug{
      current
    }
       
      }
    `

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[ _type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
        name,
        image
    },
    description,
    mainImage,
    slug,
    body
  }
`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },

    revalidate: 60, //update
  }
}
