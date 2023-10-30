import React from 'react'


export function Error({error}) {
  return (
    <div className="min-h-screen flex items-center bg-white justify-center ">
        
    <div className="flex items-center justify-center px-2 md:px-0">
      <div>
        <p className="text-sm font-semibold text-black">400 error</p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          {error}
        </h1>
     
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <span className='mr-2'>&larr; </span>
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
            Contact us
          </button>
        </div>
      </div>
              </div>
    </div>
  )
}
