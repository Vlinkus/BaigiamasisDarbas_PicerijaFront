import { Modal, Button } from "reactstrap";

function SimpleModal({ showModal, closeModal }){
    return(
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Hello my first modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>This is a simple modal example!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default SimpleModal;