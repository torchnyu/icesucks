/** @jsx jsx */
import { jsx } from "@emotion/core";
import {useEffect, useState} from "react"
import Course from "./Course";
import {ICourse} from "./types";


type ICourses = { [school: string]: { [subject: string]: ICourse[] }}

enum LoadingState {
  Loading,
  Success,
  Failure
}

const CourseList = () => {
  const [courses, setCourses] = useState<ICourses>({});
  const [schools, setSchools] = useState<{[s: string]: { name: string}}>({});
  const [subjects, setSubjects] = useState<{[s: string]: { [subject: string]: {name: string}}}>({});
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
  useEffect(() => {
    async function getCourses() {
      const schoolsRes = await fetch("https://schedge.a1liu.com/schools");
      const schools = await schoolsRes.json();
      const subjectsRes = await fetch("https://schedge.a1liu.com/subjects");
      const subjects = await subjectsRes.json();
      const res = await fetch("https://schedge.a1liu.com/2020/fa/notOnline?full=true");
      const courses: ICourse[] = await res.json();
      setSchools(schools);
      setSubjects(subjects);
      let coursesBySchool: ICourses = {};
      courses.forEach(course =>{
        if (coursesBySchool[course.subjectCode.school] === undefined) {
          coursesBySchool[course.subjectCode.school] = {}
        }
        if (coursesBySchool[course.subjectCode.school][course.subjectCode.code] === undefined) {
          coursesBySchool[course.subjectCode.school][course.subjectCode.code] = []
        }
        coursesBySchool[course.subjectCode.school][course.subjectCode.code].push(course)
      });
      setCourses(coursesBySchool);
      setLoadingState(LoadingState.Success);
    }
    getCourses();
  }, []);
  if (loadingState === LoadingState.Loading) {
    return <div> Loading...</div>
  }
  return <div css={{ maxWidth: "800px", width: "80vw"}}>
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
}

export default CourseList;