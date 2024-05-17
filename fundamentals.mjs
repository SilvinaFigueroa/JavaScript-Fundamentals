// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"
import * as functions from "./functions.mjs";

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result

let result = [];
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
console.log(LearnerSubmissions.length)
function getLearnerData(course, assigGroup, learnerSub) {
    for (let i in learnerSub) {
        // Learner Submission
        console.log(LearnerSubmissions[i].learner_id)
        let learnerId = learnerSub[i].learner_id
        let submissionId = learnerSub[i].assignment_id
        let score = learnerSub[i].submission.score
        let submDate = learnerSub[i].submission.submitted_at

        let scorePercentage = (getAssignment(course, submissionId, score, submDate, assigGroup))
       

        result.map(learner => learnerId).filter((value, index, self) => self.indexOf(value) === index)

        //TODO: REPLACE THE FOR LOOP WITH A FILTER!! 

        // if array of result is 0 (first element)
        if(result.length === 0){
            result.push({ "id": learnerId, [`<${submissionId}>`]: scorePercentage })
            console.log(`Create ${learnerId} score ${scorePercentage}`)
        }

        else{ // check if the object extist on the result array
            for (let j = 0; j < result.length; j++) {
                if (result[j].id === learnerId) {
                    result[j][`<${submissionId}>`] = scorePercentage
                    console.log(`Update ${learnerId} score ${scorePercentage}`)
                                       
                }
                else {
                    // if the leaner ID is not already part of the results
                    result.push({ "id": learnerId, [`<${submissionId}>`]: scorePercentage })
                    console.log(`Create ${learnerId} score ${scorePercentage}`)
                    
                }
            }
        }

    }
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
