'use client'
import { FormEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
const jambaseAPIKEY = process.env.JAMBASE_API;
// import events from '@/pages/api/events';

export default function Home() {
  const apiKey = jambaseAPIKEY;
  const [citySearch, setCitySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');

  async function getEvents(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const response = await axios.get('/api/getEvents', {
    //   data: {city: citySearch, state: stateSearch},
    // })
    const results = await axios.get('/api/events');
    const data = results;
    console.log('response', data)
    // Handle response if necessary
    // const data = await response.json()
    // ...
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Groove City</p>
      </div>


        <form onSubmit={getEvents}>
          <div>
            <label>City</label>
            <input type="text" name="city" onChange={(e) => setCitySearch(e.target.value)}/>
            <label>State</label>
            <input type="text" name="state" onChange={(e) => setStateSearch(e.target.value)}/>
          </div>
          <button type="submit">Find your groove</button>
        </form>
    </main>
  )
}
