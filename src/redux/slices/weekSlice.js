import { createSlice } from '@reduxjs/toolkit'
const initialState = [
  {
    name: 'ראשון',
    medicines: [
      { id: 1, name: 'נורמלול', amount: '2 כדורים' },
      { id: 2, name: 'טיפות עיניים', amount: '10 טיפות' },
      { id: 3, name: 'ויטמין D', amount: '1 כדור' }
    ]
  },
  {
    name: 'שני',
    medicines: [
      { id: 4, name: 'מגנזיום', amount: '1 כדור' },
      { id: 5, name: 'סירופ לשיעול', amount: '5 מ"ל' }
    ]
  },
  {
    name: 'שלישי',
    medicines: [
      { id: 6, name: 'אומגה 3', amount: '2 כמוסות' },
      { id: 7, name: 'ברזל', amount: '1 כדור' }
    ]
  },
  {
    name: 'רביעי',
    medicines: [
      { id: 8, name: 'ויטמין C', amount: '1 כדור מסיס' },
      { id: 9, name: 'נורופן', amount: '1 כדור' }
    ]
  },
  {
    name: 'חמישי',
    medicines: [
      { id: 10, name: 'B12', amount: '1 טבליה למציצה' },
      { id: 11, name: 'משאף', amount: '2 לחיצות' }
    ]
  },
  {
    name: 'שישי',
    medicines: [
      { id: 12, name: 'מולטי ויטמין', amount: '1 כדור' }
    ]
  },
  {
    name: 'שבת',
    medicines: [
      { id: 13, name: 'פרוביוטיקה', amount: '1 כמוסה' },
      { id: 14, name: 'אופטלגין', amount: '20 טיפות' }
    ]
  }
]
const weekSlice = createSlice({
  name: 'week',
  initialState,
  reducers: {
    addMedicineToDay: (state, action) => {
      const { days, medicine } = action.payload
      days.forEach(dayIndex => {
        const newMedicine = {
          id: Date.now() + Math.random(),
          name: medicine.name,
          amount: medicine.amount
        }
        state[dayIndex].medicines.push(newMedicine)
      })
    },
    updateMedicineAmount: (state, action) => {
      const { dayIndex, medicineId, newAmount } = action.payload
      const medicine = state[dayIndex].medicines.find(m => m.id === medicineId)
      if (medicine) {
        medicine.amount = newAmount
      }
    },
    removeMedicineFromDay: (state, action) => {
      const { dayIndex, medicineId } = action.payload
      state[dayIndex].medicines = state[dayIndex].medicines.filter(
        m => m.id !== medicineId
      )
    },
    removeMedicineFromAllDays: (state, action) => {
      const { medicineName } = action.payload
      state.forEach(day => {
        day.medicines = day.medicines.filter(m => m.name !== medicineName)
      })
    }
  }
})
export const {
  addMedicineToDay,
  updateMedicineAmount,
  removeMedicineFromDay,
  removeMedicineFromAllDays
} = weekSlice.actions
export default weekSlice.reducer