import { useState } from 'react'
import { PrivateKeyGetter } from './components/PrivateKeyGetter'
import { ActionForm } from './components/ActionForm'
import { TransactionStatus } from './components/TransactionStatus'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PrivateKeyGetter />
      <ActionForm />
      <TransactionStatus />
    </div>
  )
}

export default App
