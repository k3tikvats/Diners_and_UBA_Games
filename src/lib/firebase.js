import { doc, setDoc, collection, getDocs, query, where, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseDB';

const uploadData = async (game, pool, round, scoreData) => {
    try {
        const scoresDocRef = doc(db, 'IGTS', game, pool, 'scores');
        const finalScoresDocRef = doc(db, 'IGTS', game, pool, 'finalScores');

        // Fetch existing scores document
        const scoresDoc = await getDoc(scoresDocRef);

        // Upload round data
        await setDoc(scoresDocRef, {
            ["round" + round]: scoreData
        }, { merge: true });

        console.log(`Data for Round ${round} uploaded successfully!`);

        // Fetch existing finalScores document
        const finalScoresDoc = await getDoc(finalScoresDocRef);
        let finalScores = Array(scoreData.length).fill(0);

        if (finalScoresDoc.exists()) {
            finalScores = finalScoresDoc.data().finalScores;
        }

        // Sum up scores from all rounds
        for (let i = 0; i < scoreData.length; i++) {
            finalScores[i] += scoreData[i];
        }

        // Update finalScores document
        await setDoc(finalScoresDocRef, { finalScores });

    } catch (error) {
        console.error('Error uploading data:', error);
        throw new Error('Error uploading data');
    }
};




const getData = async (game, pool, round) => {
    try {
        // Reference to the input document in the specified game and pool
        const inputDocRef = doc(db, 'IGTS', game, pool, 'input');

        // Fetch the input document
        const inputDoc = await getDoc(inputDocRef);

        if (inputDoc.exists()) {
            const inputData = inputDoc.data(); // Get the document data

            // Check if the round exists in the data and return it
            if (inputData.hasOwnProperty("round"+round)) {
                return inputData["round"+round];
            } else {
                throw new Error(`${"round"+round} not found in input data.`);
            }
        } else {
            throw new Error(`Input document not found in ${game}/${pool}.`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const getFinalData = async (game, pool) => {
    try {
        // Reference to the finalscores document inside the specified game and pool
        const finalScoresDocRef = doc(db, 'IGTS', game, `pool${pool}`, 'finalScores');

        // Fetch the document
        const finalScoresDoc = await getDoc(finalScoresDocRef);

        if (!finalScoresDoc.exists()) {
            throw new Error(`Final scores document not found in ${game}/pool${pool}.`);
        }

        return finalScoresDoc.data()["finalScores"]; // Return the data (assumed to contain an array)
    } catch (error) {
        console.error('Error fetching final scores:', error);
        return null; // Return null in case of an error
    }
};

const uploadFinalData=async(pool,finalScoresData)=>{
    try {
        const finalScoresDocRef = doc(db, 'IGTS', 'FinalScoreBoth', `pool${pool}`, 'FinalScores');
        await setDoc(finalScoresDocRef, { finalScores: finalScoresData });
    } catch (error) {
        console.error('Error uploading final scores:', error);
        throw new Error('Error uploading final scores');
    }
}
export {
    getData,
    uploadData,
    getFinalData,
    uploadFinalData
};
