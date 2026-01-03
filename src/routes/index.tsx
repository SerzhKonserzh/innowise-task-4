import { createFileRoute } from '@tanstack/react-router'
import Posts from '../components/pages/Posts'

export const Route = createFileRoute('/')({
  component: Posts,
})
  