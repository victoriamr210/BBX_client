
            {/* <ModalHeader closeButton>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <Modal.Body>
              I will not close if you click outside me. Don't even try to press
              escape key.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer> */}





            <Modal
            isOpen={show} 
            onRequestClose={this.handleClose}
            contentLabel="Example Modal"
          >
            
            {/* <ModalHeader closeButton>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              I will not close if you click outside me. Don't even try to press
              escape key.
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </ModalFooter> */}
          </Modal>