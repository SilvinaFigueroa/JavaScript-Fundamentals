// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from "./data.mjs"

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result


getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

function getLearnerData(course, assig, learnerSub) {

    for (let i in learnerSub) {
        let learner_id = learnerSub[i].learner_id
        let assignment_id = learnerSub[i].assignment_id
        let submitted = learnerSub.submission
        let dateSubmission = learnerSub[i].submission.dateSubmission;
        let score = learnerSub[i].submission.score;

        console.log(assignmentInfo(assignment_id))
        
    }
}

// Get the assigment due date and points possible
function assignmentInfo(assig) {
    let dueDate = "";
    let points= 0;
    AssignmentGroup.assignments.forEach(element => {
        // console.log(`${element.id} & ${assig}`) //validation
        if (element.id === assig) {
            dueDate = element.due_at
            points = element.points_possible
        }
       
    })

    return [dueDate, points]
};





