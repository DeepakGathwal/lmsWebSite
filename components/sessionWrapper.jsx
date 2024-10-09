"use client";
import { SessionProvider } from "next-auth/react"
import React from 'react'
import AccountProvider from "@/apis/apicontext";

export default function SessionWrapper({children}){
  return (

  <SessionProvider>
<AccountProvider>
    {children}
</AccountProvider>
    </SessionProvider>
  )
}
