
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addMedicineToDay, updateMedicineAmount } from '../redux/slices/weekSlice'

const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

export default function AddMedicine() {
  const dispatch = useDispatch() 
  const navigate = useNavigate() 
  const { dayIndex, medicineId } = useParams() 
   
  const isEdit = !!dayIndex && !!medicineId
  
  const [selectedDays, setSelectedDays] = useState(isEdit ? [parseInt(dayIndex)] : [])
  const [medicineName, setMedicineName] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (selectedDays.length === 0) { newErrors.days = 'בחר לפחות יום אחד' }
    if (!medicineName.trim()) { newErrors.name = 'שם התרופה חובה' }
    if (!amount.trim()) { newErrors.amount = 'הכמות חובה' }
    setErrors(newErrors) 
    return Object.keys(newErrors).length === 0 
  }

  const handleDayToggle = (index) => {
    if (isEdit) return 
    setSelectedDays(prev =>
      prev.includes(index) ? prev.filter(d => d !== index) : [...prev, index]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (!validateForm()) return 
    if (isEdit) {
      dispatch(updateMedicineAmount({
        dayIndex: parseInt(dayIndex),
        medicineId: medicineId,
        newAmount: amount
      }))
    } else {
      dispatch(addMedicineToDay({
        days: selectedDays,
        medicine: { name: medicineName, amount }
      }))
    }
    navigate('/weekly-table') // ניווט חזרה לטבלה השבועית לאחר סיום הפעולה
  }

  return (
    <div className="add-medicine-container">
      <h1>{isEdit ? ' עדכון כמות' : ' הוספת תרופה'}</h1>
      
      <form onSubmit={handleSubmit} className="medicine-form">
        {!isEdit && (
          <div className="form-group">
            <label>בחר ימים:</label>
            <div className="days-selector">
              {daysOfWeek.map((day, index) => (
                <label key={index} className="day-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(index)}
                    onChange={() => handleDayToggle(index)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
            {errors.days && <p className="error">{errors.days}</p>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="medicine-name">שם התרופה:</label>
          <input
            id="medicine-name"
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            disabled={isEdit}
            placeholder="הזן שם תרופה"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">כמות:</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="דוגמה: 2 כדורים"
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? ' עדכן' : ' הוסף'}
        </button>
      </form>
    </div>
  )
}