"use client";
import { useQueryUtils } from "@/hooks/useQueryUtils";
import { fetchPolicies } from "@/utils/fetchs/fetchs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
export default function Page() {
  const { data, isFetching, isLoading, isError } = useQueryUtils({
    qKey: ["getPolicies"],
    qFn: fetchPolicies,
  });

  return <div></div>;
}
