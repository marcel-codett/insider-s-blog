import { PostLink } from '../typings'
import Link from 'next/link'
import { urlFor } from '../sanity'

const PostLink = ({
  _id,
  description,
  mainImage,
  author,
  slug,
  title,
}: PostLink) => {
  return (
    <div>
      <Link key={_id} href={`/post/${slug.current}`}>
        <div
          className="group 
        cursor-pointer overflow-hidden 
        rounded-lg
        border
       "
        >
          <img
            className="h-60 w-full
            object-cover 
            transition-transform duration-200 ease-in-out
             group-hover:scale-105"
            src={urlFor(mainImage).url()}
            alt=""
          />
          <div className="flex justify-between p-5">
            <div>
              <p className="text-lg font-bold">{title}</p>
              <p className="text-xs ">
                {description} by {author?.name}
              </p>
            </div>
            <div>
              <img
                className="h-12 w-12 
              rounded-full
              object-cover"
                src={urlFor(author.image).url()}
                alt=""
              />
            </div>
          </div>
          <div></div>
        </div>
      </Link>
    </div>
  )
}

export default PostLink
