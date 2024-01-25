import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import DeleteIcon from '@mui/icons-material/Delete';
import patients from "../../services/patients";

interface Props{
    patients: Array<Patient>;

}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
    occupation: string;
}

const PatientPage = ({ patients } : Props) => {
    const { id } = useParams<{ id: string }>();
    const patient = patients.find((patient) => patient.id === id);

    const getIcon = () => {
        if (patient) {
          if (patient.gender === 'male') {
            return <MaleIcon />;
          } else if (patient.gender === 'female') {
            return <FemaleIcon />;
          } else {
            return <DeleteIcon />;
          }
        }
        return <div></div>
      };

    return(
        <div>
            {patient && <h1>{patient.name}{getIcon()}</h1>}
            {patient && <p>ssn: {patient.ssn}</p>}
            {patient && <p>occupation: {patient.occupation}</p>}
            {patient && <p>gender: {patient.gender}</p>}
        </div>
    )
};

export default PatientPage;