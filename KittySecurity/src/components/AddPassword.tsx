const AddPassword = ({ onClose }: { onClose: () => void }) => {

    return (
        <div className="modal">
          <div className="modal-content">
            <h2>ADD NEW DEVICE</h2>
            <label>NAME</label>
            <input
                type="text"
                placeholder='Platform Name'
            />
            <label>E-MAIL/USERNAME</label>
            <input
                type="text"
                placeholder='email@example.com'
            />

            <label>URL</label>
            <input
                type="text"
                placeholder='https://example.com'
            />
            
            <label>PASSWORD</label>
            <input
                type="text"
                placeholder='Super Secret Password'
                />
            <div className="modal-actions">
              <button >SAVE</button>
              <button onClick={onClose}>CANCEL</button>
            </div>
          </div>
        </div>
      )

}

export default AddPassword;