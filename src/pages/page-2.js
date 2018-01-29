import React from 'react';
import Link from 'gatsby-link';
import SvgKnob from '../components/SvgKnob/';

const SecondPage = () => (
  <div>
    <h1>Testing out a control</h1>
    <p>Select your monthly payment</p>
    <SvgKnob />
    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default SecondPage;
