import { createFileRoute } from '@tanstack/react-router'
import FavouriteNews from '../components/pages/FavouriteNews'

export const Route = createFileRoute('/favourite')({
  component: FavouriteNews,
})