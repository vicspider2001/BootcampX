const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'labber'
});

const teachersQuery = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = $1
  ORDER BY teacher;
`;

const cohortName = process.argv[2];
const values = [cohortName];

pool.query(teachersQuery, values, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  res.rows.forEach(item => {
    console.log(`${item.cohort} : ${item.teacher}`);
  });
});
