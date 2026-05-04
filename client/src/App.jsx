import { useState } from 'react'
import FermentForm from './components/FermentForm'
import TimePlan from './components/TimePlan'
import CalendarInfo from './components/CalendarInfo'

function App() {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (type, temperature) => {
    setLoading(true)
    setError(null)
    try {
      // Use relative URL - Vite proxy will forward to backend
      const res = await fetch('/api/fermentation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, temperature }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create plan')
      }
      const data = await res.json()
      setPlan(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPlan(null)
    setError(null)
  }

  return (
    <div className="app-container">
      <h1>Fermentation Planner</h1>
      {!plan ? (
        <>
          <FermentForm onSubmit={handleSubmit} loading={loading} />
          {error && <p className="error-text">{error}</p>}
        </>
      ) : (
        <>
          <button onClick={handleReset} className="back-button">← New Plan</button>
          <TimePlan plan={plan} />
          <CalendarInfo plan={plan} />
        </>
      )}
    </div>
  )
}

export default App
