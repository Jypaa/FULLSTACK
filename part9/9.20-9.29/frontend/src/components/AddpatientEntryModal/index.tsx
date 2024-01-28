import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import { Diagnosis, EntryFormValues } from "../../types";

import AddPatientEntryForm from "./AddPatientEntryForm";

interface Props {
        modalOpen: boolean;
        onClose: () => void;
        onSubmit: (values: EntryFormValues) => void;
        error?: string;
        diagnoses: Array<Diagnosis>;
    }


const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, diagnoses }: Props) => (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
                <DialogTitle>Add a new entry</DialogTitle>
                <Divider />
                <DialogContent>
            <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses}/>
        </DialogContent>
    </Dialog>

)

export default AddPatientEntryModal;
    
