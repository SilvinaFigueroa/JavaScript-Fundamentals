// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result


getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

let result = [];

function getLearnerData(course, assigGroup, learnerSub) {
    // Get the unique ID for students to create our array of objects
    // When looping, if the student ID exits we add the exam submitted, if does not exist, the object will be created
    let uniqueLearners = learnerSub.map(learner => learner.learner_id).filter((value, index, self) => self.indexOf(value) === index)

    for (let i in learnerSub) {
        let learnerId = learnerSub[i].learner_id
        let submissionId = learnerSub[i].assignment_id
        let score = learnerSub[i].score
        let submDate = learnerSub[i].submitted_at

        let assigValidation = validateAssigment(course,submissionId,assigGroup)
        getAssigment(score,submDate,submissionId,assigGroup)


        //Use the uniqueLearners array to check if we need to create a new object for the studentId
        // or update a current object 
        // for (let i = 0; 0 < uniqueLearners.length; i++) {
        //     if (learnerId == i) {
        //         // add submission to object    
        //     } else { `create object` }

        //     if(assigValidation){
        //         getAssigment(learnerId,)

        //     }
        // }


    }
}

function validateAssigment(course, submissionId, group) {
    //validate if the assigment belongs to the course
    // some method: check if at least one element check the condition
    const hasSubmission = group.assignments.some(assignment => assignment.id === submissionId)
    return (hasSubmission && (course.id === group.course_id)) ? true : false;
}

function getAssigment(score,submDate,submissionId,group){

        let dueAt = group.assignments.su
        let pointMax = group.assignments[submissionId].points_possible

        console.log(dueAt)
        console.log(pointMax)




}