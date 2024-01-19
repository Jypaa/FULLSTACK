
interface ExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
    }

const days = [];
//const target: number = parseFloat(process.argv[2]);

for (let i = 3; i < process.argv.length; i++) {
    days.push(parseFloat(process.argv[i]));
}
export const ExerciseValues = (args: Array<number>, target: number):  ExerciseValues => {
    const sum = args.reduce((a, b) => a + b, 0);
    const average = sum / args.length;
    let rating = 1;
    let ratingDescription = 'bad';
    if (average >= target) {
        rating = 3;
    }
    if (average < target) {
        rating = 2;
    }
    if (average < target / 2) {
        rating = 1;
    }
    if (rating === 3) {
        ratingDescription = 'good';
    }
    if (rating === 2) {
        ratingDescription = 'not too bad but could be better';
    }
    if (rating === 1) {
        ratingDescription = 'bad';
    }

    return {
        periodLength: args.length,
        trainingDays: args.filter(day => day !== 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};


//console.log(ExerciseValues(days, target));

