
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
