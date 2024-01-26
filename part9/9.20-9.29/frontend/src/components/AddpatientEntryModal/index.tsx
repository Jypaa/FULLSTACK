import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import { EntryFormValues } from "../../types";

import AddPatientEntryForm from "./AddPatientEntryForm";

interface Props {
        modalOpen: boolean;
        onClose: () => void;
        onSubmit: (values: EntryFormValues) => void;
        error?: string;
    }


const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
                <DialogTitle>Add a new entry</DialogTitle>
                <Divider />
                <DialogContent>
            <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose}/>
        </DialogContent>
    </Dialog>

)

export default AddPatientEntryModal;
    
