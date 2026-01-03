import { createFileRoute } from '@tanstack/react-router'
import FavouritePosts from '../components/pages/FavouritePosts'

export const Route = createFileRoute('/favourite')({
  component: FavouritePosts,
})