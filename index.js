const React = require('react');
// import ReactDOM from 'react-dom/client'; // Correct import for React 18 and higher
const App = require('./client/App.jsx'); // Make sure the path and casing are correct
// const ReactDOM = require('react-dom/client')
const { createRoot } = require('react-dom/client')
require('./client/styles.css');
// Create the root element
// const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
// root.render(
//     <App />
// );

const container = document.getElementById('root'); // Get the root element
console.log(container);
const root = createRoot(container); // Create a root
root.render(<App />); // Render your App inside the root