
export default function ConfirmDialog({ medicineName, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">

      <div className="modal-content">
        <h3>מחיקת תרופה</h3>
        <p>בחר את אפשרות המחיקה עבור <strong>{medicineName}</strong>:</p>

        <div className="dialog-options">

          <button
            onClick={() => onConfirm('day')}
            className="btn btn-secondary"
          >
            הסר מיום זה בלבד
          </button>

          <button
            onClick={() => onConfirm('all')}
            className="btn btn-danger"
          >
            הסר מכל השבוע
          </button>

        </div>

        <button onClick={onCancel} className="btn btn-outline">
          ביטול
        </button>

      </div>
    </div>
  )
}