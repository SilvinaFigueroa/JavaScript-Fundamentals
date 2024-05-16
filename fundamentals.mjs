// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result


getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)






function getLearnerData(course, assig, learnerSub) {
    let result = [];
    for (let i in learnerSub) {
        let learnerId = learnerSub[i].learner_id;
        let assigmentId = learnerSub[i].assignment_id;
        let percentage = (getAssignment(assigmentId, learnerSub[i].submission.score, learnerSub[i].submission.dateSubmission))
        result.push({"id":learnerId, [`<${assigmentId}>`] : percentage})

    }
     return console.log(result)

}


function getAssignment(assignmentId, score, dateSubmission) {
    let dueAt = "";
    let pointsPossible = 0;
        // Get assigment due data and points Possible
        for (let assig of AssignmentGroup.assignments) {
            if (assig.id == assignmentId) {
                dueAt = assig.due_at
                pointsPossible = assig.points_possible
                break; // Assigments has unique ID, so if we found it we don't need to continue looking on the array
            }
        }
        let today = new Date();
        //Check if the assigment is due
        if(today > dueAt){
            return "Exam no yet due!" // Using return to exit the whole function
        }
        // Validate if the assigment belong to the course
        let course = validateCourse(AssignmentGroup)
        console.log(course)

        // Get assigment score %
        let percentage = getScore(score,pointsPossible)
        // Apply penalty if assigment submited late! 
        return (dueAt < dateSubmission) ? (percentage - 10) : percentage

}


//Calculate the score in % -- TODO: Add validations (division by 0 - catch error)
function getScore(score,totalPoints){
    let scorePerc = (score / totalPoints).toFixed(2)
    return scorePerc
}


function validateCourse(assigGroup) {
    if (assigGroup.course_id == CourseInfo.id) {
        return "Go to go!"
    }
}
