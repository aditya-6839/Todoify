import React from 'react'
import { Button } from '@/components/ui/button'

const App = () => {
  return (
    <div className='min-h-screen flex min-w-7xl gap-2 justify-center items-center'>
      <Button variant='default'>Sign up</Button>
      <Button variant='primary'>Sign up</Button>
      <Button variant='secondary'>Sign up</Button>
      <Button variant='outline'>Sign up</Button>
      <Button variant='ghost'>Sign up</Button>
    </div>
  )
}

export default App