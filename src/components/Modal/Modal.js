import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

class Modal extends Component {
    escapeHandler = event => {
        if (event.keyCode === 27) {
            this.props.closeModalinModal(event);
        }
    };

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            this.props.closeModalinModal(event);
        }
    };

    componentDidMount() {
        window.addEventListener("keydown", this.escapeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.escapeHandler);
    }

    render() {
        const { closeModalinModal, modalUrl } = this.props;

        return (
            <div className={css.modal}>
                <div className={css.overlay} onClick={this.handleOverlayClick}>
                    <img
                        src={modalUrl}
                        alt="other"
                        className={css.modalImage}
                    ></img>
                    <button
                        type="button"
                        className={css.closeButton}
                        data-action="close-lightbox"
                        onClick={closeModalinModal}
                    >
                        <i className="material-icons">close</i>
                    </button>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    closeModalinModal: PropTypes.func.isRequired,
    modalUrl: PropTypes.string.isRequired
};

export default Modal;
