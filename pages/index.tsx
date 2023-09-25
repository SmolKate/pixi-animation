'use client'

import Head from 'next/head'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footballIcon.ico" />
      </Head>
      <main>Home page</main>
    </>
  )
}

export default Home
