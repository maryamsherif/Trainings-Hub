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

export default function AddModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const { courseSetters } = useContext(CourseContext);
  const [error, setError] = useState("");
  function onCloseClick() {
    setShow(false);
  }

  async function addCourseHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const response = await fetchDataFromAPI({
      endpoint: `course/addCourse`,
      configurationOpt: {
        method: "POST",
        body: JSON.stringify({ ...data, rating: 0 }),
        headers: { "Content-Type": "application/json" },
      },
    });

    if (response.message === "Success") {
      courseSetters?.addCourse(response.response as Course);
      setShow(false);
    } else {
      setError(response.errorMessage);
    }
  }

  return (
    <Modal isOpen={show} centered={true} toggle={onCloseClick} size="lg">
      <ModalHeader>Create Course</ModalHeader>
      <ModalBody className="py-3 px-4">
        <Form className="flex flex-col gap-2" onSubmit={addCourseHandler}>
          <Row>
            <Label for="title">Title</Label>
            <Input aria-label="name" id="title" name="title"></Input>
          </Row>
          <Row>
            <Label for="description">Description</Label>
            <Input
              aria-label="Description"
              id="description"
              name="description"
              tag={"textarea"}
            ></Input>
          </Row>
          <Row>
            <Label for="category">Category</Label>
            <Input
              aria-label="Category"
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
            <Label for="duration">Duration</Label>
            <Input aria-label="Duration" id="duration" name="duration"></Input>
          </Row>
          <Row>
            <Label for="instructorName">Instructor Name</Label>
            <Input
              aria-label="Instructor Name"
              name="instructorName"
              id="instructorName"
            ></Input>
          </Row>
          <Row>
            <Label for="content">Content</Label>
            <Input aria-label="Content" name="content" id="content"></Input>
          </Row>
          <Row>
            <Label for="content">Image Preview Url</Label>
            <Input
              aria-label="Image Preview URL"
              name="imgUrl"
              id="imgUrl"
            ></Input>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success btn-lg ms-2">
                  Create
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
