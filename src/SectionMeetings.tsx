/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import * as Moment from 'moment';
import { IMeeting } from './types';

interface Props {
  meetings: Array<IMeeting>;
}

const styles = {
  container: {
    flex: 1,
    wordWarp: 'normal',
    justifyContent: 'flex-start',
    div: {
      display: 'inline-block',
    },
  },
  boldedText: {
    fontWeight: 700,
  },
};

const SectionMeetings: React.FC<Props> = ({ meetings }) => {
  // Correct for null meeting arrays
  let correctedMeetings = meetings ?? [];
  let sortedSectionMeetings = correctedMeetings.sort((a, b) =>
    Moment.default(a.beginDate).isBefore(Moment.default(b.beginDate)) ? 1 : -1
  );
  console.log(sortedSectionMeetings[1]);
  return (
    <div css={styles.container}>
      {sortedSectionMeetings.length === 1 && (
        <div>
          <div css={styles.boldedText}>
            {Moment.default(sortedSectionMeetings[0].beginDate).format('dddd')}s
          </div>
          {' from '}
          <div css={styles.boldedText}>
            {Moment.default(sortedSectionMeetings[0].beginDate).format(
              'h:mm A'
            )}
          </div>
          {' to '}
          <div css={styles.boldedText}>
            {Moment.default(sortedSectionMeetings[0].beginDate)
              .add(sortedSectionMeetings[0].minutesDuration, 'minutes')
              .format('h:mm A')}
          </div>
        </div>
      )}
      {/* Sections with two identical meetings a week */}
      {sortedSectionMeetings.length === 2 &&
        Moment.default(sortedSectionMeetings[0].beginDate).format('h:mm') ===
          Moment.default(sortedSectionMeetings[1].beginDate).format('h:mm') &&
        sortedSectionMeetings[0].minutesDuration ===
          sortedSectionMeetings[1].minutesDuration && (
          <div>
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[0].beginDate).format(
                'dddd'
              )}
              s
            </div>
            {' and '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[1].beginDate).format(
                'dddd'
              )}
              s
            </div>
            {' from '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[0].beginDate).format(
                'h:mm A'
              )}
            </div>
            {' to '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[0].beginDate)
                .add(sortedSectionMeetings[0].minutesDuration, 'minutes')
                .format('h:mm A')}
            </div>
          </div>
        )}
      {/* Section with two different meetings a week */}
      {sortedSectionMeetings.length === 2 &&
        !(
          Moment.default(sortedSectionMeetings[0].beginDate).format('h:mm') ===
            Moment.default(sortedSectionMeetings[1].beginDate).format('h:mm') &&
          sortedSectionMeetings[0].minutesDuration ===
            sortedSectionMeetings[1].minutesDuration
        ) && (
          <div>
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[0].beginDate).format(
                'dddd'
              )}
              s
            </div>{' '}
            from{' '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[0].beginDate).format(
                'h:mm A'
              )}
            </div>
            {' to '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[0].beginDate)
                .add(sortedSectionMeetings[0].minutesDuration, 'minutes')
                .format('h:mm A')}
            </div>
            {' and '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[1].beginDate).format(
                'dddd'
              )}
              s
            </div>
            {' from '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[1].beginDate).format(
                'h:mm A'
              )}
            </div>
            {' to '}
            <div css={styles.boldedText}>
              {Moment.default(sortedSectionMeetings[1].beginDate)
                .add(sortedSectionMeetings[1].minutesDuration, 'minutes')
                .format('h:mm A')}
            </div>
          </div>
        )}
      {/* Sections with more than two meetings a week */}
      {sortedSectionMeetings.length > 2 && (
        <div>
          {sortedSectionMeetings.map((meeting, i) => (
            <div>
              <div css={styles.boldedText}>
                {Moment.default(meeting.beginDate).format('dddd')}s
              </div>
              {' from '}
              <div css={styles.boldedText}>
                {Moment.default(meeting.beginDate).format('h:mm A')}{' '}
              </div>
              {' to '}
              <div css={styles.boldedText}>
                {Moment.default(meeting.beginDate)
                  .add(meeting.minutesDuration, 'minutes')
                  .format('h:mm A')}
              </div>
              {i < sortedSectionMeetings.length - 1 && ', '}
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionMeetings;
