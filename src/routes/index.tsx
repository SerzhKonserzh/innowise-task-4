import { createFileRoute } from '@tanstack/react-router'
import News from '../components/pages/News'

export const Route = createFileRoute('/')({
  component: News,
})
