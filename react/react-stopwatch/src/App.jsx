import React from 'react';

import LayoutContainer from './components/display/layout/LayoutContainer';
import LayoutSection from './components/display/layout/LayoutSection';

import Stopwatch from './components/apps/Stopwatch';

const App = () => {
  return (
    <LayoutContainer>
      <LayoutSection>
        <div className='flex justify-center'>
          <Stopwatch />
        </div>
      </LayoutSection>
    </LayoutContainer>
  );
}

export default App;
