import React from "react";
import { Student } from "../../../Interfaces/Interfaces";
import { FilePenLine, Trash2 } from "lucide-react";
import { Spinner } from "react-bootstrap";

interface Iprops {
  studentList: Student[];
  loading: boolean;
}

export default function StudentsTable({ studentList, loading }: Iprops) {
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
                <td className="d-flex ">
                  <button className="btn text-danger">
                    <Trash2 />
                  </button>
                  <button className="btn text-warning">
                    <FilePenLine />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
