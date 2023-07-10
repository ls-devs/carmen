"use client"

import React, { useState } from "react"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const ReactQueryWrapper = ({children}: React.PropsWithChildren) => { 
  const queryClient = new QueryClient()
  

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryWrapper
