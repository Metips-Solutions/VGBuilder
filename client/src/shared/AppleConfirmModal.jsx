import React, { useEffect } from 'react';

/**
 * AppleConfirmModal
 * Modal de confirmación nativo estilo Apple HIG (Action Sheet / Alert Dialog)
 * para acciones destructivas e irreversibles.
 */
export function AppleConfirmModal({
  isOpen,
  title,
  description,
  confirmText = 'Eliminar todo',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isDestructive = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="apple-modal-overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apple-modal-title"
      aria-describedby="apple-modal-desc"
    >
      <div
        className="apple-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 id="apple-modal-title" className="apple-modal-title">
            {title}
          </h3>
        )}
        {description && (
          <p id="apple-modal-desc" className="apple-modal-description">
            {description}
          </p>
        )}
        <div className="apple-modal-actions">
          <button
            type="button"
            className={isDestructive ? 'btn-apple-modal-destructive' : 'btn-apple-modal-primary'}
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
          <button
            type="button"
            className="btn-apple-modal-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
