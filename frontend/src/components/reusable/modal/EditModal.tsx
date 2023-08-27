import { useContext } from "react";
import {
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
  Col,
  FormFeedback,
} from "reactstrap";
import { CourseContext } from "../../../context/CourseContext";
import { fetchDataFromAPI } from "../../../utils";
import { Course } from "../../../types/types";
import { useState } from "react";

export default function EditModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const { currentCourse, courseSetters } = useContext(CourseContext);
  const [error, setError] = useState("");
  function onCloseClick() {
    setShow(false);
  }

  async function editCourseHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    const response = await fetchDataFromAPI({
      endpoint: `course/updateCourse/${currentCourse.id}`,
      configurationOpt: {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      },
    });
    if (response.status === "Success") {
      courseSetters?.editCourse(data as Partial<Course>);
      setShow(false);
    } else {
      setError(response.errorMessage);
    }
  }

  return (
    <Modal isOpen={show} centered={true} toggle={onCloseClick} size="lg">
      <ModalHeader>Edit Course</ModalHeader>
      <ModalBody className="py-3 px-4">
        <Form className="flex flex-col gap-2" onSubmit={editCourseHandler}>
          <Row>
            <Label for="title">Title</Label>
            <Input
              aria-label="name"
              id="title"
              name="title"
              defaultValue={currentCourse.title}
            ></Input>
          </Row>
          <Row>
            <Label for="description">Description</Label>
            <Input
              aria-label="Description"
              defaultValue={currentCourse.description}
              id="description"
              name="description"
              tag={"textarea"}
            ></Input>
          </Row>
          <Row>
            <Label for="category">Category</Label>
            <Input
              defaultValue={currentCourse.category}
              id="category"
              name="category"
              type="select"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </Input>
          </Row>
          <Row>
            <Label for="instructorName">Instructor Name</Label>
            <Input
              defaultValue={currentCourse.instructorName}
              aria-label="Instructor Name"
              name="instructorName"
              id="instructorName"
            ></Input>
          </Row>
          <Row>
            <Label for="content">Content</Label>
            <Input
              defaultValue={currentCourse.content}
              aria-label="Content"
              name="content"
              id="content"
            ></Input>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success btn-lg ms-2">
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={onCloseClick}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <FormFeedback>{error ? error : ""}</FormFeedback>
    </Modal>
  );
}
