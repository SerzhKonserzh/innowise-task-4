import { createFileRoute } from '@tanstack/react-router'
import GraphQLPage from '../components/pages/GraphQLPage'

export const Route = createFileRoute('/graphql')({
  component: GraphQLPage,
})