import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface IProps {
  show: boolean;
  onHide: () => void;
  deleteStudent: () => Promise<void>;
}

export default function DeleteStudentModal({
  show,
  onHide,
  deleteStudent,
}: IProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteStudent();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Body className="d-flex flex-column align-items-center text-center p-4">
        <Trash2 size={100} color="#dc3545" className="mb-3" />
        <h4 className="mb-3 text-danger">Confirm Deletion</h4>
        <p className="text-muted">
          Are you sure you want to delete this student? This action cannot be
          undone.
        </p>
        <div className="d-flex gap-3 mt-4">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            className="px-4 py-2"
            disabled={loading}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="px-4 py-2"
            disabled={loading}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
