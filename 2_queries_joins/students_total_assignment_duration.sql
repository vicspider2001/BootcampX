SELECT SUM(assignment_submissions.duration) as Total_duration
FROM assignment_submissions
JOIN students
ON students.id = students_id
WHERE students.name = 'Ibrahim Schimmel';
