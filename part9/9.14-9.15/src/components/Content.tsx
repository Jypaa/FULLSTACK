

import Part from "./Part";

interface ContentProps {
    courseParts: {
        name: string;
        exerciseCount: number;
        description?: string;
        groupProjectCount?: number;
        backgroundMaterial?: string;
        kind?: string;
        requirements?: string[];
    }[];
}

const Content = (props: ContentProps) => {
    
    console.log("Content",props);
    return (
        <div>
            {props.courseParts.map((part, index) => <Part key={index} part={part} />)}
        </div>
    );
}

export default Content;