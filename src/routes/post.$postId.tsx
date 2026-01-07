import { createFileRoute } from '@tanstack/react-router'
import DetailedPost from '../components/pages/DetailedPost'

export const Route = createFileRoute('/post/$postId')({
  component: DetailedPost,
})