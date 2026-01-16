import "../styles/DeleteChatModal.css";

const DeleteChatModal = ({ onCancel, onConfirm }) => {
    return (
        <div className="delete-modal-backdrop" onClick={onCancel}>
            <div
                className="delete-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="delete-modal-close" onClick={onCancel}>
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="delete-modal-icon">
                    <span className="material-symbols-outlined">warning</span>
                </div>

                <h2>Delete Chat?</h2>

                <p>
                    This action cannot be undone. All messages, summaries, and
                    generated materials in this chat will be permanently removed.
                </p>

                <div className="delete-modal-actions">
                    <button className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn-delete" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChatModal;
