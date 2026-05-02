import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'dairy',
    label: 'Dairy',
    types: [
      { value: 'milk-kefir', label: 'Milk Kefir' },
      { value: 'yogurt', label: 'Yogurt' },
      { value: 'buttermilk', label: 'Buttermilk' },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    types: [
      { value: 'water-kefir', label: 'Water Kefir' },
      { value: 'kombucha', label: 'Kombucha' },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    types: [
      { value: 'sauerkraut', label: 'Sauerkraut' },
      { value: 'kimchi', label: 'Kimchi' },
      { value: 'pickled-vegetables', label: 'Pickled Vegetables' },
    ],
  },
  {
    id: 'grains',
    label: 'Grains',
    types: [
      { value: 'sourdough-starter', label: 'Sourdough Starter' },
    ],
  },
]

function FermentForm({ onSubmit, loading }) {
  const [selectedType, setSelectedType] = useState('')
  const [temperature, setTemperature] = useState(22.5)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedType && temperature) {
      onSubmit(selectedType, parseFloat(temperature))
    }
  }

  const snapToHalf = (val) => Math.round(val * 2) / 2

  return (
    <form onSubmit={handleSubmit} className="ferment-form">
      <div>
        <label className="form-label">
          What are you fermenting?
        </label>
        <select
          className="form-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          required
        >
          <option value="">Select fermentation type...</option>
          {CATEGORIES.map((cat) => (
            <optgroup key={cat.id} label={cat.label}>
              {cat.types.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="form-slider-container">
        <label className="form-label">
          Temperature: <span className="temperature-display">{snapToHalf(temperature)}°C</span>
        </label>
        <input
          type="range"
          className="form-slider"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          onMouseUp={(e) => setTemperature(snapToHalf(parseFloat(e.target.value)))}
          onTouchEnd={(e) => {
            const val = parseFloat(e.target.value)
            setTemperature(snapToHalf(val))
          }}
          min="20"
          max="25"
          step="any"
          required
        />
        <div className="slider-labels">
          <span>20°C</span>
          <span>22.5°C</span>
          <span>25°C</span>
        </div>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={loading || !selectedType || !temperature}
      >
        {loading ? 'Generating Plan...' : 'Generate Fermentation Plan'}
      </button>
    </form>
  )
}

export default FermentForm
