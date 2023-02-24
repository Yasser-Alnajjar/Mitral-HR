import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

export default function Modals({ onHide, show, forms, title }) {
  const { theme } = useSelector((state) => state);

  return (
    <Container>
      <Modal
        className="p-0"
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className={`rounded ${theme.mode}`}>
          <div className="text-center pb-3 pt-2 fs-4">{title}</div>
          {forms}
          <div className="d-flex justify-content-end">
            <Button variant="danger" onClick={onHide}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
