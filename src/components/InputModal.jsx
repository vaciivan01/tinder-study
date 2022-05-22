import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility, setAnswer } from "../hideSlice";
import {Modal, Button} from "react-bootstrap";

function InputModal(props) {
    const context = props.content
    const key = props.keyForContext

    const dispatch = useDispatch();
    const showElement = useSelector(state => state.hide.shownElements);

    function sendAnswers () {
      dispatch(toggleVisibility({state: showElement, next: props.content.next, current: key}))
    }
    
    return (
      <>
        <Modal
        size="xl"
        show={showElement[key]}
        >
          <Modal.Header>
              <Modal.Title>{context.headerText}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <input className="modal-p" onChange={(e) => dispatch(setAnswer({keyForQuestion: key, value: e.target.value}))}/>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="primary" onClick={() => {sendAnswers()}}>Continue</Button>
          </Modal.Footer>
          </Modal>
      </>
    );
}

export default InputModal;
