/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react"
import {fixCourseName} from "./utils";
import {ICourse} from "./types";
import SectionsList from "./SectionsList";

interface Props {
  course: ICourse
}

const Course: React.FC<Props> = ({ course }) => {
  return <div
    css={{
      display: "flex",
      flexDirection: "column",
      padding: "30px"
    }}
  >
    <h3>{fixCourseName(course.name)} </h3>
    <h4 css={{ padding: "5px"}}> Sections </h4>
    <SectionsList
      sections={course.sections}
      displayDescription={false}
      displayNotes={false}
    />
  </div>
}

export default Course;