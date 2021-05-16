import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const DeleteModal = (props) => {

    const {deleteModalOpen, setDeleteModalOpen, deleteAction, actionId, actionName} = props;

    return (
        <Modal
            size='mini'
            dimmer='blurring'
            onClose={() => setDeleteModalOpen(false)}
            onOpen={() => setDeleteModalOpen(true)}
            open={deleteModalOpen}
            >
            <Modal.Header>Delete {actionName}</Modal.Header>
            <Modal.Content>
                <p>Are you sure?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setDeleteModalOpen(false)}>
                Cancel
                </Button>
                <Button
                    color='red'
                    content="Delete"
                    labelPosition='right'
                    icon='times'
                    onClick={() => {
                        deleteAction(actionId);
                        setDeleteModalOpen(false);
                    }}
                    
                />
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteModal;