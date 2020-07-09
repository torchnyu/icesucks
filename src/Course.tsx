/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { fixCourseName } from './utils';
import { ICourse } from './types';
import SectionsList from './SectionsList';

interface Props {
  course: ICourse;
}

const Course: React.FC<Props> = ({ course }) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        margin: '30px',
        // boxShadow: '2px 0px 8px 3px rgba(0,0,0,0.19)',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <h3 css={{ color: '#282C34', fontWeight: 'bold', padding: '10px' }}>
        {fixCourseName(course.name)}{' '}
      </h3>
      <SectionsList
        sections={course.sections}
        displayDescription={false}
        displayNotes={false}
      />
    </div>
  );
};

export default Course;
