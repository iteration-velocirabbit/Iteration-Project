/**
 * @jest-environment jsdom
 */

import React from 'react';
// import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react';
// import regeneratorRuntime from 'regenerator-runtime';

// import App from '../client/App'
// import LabeledText from '../client/components/LabeledText';
import Card from '../client/components/Card.jsx';

global.fetch = jest.fn(()=> Promise.resolve({
    json: () => Promise.resolve({}),
}));

describe('Unit testing on react components', ()=> {


    describe('Card Component', () => {
        const goalProps = {
          goalName: 'Run 100 miles',
          goalAmount: 100,
          goalDuration: 30,
          goalId: '1',
          goalProgress: 50,
          goalPercentage: 50,
          fetchGoals: jest.fn(),
          userInfo: { id: 'user1' },
        };
    
    beforeEach(() => {
        fetch.mockClear();
      });

    test('reders card with correct information', ()=>{
        let card = render(<Card {...goalProps}/>);
        for (let i in goalProps){
            expect(card.getByTextprops[i]).toBeInstanceOf(goalProps);
        }
    }
    );
})
})