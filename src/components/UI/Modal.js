import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div onClick={props.onClose}  className={classes.backdrop} />
}

const ModalOverlays = (props) => {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    );
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>, portalElement)}
        </Fragment>
    );
}

export default Modal;
