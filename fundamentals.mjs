// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"
import {getAvgScore,assigInfo,getAssignment} from "./auxFunctions.mjs"

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result

let assigmentInfo = [];
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

function getLearnerData(course, assigGroup, learnerSub) {
    let result = [];
    // Create an array with the info needed for later calculate the learner’s total, weighted average

    for (let i in learnerSub) {
        // Learner Submission
        let learnerId = learnerSub[i].learner_id
        let submissionId = learnerSub[i].assignment_id
        let score = learnerSub[i].submission.score
        let submDate = learnerSub[i].submission.submitted_at

        try{
        // At this point, we are going to use the auxiliar functions to check the 
        // submission information. Is the assigment doesn't belong to the course or totalPoints 
        // is <= 0, or if assigment is not due, we will continue with the next submission/
        let scorePercentage = (getAssignment(course, submissionId, score, submDate, assigGroup))
        let submissionInfo = assigInfo(assigGroup, submissionId)
        let maxPoint = submissionInfo[1];
        let avgScore = [+score,maxPoint]
        
        // if array of result is 0 (first element) - Add object
        if (result.length === 0) {
            result.push({ "id": learnerId, "avg" : avgScore, [`<${submissionId}>`]: scorePercentage })
        }
        else { // check if the object extist on the result array

            // Find if an object with the same 'id' in array "result"
            const findLearner = result.find(learner => learner.id === learnerId);

            if (findLearner) { //Update the current object with the submission 
                // using the + in front of avgScore to convert it to a number
                findLearner.avg[0] += +avgScore[0];
                findLearner.avg[1] += +avgScore[1];
                findLearner[`<${submissionId}>`] = scorePercentage
            }
            else {
                // if the leaner ID is not already part of the results, add learner object
                result.push({ "id": learnerId, "avg" : avgScore, [`<${submissionId}>`]: scorePercentage })

            }
        }
        }
        catch(error){
        console.error(`Error processing submission ${submissionId}: ${error.message}`)
        }
        continue; // Skip this learner submission and continue with the rest
    }
    // Add the average acumulative score for each leaner object
    getAvgScore(result)
    console.log(result)

}

