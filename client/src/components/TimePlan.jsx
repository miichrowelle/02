function TimePlan({ plan }) {
  const startDate = new Date(plan.startTime)

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString('de-DE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const formatDuration = (hours) => {
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    if (days > 0) {
      return `${days}d ${remainingHours}h`
    }
    return `${hours}h`
  }

  const getTimeDiff = (isoString) => {
    const eventDate = new Date(isoString)
    const diffMs = eventDate.getTime() - startDate.getTime()
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    const remainingHours = diffHours % 24

    if (diffDays > 0) {
      return remainingHours > 0 ? `in ${diffDays}d ${remainingHours}h` : `in ${diffDays}d`
    } else if (diffHours > 1) {
      return `in ${diffHours}h`
    } else if (diffHours === 1) {
      return `in 1h`
    } else {
      return `now`
    }
  }

  return (
    <div className="timeplan-container">
      <div className="timeplan-header">
        <h2>{plan.type} - Fermentation Plan</h2>
        <p><strong>Temperature:</strong> {plan.temperature}°C</p>
        <p><strong>Start:</strong> {formatDate(plan.startTime)}</p>
        <p><strong>Ready in:</strong> {formatDuration(plan.durationHours)}</p>
        <p><strong>Finish:</strong> {formatDate(plan.endTime)}</p>
      </div>

      <h3>Timeline</h3>
      <div className="timeline">
        {plan.events.map((event, index) => (
          <div
            key={index}
            className={`event-card ${event.isCheck ? 'check' : ''} ${event.step.includes('Ready') ? 'ready' : ''}`}
          >
              <div className="event-header">
                <strong className="event-step">{event.step}</strong>
                <span className="event-timediff">{getTimeDiff(event.dueDate)}</span>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-date">{formatDate(event.dueDate)}</div>
            {event.isCheck && (
              <span className="check-badge">Check</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimePlan
