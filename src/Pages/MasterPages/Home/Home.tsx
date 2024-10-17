import { useEffect, useState } from "react";
import { Student, StudentResponse } from "../../../Interfaces/Interfaces";
import { apiClient } from "../../../Api/END-POINT";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import StudentsTable from "../../../Components/MasterComponents/StudentsTable/StudentsTable";
import CreatStudentModal from "../../../Components/MasterComponents/CreatStudentModal/CreatStudentModal";

export default function Home() {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<StudentResponse>("/Student/Get");
      if (response.data.Success) {
        setStudentList(response.data.Data);
        console.log(studentList);
      } else {
        toast.error(response.data.Message || "An error occurred");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.Message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h4>Student List</h4>
        <button
          className="btn btn-warning text-white"
          onClick={() => setModalShow(true)}
        >
          Add new Student
        </button>
      </div>

      <CreatStudentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        getStudents={getStudents}
      />

      <div className="mt-5">
        <StudentsTable
          studentList={studentList}
          loading={loading}
          getStudents={getStudents}
        />
      </div>
    </div>
  );
}
