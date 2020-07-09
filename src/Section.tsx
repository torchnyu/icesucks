/** @jsx jsx */
import { jsx } from '@emotion/core';
import moment from 'moment';
import React from 'react';
import { IMeeting, ISection } from './types';
import { fixCredit } from './utils';

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
  const meetingDateTimes = [];
  const meetingDays: string[] = [];
  const meetingTimes: string[] = [];
  meetings?.forEach((m) => {
    const dateTime = moment.utc(m.beginDate);
    meetingDateTimes.push(dateTime);
    meetingDays.push(dateTime.format('ddd'));
    const endTime = dateTime.clone().add(m.minutesDuration, 'minutes');
    meetingTimes.push(
      `${dateTime.format('h:mm A')}-${endTime.format('h:mm A')}`
    );
  });
  return (
    <div css={styles.Section(isOdd, isLast)}>
      <div css={styles.row}>
        <div css={styles.statusContainer}>
          <span css={[styles.mode(instructionMode), styles.statusText]}>
            {instructionMode === 'In-Person' ? instructionMode : 'Blended'}
          </span>
          <span css={[styles.status(status), styles.statusText]}>{status}</span>
        </div>
        {/* Course Registration Number */}
        <div css={styles.registration}>{registrationNumber}</div>
        {/* Course Instructor(s) */}
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
        {/* Course Type */}
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
        {/* Course Credits */}
        <div css={{ width: '40px', maxWidth: '50vw', padding: '5px' }}>
          {' '}
          {fixCredit(minUnits, maxUnits)}
        </div>
        <div css={{ width: '50px', padding: '5px' }}>
          {meetingDays.join('\t')}{' '}
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100px',
            padding: '5px',
          }}
        >
          {meetingTimes.map((time, i) => (
            <div key={i}> {time} </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
