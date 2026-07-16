
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateMedicineAmount } from '../redux/slices/weekSlice'

export default function EditMedicine() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { dayIndex, medicineId } = useParams()

  const dayIndexNum = Number(dayIndex)
  const medicineIdNum = Number(medicineId)

  const week = useSelector(state => state.week)
  const day = week[dayIndexNum]

  const [medicineName, setMedicineName] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!day || Number.isNaN(medicineIdNum)) return

    const medicine = day.medicines.find(m => m.id === medicineIdNum)

    if (medicine) {
      setMedicineName(medicine.name)
      setAmount(medicine.amount)
    }
  }, [day, medicineIdNum])

  const validateForm = () => {
    const newErrors = {}
    if (!medicineName.trim()) newErrors.name = 'שם התרופה חובה'
    if (!amount.trim()) newErrors.amount = 'הכמות חובה'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    dispatch(
      updateMedicineAmount({
        dayIndex: dayIndexNum,
        medicineId: medicineIdNum,
        newAmount: amount
      })
    )
    navigate(`/day/${dayIndex}`)
  }

  if (!day) {
    return <div className="not-found">היום לא נמצא</div>
  }

  const medicine = day.medicines.find(m => m.id === medicineIdNum)
  if (!medicine) {
    return <div className="not-found">התרופה לא נמצאה</div>
  }

  return (
    <div className="add-medicine-container">
      <h1>עדכון כמות</h1>

      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-group">
          <label>יום:</label>
          <input type="text" value={day.name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="medicine-name">שם התרופה:</label>
          <input
            id="medicine-name"
            type="text"
            value={medicineName}
            disabled
          />
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
          עדכן
        </button>
      </form>
    </div>
  )
}