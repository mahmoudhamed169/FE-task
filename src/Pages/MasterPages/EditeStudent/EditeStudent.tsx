import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Form, Row, Col, Alert, Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiClient } from "../../../Api/END-POINT";
import { AuthResponse } from "../../../Interfaces/Interfaces";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface StudentFormData {
  FirstName: string;
  LastName: string;
  Mobile: string;
  Email: string;
  NationalID: string;
  Age: string;
  NameArabic?: string;
  NameEnglish?: string;
}

export default function EditStudent() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>();

  const fetchStudent = async () => {
    try {
      const response = await apiClient.get<AuthResponse>(
        `/Student/GetEditableByID`,
        { params: { id } }
      );
      const { Data } = response.data;

      if (Data) {
        setValue("FirstName", Data.FirstName);
        setValue("LastName", Data.LastName);
        setValue("Mobile", Data.Mobile);
        setValue("Email", Data.Email);
        setValue("NationalID", Data.NationalID);
        setValue("Age", Data.Age);
        setValue("NameArabic", Data.NameArabic);
        setValue("NameEnglish", Data.NameEnglish);
      }
    } catch (error: any) {
      console.error(
        "Error fetching student data:",
        error.response?.data || error.message
      );
      setError("Failed to fetch student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.put<AuthResponse>("/Student/PUT", {
        ...data,
        ID: id,
      });

      const { Message, Success } = response.data;

      if (Success) {
        toast.success(Message, {
          id: toastId,
        });
        navigate("/dashboard/home");
      } else {
        toast.error(Message || "An error occurred", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<AuthResponse>;
      toast.error(axiosError.response?.data.Message || "An error occurred", {
        id: toastId,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 text-warning">
        <Spinner animation="border" role="status" className="mt-5" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 ">
        <Alert variant="danger" className="p-5">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...register("FirstName", {
                  required: "First name is required",
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
                {...register("LastName", { required: "Last name is required" })}
                isInvalid={!!errors.LastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.LastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                {...register("Mobile", {
                  required: "Mobile number is required",
                })}
                isInvalid={!!errors.Mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Mobile?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
                isInvalid={!!errors.Email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>National ID</Form.Label>
              <Form.Control
                type="text"
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

          <Col md={6}>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                {...register("Age", {
                  required: "Age is required",
                  min: { value: 1, message: "Age must be greater than 0" },
                })}
                isInvalid={!!errors.Age}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Age?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Name Arabic</Form.Label>
              <Form.Control
                type="text"
                {...register("NameArabic", {
                  required: "Name in Arabic is required",
                })}
                isInvalid={!!errors.NameArabic}
              />
              <Form.Control.Feedback type="invalid">
                {errors.NameArabic?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name English</Form.Label>
              <Form.Control
                type="text"
                {...register("NameEnglish", {
                  required: "Name in English is required",
                })}
                isInvalid={!!errors.NameEnglish}
              />
              <Form.Control.Feedback type="invalid">
                {errors.NameEnglish?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-3 ">
          <Button
            variant="warning"
            type="submit"
            className="text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Updatting...
              </>
            ) : (
              "Update Student"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
