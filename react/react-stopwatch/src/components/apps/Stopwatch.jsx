import React, { useEffect, useState } from 'react';

import DisplayCard from '../display/components/DisplayCard';
import MediumButton from '../display/button/MediumButton';
import ArrayTable from '../display/table/ArrayTable';

import formatDecisecondsDisplay from '../../helpers/formatDecisecondsDisplay';

const Stopwatch = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [decisecondCount, setDecisecondCount] = useState(0);
  const [lapsDeciseconds, setLapsDeciseconds] = useState([]);

  useEffect(() => {
    let counter = null;

    if (isCounting) {
      counter = setInterval(() => {
        setDecisecondCount(prev => prev + 1);
      }, 100);
    } else {
      clearInterval(counter);
    }

    return () => {
      clearInterval(counter);
    };
  }, [isCounting]);

  // Calculate lap times
  const lapTimes = lapsDeciseconds.map((deciseconds, i) => {
    let lapTime = deciseconds;
    if (i > 0) {
      lapTime = deciseconds - lapsDeciseconds[i - 1];
    }
    return formatDecisecondsDisplay(lapTime);
  });

  /**
   * Button handler functions
   */
  const handleStartStop = () => {
    setIsCounting(!isCounting);
  };

  const handleReset = () => {
    setDecisecondCount(0);
    setLapsDeciseconds([]);
  };

  const handleLap = () => {
    if (!lapsDeciseconds.length) {
      setLapsDeciseconds([decisecondCount]);
    } else {
      setLapsDeciseconds([...lapsDeciseconds, decisecondCount]);
    }
  };

  return (
    <DisplayCard headerText='Stopwatch'>
      <div className='font-mono text-center text-6xl mt-0'>
        { formatDecisecondsDisplay(decisecondCount) }
      </div>

      <div className='flex justify-center space-x-4'>
        { isCounting ?
          <>
            <MediumButton
              buttonLabel='Stop'
              buttonType='alert'
              clickHandler={ handleStartStop }
            />
            <MediumButton
              buttonLabel='Lap'
              buttonType='default'
              clickHandler={ handleLap }
            />
          </>
          :
          <>
            <MediumButton
              buttonLabel='Start'
              buttonType='primary'
              clickHandler={ handleStartStop }
            />
            <MediumButton
              buttonLabel='Reset'
              buttonType='alert'
              clickHandler={ handleReset }
            />
          </>
        }
      </div>

      { lapTimes.length > 0 && (
        <div className='flex justify-center mt-6'>
          <ArrayTable
            hasNumberColumn={ true }
            columnLabels={ ['Lap', 'Time'] }
            data={ lapTimes }
          />
        </div>
      )}
    </DisplayCard>
  );
};

export default Stopwatch;
