import { Col, Modal, ModalBody, Row } from "reactstrap";

export default function DeleteModal({
  show = true,
  setShow,
  onDeleteClick,
  error,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
  onDeleteClick: () => void;
  error: string;
}) {
  function onCloseClick() {
    setShow(false);
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <h2 className="mb-8 text-4xl font-semibold">Warning</h2>
              <h2>Are you sure?</h2>
              <h4>{"You won't be able to revert this!"}</h4>
            </div>
          </Col>
          {error ? `${error}` : ""}
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                onClick={onDeleteClick}
              >
                Yes, delete it!
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
      </ModalBody>
    </Modal>
  );
}
