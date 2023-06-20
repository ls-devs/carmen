import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrateClient";
import {dehydrate} from "@tanstack/react-query";
import ListUsers from "./list-user";
import {User} from "../types";
import {headers} from "next/dist/client/components/headers";

export const revalidate = 60;

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {next: {revalidate: 60}});
  const users = (await res.json()) as User[];
  return users;
}

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  const headersList = headers();
  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
