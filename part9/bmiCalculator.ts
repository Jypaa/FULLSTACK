
//const weight: number = parseFloat(process.argv[2]);
//const height: number = parseFloat(process.argv[3]);

export const BMICALCULATOR = ( height: number,weight: number): string => { 
    const bmi = weight / (height * height /10000);
    if (bmi < 18.5) {
        return 'Underweight';
    } 
    if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal weight';
    }
    if (bmi >= 25 && bmi <= 29.9) {
        return 'Overweight';
    } 
    else {
        return 'Obesity';
    }
};



//console.log(BMICALCULATOR( height, weight));