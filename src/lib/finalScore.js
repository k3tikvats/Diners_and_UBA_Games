import { getFinalData, uploadFinalData  } from "./firebase";


const normalizeScores = (scores) => {
    if (!scores || scores.length === 0) return [];

    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    if (minScore === maxScore) {
        return scores.map(() => 100); // If all scores are the same, everyone gets 100
    }
    
    return scores.map(score => ((score - minScore) / (maxScore - minScore)) * 100);
};

async function getFinalScores(Pool){
    try {
        let dinersScores = await getFinalData('diners', Pool);
        let ubaScores = await getFinalData('uba', Pool);
        if (!dinersScores || !ubaScores) {
            return res.status(404).json({ message: "Final scores not found for given pool." });
        }

        let dinersNormalized = normalizeScores(dinersScores);
        let ubaNormalized = normalizeScores(ubaScores);
        const finalScores = dinersNormalized.map((score, index) => {
            const avg = (score + ubaNormalized[index]) / 2;
            return avg;
        });
        console.log(dinersNormalized);
        console.log(ubaNormalized);

        return finalScores;
    } catch (error) {
        console.error("Error processing final scores:", error);
        //res.status(500).json({ message: "Internal server error" });
    }
}

async function calculateFinalScores(Pool){
    try {
        let dinersScores = await getFinalData('diners', Pool);
        let ubaScores = await getFinalData('uba', Pool);
        if (!dinersScores || !ubaScores) {
            console.log("Final scores not found for given pool.")
            return;
        }

        let dinersNormalized = normalizeScores(dinersScores);
        let ubaNormalized = normalizeScores(ubaScores);
        const finalScores = dinersNormalized.map((score, index) => {
            const avg = (score + ubaNormalized[index]) / 2;
            return avg;
        });
        console.log(dinersNormalized);
        console.log(ubaNormalized);
        uploadFinalData(Pool,finalScores);
        //return res.json({ message : "Final scores uploaded successfully" });
    } catch (error) {
        console.error("Error processing final scores:", error);
        //res.status(500).json({ message: "Internal server error" });
    }
}

export {
    calculateFinalScores
}
