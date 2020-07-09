/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

interface Props {
  meetings: Array<Object>;
}

const SectionMeetings: React.FC<Props> = ({ meetings }) => {
  console.log(meetings);
  return <div></div>;
};

export default SectionMeetings;
