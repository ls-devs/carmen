import getQueryClient from "@/utils/getQueryClient"
import Hydrate from "@/utils/hydrateClient"
import {dehydrate} from "@tanstack/react-query"
import ListUsers from "./list-user"
import {User} from "../types"

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = (await res.json()) as User[]
  return users
}

export default async function Hydation() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["hydrate-users"], getUsers)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  )
}
