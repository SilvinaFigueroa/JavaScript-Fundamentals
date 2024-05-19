

// AUXILIAR FUNCTIONS
// ___________________________________________________________

export function getAssignment(course, assignmentId, score, dateSubmission, group) {
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
        else {throw new Error(`Submission ${assignmentId} doesn't belong to course ${course}`) }
    } else { throw new Error( `The assigment  ${assignmentId} is not yet due`)}
}

export function validateAssigment(course, assignmentId, group) {
    //validate if the assigment belongs to the course
    // some method: check if at least one element check the condition
    const hasSubmission = group.assignments.some(assignment => assignment.id === assignmentId)
    // If assigment ID is part of the AssignmentGroup and if the group is part of the course
    return (hasSubmission && (course.id === group.course_id)) ? true : false;
}

//Calculate the score in % 
export function getScore(score, totalPoints) {
    let scorePerc = (score / totalPoints).toFixed(2)
    return scorePerc
    
}

export function assigmentDue(date) {
    let today = new Date();
    //Check if the assigment is due
    return (today > date) ? false : true
}

export function assigInfo(group, assignmentId) {
    // Get assigment due data and points Possible
    for (let assig of group.assignments) {
        if (assig.id == assignmentId) {
            if(assig.points_possible != 0){
            return [assig.due_at, assig.points_possible]
            }
            else{throw new Error(`Assigment id ${assignmentId} has 0 points possible`)}
        }
    }
    // If assigment is not part of the AssigmentGrop
    throw new Error(`Assigment ID ${assignmentId} is not part of the assigment of this course`) 
}

export function getAvgScore(result){
    result.forEach(obj => {
    let avg = ((obj.avg[0] / obj.avg[1])*100).toFixed();
    obj.avg = `${avg}%`;
    });
}

