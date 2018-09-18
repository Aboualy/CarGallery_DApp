import React from 'react';
import Modal from 'react-modal';
import UpdatingCustomers from "./UpdatingCustomers";
import Button from '@material-ui/core/Button';
import Icon from "../../node_modules/@material-ui/core/Icon/Icon";
import './style/style.css';
const customStyles = {
    overlay: {zIndex: 1000},
    backgroundColor:'bg-transparent',
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class Edit_ModalDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }


    render() {
        return (
            <div>

                <Button onClick={this.openModal}

                 variant="contained" size = "small" color="secondary"  aria-label="Edit" className="button">
                    <Icon>edit_icon</Icon>

                </Button>

            <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"

                >
                    <button onClick={this.closeModal}>close</button>

                    <UpdatingCustomers index ={this.props.id}/>{console.log(this.props.id)}

                </Modal>
            </div>
        );
    }

}
export default Edit_ModalDialog;