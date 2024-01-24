interface PartProps {
    part: {
        name: string;
        exerciseCount: number;
        description?: string;
        groupProjectCount?: number;
        backgroundMaterial?: string;
        kind?: string;
        requirements?: string[];
    };
}

const Part = ( props: PartProps ) => {
    console.log("parts",props);
    switch (props.part.kind) {
        case "basic":
            return (
                <div>
                    
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>

                        {props.part.description}
             
                </div>
            );
        case "group":
            return (
                <div>
             
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>

                        project exercises {props.part.groupProjectCount}
              
                </div>
            );
        case "background":
            return (
                <div>
        
                        <h3>{props.part.name} {props.part.exerciseCount}</h3>
         
                        {props.part.description}
                        <br />
                         materials {props.part.backgroundMaterial}
          
                </div>
            );
            case "special":
                return (
                    <div>
              
                            <h3>{props.part.name} {props.part.exerciseCount}</h3>
             
                            {props.part.description}
                            <br />
                            required skills: {props.part.requirements?.map((requirement, index) => <li key={index}>{requirement}</li>)}
                   
                    </div>
                );

};
};

export default Part;

