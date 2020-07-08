import React from "react"
import {ICourses} from "./types";
import Course from "./Course";

interface Props {
  courses: ICourses;
  schools: {[s: string]: { name: string}}
  subjects: {[s: string]: { [subject: string]: {name: string}}}
}

const CourseList: React.FC<Props> = React.memo(({ courses, subjects, schools }) => {
  return <div>
    {Object.entries(courses).map(([school, schoolSubjects]) => {
      return <div key={school}>
        <h1> { school in schools ? schools[school].name : school}</h1>
        {Object.entries(schoolSubjects).map(([subject, courses]) => <div key={subject}>
          <h2> {subject in subjects[school] ? subjects[school][subject].name : subject } </h2>
          {courses.map(course => <Course key={course.deptCourseId} course={course}/>)}
        </div>)}
      </div>
    })}
  </div>
});

export default CourseList;