"use client";

import {User} from "../types";
import {useQuery} from "@tanstack/react-query";
import {For, block} from "million/react";
import Image from "next/image";
import React, {useState} from "react";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {next: {revalidate: 60}});
  const users = (await res.json()) as User[];
  return users;
}
export const revalidate = 60;
export default function ListUsers() {
  const {data, isLoading, isFetching, error} = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUsers(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  const UserBlock: React.FC<{user: User}> = /* optimize */ block(({user}) => {
    return (
      <div key={user.id} style={{border: "1px solid #ccc", textAlign: "center"}}>
        <Image
          src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
          alt={user.name}
          width={180}
          height={180}
        />
        <h3>{user.name}</h3>
      </div>
    );
  });

  const Button = /* optimize */ block(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(0);
    return (
      <>
        <h4>{count}</h4>
        <button onClick={() => setCount((prev) => prev + 1)}>Inc</button>
      </>
    );
  });

  return (
    <div style={{maxWidth: 1200, marginInline: "auto", padding: 20}}>
      <div style={{marginBottom: "4rem", textAlign: "center"}}>
        <Button />
      </div>

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
          }}
        >
          <For each={data}>{(user) => <UserBlock user={user} />}</For>
        </div>
      ) : null}
    </div>
  );
}
