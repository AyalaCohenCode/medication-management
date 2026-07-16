import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { removeMedicineFromDay, removeMedicineFromAllDays } from '../redux/slices/weekSlice'
import MedicineItem from '../components/MedicineItem'
import ConfirmDialog from '../components/ConfirmDialog'

export default function DayDetails() {
  const { dayIndex } = useParams() 
  const dispatch = useDispatch() 
  const navigate = useNavigate() 
  
  const week = useSelector(state => state.week)
  
  const day = week[parseInt(dayIndex)]
  
  const [deleteDialog, setDeleteDialog] = useState(null)

  if (!day) {
    return <div className="not-found">היום לא נמצא</div>
  }

  const handleDeleteClick = (dayIdx, medicine) => {
    setDeleteDialog({ dayIndex: dayIdx, medicine })
  }

  const handleConfirmDelete = (type) => {
    if (type === 'day') {
      dispatch(removeMedicineFromDay({
        dayIndex: deleteDialog.dayIndex,
        medicineId: deleteDialog.medicine.id
      }))
    } else if (type === 'all') {
      dispatch(removeMedicineFromAllDays({
        medicineName: deleteDialog.medicine.name
      }))
    }
    setDeleteDialog(null) 
  }

  return (
    <div className="day-details-container">
      <button onClick={() => navigate('/weekly-table')} className="btn btn-back">
        ← חזור
      </button>

      <h1>{day.name}</h1>

      <div className="medicines-list">
        {day.medicines.length > 0 ? (
          day.medicines.map(medicine => (
            <MedicineItem
              key={medicine.id}
              dayIndex={parseInt(dayIndex)}
              medicine={medicine}
              onDelete={handleDeleteClick} // העברת הפונקציה שפותחת את המודל כ-Callback
            />
          ))
        ) : (
          <p className="no-medicines">אין תרופות ליום זה</p>
        )}
      </div>

      {deleteDialog && (
        <ConfirmDialog
          medicineName={deleteDialog.medicine.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteDialog(null)} 
        />
      )}
    </div>
  )
}