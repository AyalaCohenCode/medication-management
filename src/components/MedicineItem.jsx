import { Link } from 'react-router-dom' 

export default function MedicineItem({ dayIndex, medicine, onDelete }) {
  return (
    <div className="medicine-item">
      
      <div className="medicine-info">
        <h4>{medicine.name}</h4> 
        <p>{medicine.amount}</p>  
      </div>

     
      <div className="medicine-actions">
        <Link 
          to={`/edit-medicine/${dayIndex}/${medicine.id}`}
          className="btn btn-edit"
        >
     עדכון
        </Link>

        <button 
          onClick={() => onDelete(dayIndex, medicine)} 
          className="btn btn-delete"
        >
         מחיקה
        </button>
        
      </div>
    </div>
  )
}