import { getData,uploadData } from  "./firebase";


async function calculateDinersRoundScores(Round,Pool){
    const data = await getData("diners", Pool, Round);
    let scoresData=[];
    let maxi=0,sum=0;
    for(let i=0;i<data.length;i++){
        if(data[i]>maxi) maxi=data[i];
        sum+=data[i];
    }
    const avg=sum/data.length;
    for(let i=0;i<data.length;i++){
        scoresData[i]=data[i]-avg;
        if(data[i]==maxi) scoresData[i]-=maxi/2;
    }
    await uploadData('diners',Pool,Round,scoresData);
    
}

async function calculateUBARoundScores(Round,Pool){
    const data = await getData("uba", Pool, Round);
    let scoresData= new Array(Object.keys(data).length).fill(0);
    let smallestunique=0 , highestunique = 0;
    let arr = new Array(31).fill(0);
    for (let i = 0; i < Object.keys(data).length; i++) { 
        for (let j = 0; j < 3; j++) {
            arr[data[i][j]]++;
        }
    }
    for(let i=1;i<30;i++){
        if(arr[i]==1){
            smallestunique=i;
            break;
        }
    }

    for(let i=30;i>1;i--){
        if(arr[i]==1){
            highestunique=i;
            break;
        }
    }
    for(let i=0;i<Object.keys(data).length;i++){
        for(let j=0;j<3;j++){
            if(data[i][j]==smallestunique) scoresData[i]+=25000 - ((data[i][0]+data[i][1]+data[i][2])*1000)/3;
            if(data[i][j]==highestunique) scoresData[i]+=50000 - ((data[i][0]+data[i][1]+data[i][2])*1000)/3;
        }
    }
    console.log(scoresData);
    await uploadData('uba',Pool,Round,scoresData);
}

export {
    calculateDinersRoundScores,
    calculateUBARoundScores
}