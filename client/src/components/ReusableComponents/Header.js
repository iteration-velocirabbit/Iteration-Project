import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../contexts/useUserAuth';
import { Link } from 'react-router-dom';

const quotesArray = [
  "Believe you can and you're halfway there.",
  'It does not matter how slowly you go as long as you do not stop.',
  'The only limit to our realization of tomorrow is our doubts of today.',
  'Life is short, spend as much time as you can on the computer.',
  'If you never give up, you can never fail.',
  'Do what you can, with what you have, where you are.',
  "Show up, don't give up, and ask questions.",
  'Champions keep playing until they get it right.',
  'You are never too old to set another goal or to dream a new dream.',
  "It always seems impossible until it's done.",
  "Always give 100%. Unless you're donating blood.",
  'The only place success comes before work is in the dictionary',
  'No one can make you feel inferior without your consent.',
  'Think big. Trust yourself and make it happen.',
  'A goal with no plan is just a wish.',
  '90% of the game is half mental.',
];

const Header = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const { logout, loggedInUser } = useUserAuth();

  useEffect(() => {
    // Function to update the quote
    const updateQuote = () => {
      const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
      setRandomQuote(quote);
    };

    // Set the interval for every 5 seconds (3000 milliseconds)
    const intervalId = setInterval(updateQuote, 5000);

    // Call updateQuote immediately to display a quote on mount
    updateQuote();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='header'>
      <h1 id='quote' key={randomQuote} style={{ flex: 1, textAlign: 'center' }}>
        "{randomQuote}"
      </h1>
      <div style={{ width: '100px' }}></div>
      {loggedInUser && (
        <div>
          <Link to='/goal-page'>
            <button>Goals</button>
          </Link>

          <Link to='/track-progress'>
            <button>Track Progress</button>
          </Link>
        </div>
      )}

      {loggedInUser && (
        <button
          onClick={logout}
          style={{ width: '100px', backgroundColor: 'black' }}
        >
          Logout
        </button>
      )}
      {!loggedInUser && <div style={{ width: '100px' }}></div>}
    </div>
  );
};

export default Header;
