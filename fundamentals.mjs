// For a clean code, the data is placed in a separate file and imported to be used on this one 
import { CourseInfo, AssignmentGroup,LearnerSubmissions } from "./data.mjs"

// Create a function named getLearnerData() that accepts these values as parameters, 
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), 
// and returns the formatted result


getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions)

function getLearnerData(course, assig, learnerSub){

    for (let i in learnerSub){
        let learner_id = learnerSub[i].learner_id
        let assignment_id = learnerSub[i].assignment_id
        let submitted = learnerSub.submission
        let dateSubmission = learnerSub[i].submission.dateSubmission;
        let score = learnerSub[i].submission.score;
    }

}

