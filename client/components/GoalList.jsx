const React = require('react');
const Card = require('./Card');

// SAR, measurable, time to props and pass to individual cards

// Use effect to constantly fetch from db
    // grab fetched goal data and pass to respective components
            // assign SAR, measurable, time to props and pass to goalist
                // map to populate state array with users goals and render a card component for each goal

const GoalList = () => {

    

    return (
        <div>
            <Card></Card>
        </div>
    )
}

module.exports = GoalList;