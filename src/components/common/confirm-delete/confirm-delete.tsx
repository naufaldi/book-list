import React from 'react';
import Button from '../button';
import "./styles.scss";

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-delete">
      <h2>Are you sure you want to delete this book?</h2>
      <div className="confirm-delete__actions">
        <Button className="button--secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="button--danger" onClick={onConfirm}>
          Yes, Delete
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
