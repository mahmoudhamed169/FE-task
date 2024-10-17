import React, { useState } from "react";
import { AuthResponse, Student } from "../../../Interfaces/Interfaces";
import { FilePenLine, Trash2 } from "lucide-react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteStudentModal from "../DeleteStudentModal/DeleteStudentModal";
import toast from "react-hot-toast";
import { apiClient } from "../../../Api/END-POINT";
import { AxiosError } from "axios";

interface Iprops {
  studentList: Student[];
  loading: boolean;
  getStudents: () => void;
}

export default function StudentsTable({
  studentList,
  loading,
  getStudents,
}: Iprops) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const handleShowDeleteModal = (id: string) => {
    setSelectedStudentId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedStudentId(null);
    setShowDeleteModal(false);
  };

  const deleteStudent = async () => {
    if (!selectedStudentId) return;

    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.delete<AuthResponse>("/Student/Delete", {
        params: { id: selectedStudentId },
      });

      const { Message, Success } = response.data;
      console.log(response);

      if (Success) {
        toast.success(Message, { id: toastId });
        handleCloseDeleteModal();
        getStudents();
      } else {
        toast.error(Message || "An error occurred", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<AuthResponse>;
      toast.error(axiosError.response?.data.Message || "An error occurred", {
        id: toastId,
      });
    }
  };

  const handleEditeNavigation = (studentId: string) => {
    navigate(`/dashboard/edite-student/${studentId}`, { state: studentId });
  };

  if (loading) {
    return (
      <div className="text-center text-warning">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">NationalID</th>
            <th scope="col">Age</th>
            <th scope="col" className="ps-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {studentList.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No records found.
              </td>
            </tr>
          ) : (
            studentList.map((student) => (
              <tr key={student.ID}>
                <th scope="row">{student.ID}</th>
                <td>{student.Name}</td>
                <td>{student.Mobile}</td>
                <td>{student.Email}</td>
                <td>{student.NationalID}</td>
                <td>{student.Age}</td>
                <td className="d-flex">
                  <button
                    className="btn text-danger"
                    onClick={() => handleShowDeleteModal(student.ID)}
                  >
                    <Trash2 />
                  </button>
                  <button
                    className="btn text-warning"
                    onClick={() => handleEditeNavigation(student.ID)}
                  >
                    <FilePenLine />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <DeleteStudentModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        deleteStudent={deleteStudent}
      />
    </>
  );
}
