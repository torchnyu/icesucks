/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { IMeeting, ISection } from './types';
import { fixCredit } from './utils';
import SectionMeetings from './SectionMeetings';

interface Props {
  type: string;
  instructors: Array<string>;
  status: string;
  meetings: Array<IMeeting>;
  location: string;
  name: string;
  notes: string;
  recitations: Array<ISection> | null;
  minUnits: number;
  maxUnits: number;
  isOdd: boolean; // True for every other section (styling background color)
  isLast: boolean; // True for last section of course (styling border radius)
  registrationNumber: number;
  instructionMode: string;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'WaitList':
      return '#ffa726';
    case 'Open':
      return '#66bb6a';
    case 'Closed':
      return '#ef5350';
    default:
      return 'grey';
  }
}
function getInstructionColor(instructionMode: string): string {
  switch (instructionMode) {
    case 'In-Person':
      return '#ec407a';
    default:
      return '#5c6bc0';
  }
}

const styles = {
  Section: (isOdd: boolean, isLast: boolean) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isOdd ? '#F1F1F1' : '#F6F6F6',
      color: '#31343B',
      borderBottomLeftRadius: isLast ? '8px' : '0px',
      borderBottomRightRadius: isLast ? '8px' : '0px',
    } as const),
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    wordWrap: 'break-word',
    '@media(max-width: 700px)': {
      flexDirection: 'column',
      paddingLeft: '30px',
    },
    minHeight: '80px',
    position: 'relative',
  },
  statusContainer: {
    width: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    borderRadius: '10px',
    padding: '6px',
    margin: '4px 0',
    fontSize: '0.8rem',
    fontWeight: 800,
  },
  status: (status: string) => ({
    color: getStatusColor(status),
  }),
  mode: (instructionMode: string) => ({
    color: getInstructionColor(instructionMode),
  }),
  registration: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    color: 'grey',
    fontSize: '0.85rem',
  },
  label: {
    fontSize: '0.75rem',
    color: 'grey',
  },
} as const;

const Section: React.FC<Props> = ({
  type,
  instructors,
  status,
  meetings,
  location,
  name,
  minUnits,
  maxUnits,
  isOdd,
  isLast,
  registrationNumber,
  instructionMode,
}) => {
  return (
    <div css={styles.Section(isOdd, isLast)}>
      <div css={styles.row}>
        <div css={styles.statusContainer}>
          <span css={[styles.mode(instructionMode), styles.statusText]}>
            {instructionMode === 'In-Person' ? instructionMode : 'Blended'}
          </span>
          <span css={[styles.status(status), styles.statusText]}>{status}</span>
        </div>
        {/* Section Registration Number */}
        <div css={styles.registration}>#{registrationNumber}</div>
        {/* Section Instructor(s) */}
        <div
          css={{
            display: 'flex',
            width: '100px',
            flexDirection: 'column',
            padding: '5px',
          }}
        >
          <div> {instructors.join(', ')} </div>
        </div>
        {/* Section Type */}
        <div
          css={{
            display: 'flex',
            width: '80px',
            flexDirection: 'column',
            padding: '5px',
          }}
        >
          <div> {type} </div>
        </div>
        {/* Section Credits */}
        <div css={{ width: '40px', maxWidth: '50vw', padding: '5px' }}>
          {' '}
          {fixCredit(minUnits, maxUnits)}
          <div css={styles.label}>
            {fixCredit(minUnits, maxUnits) === '1' ? 'UNIT' : 'UNITS'}
          </div>
        </div>
        {/* Section meeting days and times */}
        <SectionMeetings meetings={meetings} />
      </div>
    </div>
  );
};

export default Section;
