import { Modal, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { AuthResponse } from "../../../Interfaces/Interfaces";
import { apiClient } from "../../../Api/END-POINT";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface CreatStudentModalProps {
  show: boolean;
  onHide: () => void;
  getStudents: () => void;
}

interface StudentFormData {
  FirstName: string;
  LastName: string;
  Mobile: string;
  Email: string;
  NationalID: string;
  Age: string;
}

export default function CreatStudentModal({
  show,
  onHide,
  getStudents,
}: CreatStudentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudentFormData>();

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post<AuthResponse>(
        "/Student/Post",
        data
      );

      const { Message, Success } = response.data;

      if (Success) {
        toast.success(Message, {
          id: toastId,
        });
        onHide();
        getStudents();
      } else {
        toast.error(Message || "An error occurred", {
          id: toastId,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<AuthResponse>;
      toast.error(axiosError.response?.data.Message || "An error occurred", {
        id: toastId,
      });
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  {...register("FirstName", {
                    required: "First Name is required",
                  })}
                  isInvalid={!!errors.FirstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.FirstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  {...register("LastName", {
                    required: "Last Name is required",
                  })}
                  isInvalid={!!errors.LastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.LastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("Email", { required: "Email is required" })}
                  isInvalid={!!errors.Email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile"
                  {...register("Mobile", { required: "Mobile is required" })}
                  isInvalid={!!errors.Mobile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Mobile?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>National ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter national ID"
                  {...register("NationalID", {
                    required: "National ID is required",
                  })}
                  isInvalid={!!errors.NationalID}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.NationalID?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  {...register("Age", { required: "Age is required" })}
                  isInvalid={!!errors.Age}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Age?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Adding...
              </>
            ) : (
              "Add Student"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
