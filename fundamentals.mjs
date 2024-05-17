// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"
import * as functions from "./functions.mjs";

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result

let result = [];
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

function getLearnerData(course, assigGroup, learnerSub) {
    for (let i in learnerSub) {
        // Learner Submission
        let learnerId = learnerSub[i].learner_id
        let submissionId = learnerSub[i].assignment_id
        let score = learnerSub[i].score
        let submDate = learnerSub[i].submitted_at

        let scorePercentage = (getAssignment(course, submissionId, score, submDate, assigGroup))

        // Get the unique ID for students to create our array of objects
        // When looping, if the student ID exits we add the exam submitted, if does not exist, the object will be created
        let uniqueLearners = learnerSub.map(learner => learner.learner_id).filter((value, index, self) => self.indexOf(value) === index)

        //Use the uniqueLearners array to check if we need to create a new object for the studentId
        // or update a current object 
        for (let i = 0; 0 < uniqueLearners.length; i++) {
            if (learnerId == i) {
                // if the leaner ID is part of the array of objects
                result.push({ "id": learnerId, [`<${submissionId}>`]: scorePercentage })
                // Remove learner ID from the array
                uniqueLearners.splice(i, 1);
            } else {
                // Update the existing learner object adding the submission
                for (let j = 0; j < result.length; j++) {
                    if (result[j].id === learnerId) {
                        result[j][`<${submissionId}>`] = scorePercentage
                    }
                }
            }
        }
    }
    return console.log(result)

}
function getAssignment(course, assignmentId, score, dateSubmission, group) {
    let dueAt = "";
    let pointsPossible = 0;
    // Get assigment due data and points Possible
    for (let assig of group.assignments) {
        if (assig.id == assignmentId) {
            dueAt = assig.due_at
            pointsPossible = assig.points_possible
            break; // Assigments has unique ID, so if we found it we don't need to continue looking on the array
        }
        // Check if assigment is due
        if (assigmentDue(dueAt)) {
            // Validate if the assigment belong to the course
            if (validateAssigment(course, assignmentId, group)) {
                // Get assigment score %
                let percentage = getScore(score, pointsPossible)
                // Apply penalty if assigment submited late! 
                return (dueAt < dateSubmission) ? (percentage - 10) : percentage
            }
            else { return `Submission ${assignmentId} doesn't belong to course ${course}` }
        } else { return `The assigment  ${assignmentId} is not yet due` }
    }
}



function validateAssigment(course, assignmentId, group) {
    //validate if the assigment belongs to the course
    // some method: check if at least one element check the condition
    const hasSubmission = group.assignments.some(assignment => assignment.id === assignmentId)
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
    return (today > date) ? `Assigment not Due` : `Assigment Due`

}
