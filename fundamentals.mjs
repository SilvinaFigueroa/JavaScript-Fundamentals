// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"
import * as functions from "./functions.mjs";

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

        let scorePercentage = (getAssignment(course, submissionId, score, submDate, assigGroup))
        let submissionInfo = assigInfo(assigGroup, submissionId)
        let maxPoint = submissionInfo[1];

        let avgScore = [+score,maxPoint]

        // if array of result is 0 (first element)
        if (result.length === 0) {
            result.push({ "id": learnerId, "avg" : avgScore, [`<${submissionId}>`]: scorePercentage })
        }

        else { // check if the object extist on the result array

            // Find if an object with the same 'id' in array "result"
            const findLearner = result.find(learner => learner.id === learnerId);

            if (findLearner) {
                findLearner.avg[0] += +avgScore[0];
                findLearner.avg[1] += +avgScore[1];
                findLearner[`<${submissionId}>`] = scorePercentage
            }
            else {
                // if the leaner ID is not already part of the results
                result.push({ "id": learnerId, "avg" : avgScore, [`<${submissionId}>`]: scorePercentage })

            }
        }
    }
    getAvgScore(result)
    console.log(result)

}



// AUXILIAR FUNCTIONS
// ___________________________________________________________

function getAssignment(course, assignmentId, score, dateSubmission, group) {
    // Use auxiliar funtion to find the assigment information
    let assigInf = assigInfo(group, assignmentId);
    let dueAt = assigInf[0];
    let pointsPossible = assigInf[1];

    // Check if assigment is due
    if (assigmentDue(dueAt)) {
        // Validate if the assigment belong to the course
        if (validateAssigment(course, assignmentId, group)) {
            // Get assigment score %
            let percentage = getScore(score, pointsPossible)
            // Apply penalty if assigment submited late! 
            return (dueAt < dateSubmission) ? ((percentage - 0.10).toFixed(2)) : percentage
        }
        else { return `Submission ${assignmentId} doesn't belong to course ${course}` }
    } else { return `The assigment  ${assignmentId} is not yet due` }
}

function validateAssigment(course, assignmentId, group) {
    //validate if the assigment belongs to the course
    // some method: check if at least one element check the condition
    const hasSubmission = group.assignments.some(assignment => assignment.id === assignmentId)
    // If assigment ID is part of the AssignmentGroup and if the group is part of the course
    return (hasSubmission && (course.id === group.course_id)) ? true : false;
}

//Calculate the score in % -- TODO: Add validations (division by 0 - catch error)
function getScore(score, totalPoints) {
    let scorePerc = (score / totalPoints).toFixed(2)
    return scorePerc
}

function assigmentDue(date) {
    let today = new Date();
    //Check if the assigment is due
    return (today > date) ? false : true

}

function assigInfo(group, assignmentId) {
    // Get assigment due data and points Possible
    for (let assig of group.assignments) {
        if (assig.id == assignmentId) {
            return [assig.due_at, assig.points_possible]
        }
    }
}

function getAvgScore(result){

    result.forEach(obj => {
    let avg = ((obj.avg[0] / obj.avg[1])*100).toFixed();
    obj.avg = `${avg}%`;

    });
}

