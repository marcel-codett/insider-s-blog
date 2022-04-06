import React from 'react'
import { initialState } from './reducer'
export interface Post {
  _id: string
  title: string
  author: {
    name: string
    image: string
  }
  comments: Comment[]
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

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

export interface DataLayerProps {
  children: React.ReactNode
}

export type AppState = typeof initialState
export type Action = { type: 'SET_USER'; user: object }
