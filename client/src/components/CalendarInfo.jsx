import { useState, useEffect } from 'react'

function CalendarInfo({ plan }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(plan.icsUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fallback for iOS Safari
        const textArea = document.createElement('textarea')
        textArea.value = plan.icsUrl
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand('copy')
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          alert('Please copy the URL manually: ' + plan.icsUrl)
        }
        document.body.removeChild(textArea)
      }
    } catch (err) {
      alert('Please copy the URL manually: ' + plan.icsUrl)
    }
  }

  return (
    <div className="calendar-info">
      <h3>📅 Calendar Subscription</h3>
      <p>Subscribe to this calendar to get automatic updates in Google Calendar or Apple Calendar.</p>

      <div className="ics-url-container">
        <label className="form-label">
          Your unique calendar URL:
        </label>
        <div className="ics-input-group">
          <input
            type="text"
            className="ics-input"
            value={plan.icsUrl}
            readOnly
          />
          <button
            onClick={handleCopy}
            className={`copy-button ${copied ? 'copied' : ''}`}
          >
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>

      <div className="how-to-section">
        <h4>How to subscribe:</h4>
        <div>
          <strong>Google Calendar:</strong>
          <ol>
            <li>Open Google Calendar</li>
            <li>Click the "+" next to "Other calendars"</li>
            <li>Select "From URL"</li>
            <li>Paste the URL above and click "Add calendar"</li>
          </ol>
        </div>
        <div>
          <strong>Apple Calendar (macOS/iOS):</strong>
          <ol>
            <li>Copy the URL above</li>
            <li>Open Calendar app</li>
            <li>Go to File → New Calendar Subscription</li>
            <li>Paste the URL and click "Subscribe"</li>
          </ol>
        </div>
      </div>

      <p className="note">
        Note: The calendar updates automatically when you make changes to your fermentation plan.
      </p>
    </div>
  )
}

export default CalendarInfo
