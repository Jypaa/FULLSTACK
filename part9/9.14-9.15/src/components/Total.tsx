interface Toalprops {
    total: number;
}


const Total = (props: Toalprops) => {
    return (
        <div>
            <p>
                Number of exercises {props.total}
            </p>
        </div>
    );
}

export default Total;