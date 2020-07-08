/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, {useEffect, useState} from "react"
import {ICourse, ICourses} from "./types";
import CourseList from "./CourseList";



enum LoadingState {
  Loading,
  Success,
  Failure
}

const MainPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [courses, setCourses] = useState<ICourses>({});
  const [schools, setSchools] = useState<{[s: string]: { name: string}}>({});
  const [subjects, setSubjects] = useState<{[s: string]: { [subject: string]: {name: string}}}>({});
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
  const [newQuery, setNewQuery] = useState(urlParams.get("query") || "");
  const [query, setQuery] = useState(urlParams.get("query") || "");
  useEffect(() => {
    async function getCourses() {
      const schoolsRes = await fetch("https://schedge.a1liu.com/schools");
      const schools = await schoolsRes.json();
      const subjectsRes = await fetch("https://schedge.a1liu.com/subjects");
      const subjects = await subjectsRes.json();
      const url = query !== "" ? `https://schedge.a1liu.com/2020/fa/notOnline?full=true&query=${encodeURIComponent(query)}` : "https://schedge.a1liu.com/2020/fa/notOnline?full=true";
      const res = await fetch(url);
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
  }, [query]);
  if (loadingState === LoadingState.Loading) {
    return <div> Loading...</div>
  }
  return <div css={{ maxWidth: "800px", width: "80vw"}}>
    <form css={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit={e => {
      e.preventDefault();
      if (newQuery === "") {
        return;
      }
      setQuery(newQuery);
      setLoadingState(LoadingState.Loading);
    }}>
      <h3> Search </h3>
      <div css={{ display: "flex", alignItems: "center", width: "200px", justifyContent: "space-around"}}>
      <input value={newQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewQuery(e.currentTarget.value)} />
      <button css={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", backgroundColor: "white", border: "1px solid #bababa", borderRadius: "5px"}} type="submit"> &#x1F50E; </button>
      </div>
    </form>
    <CourseList courses={courses} schools={schools} subjects={subjects}/>
  </div>
}

export default MainPage;