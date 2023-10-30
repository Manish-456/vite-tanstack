import { Loader2 } from 'lucide-react'
import React from 'react'

export  function Loading() {
  return (
    <>
     <div className="min-h-screen flex items-center justify-center font-serif"><div role="status">
<Loader2 className='h-8 w-8 animate-spin ' />
<span class="sr-only">Loading...</span>
</div>
</div> 
    </>
  )
}
