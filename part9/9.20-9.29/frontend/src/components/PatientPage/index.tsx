import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import DeleteIcon from '@mui/icons-material/Delete';
import { Patient } from "../../types";


interface Props{
    patients: Array<Patient>;
}



const PatientPage = ({ patients } : Props) => {
    const { id } = useParams<{ id: string }>();
    const patient = patients.find((patient) => patient.id === id);
    console.log(patient);

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
            <h2>entries</h2>
            {patient && patient.entries.map((entry) => (
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>{code}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
};

export default PatientPage;