export interface Post {
  _id: string
  title: string
  author: {
    name: string
    image: string
  }
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [object]
}

export interface PostLink {
  _id: string
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  author: {
    name: string
    image: string
  }
  title: string
  slug: {
    current: string
  }
}
