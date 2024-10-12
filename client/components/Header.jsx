const React = require('react');

const quotesArray = ['Believe you can and you\'re halfway there.', 'It does not matter how slowly you go as long as you do not stop.', 
    'The only limit to our realization of tomorrow is our doubts of today.'
    , 'Life is short, spend as much time as you can on the computer.', 'If you never give up, you can never fail.',
    
]

const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];

const Header = () => {
    return (
        <div>
            <h1>{randomQuote}</h1>
        </div>
    )
}
module.exports = Header;