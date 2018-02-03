import React from 'react';
import Link from 'gatsby-link';
import SvgKnob from '../components/SvgKnob/';
import Axios from 'axios';

let DownPaymentKnobSettings = {};
let MonthlyKnobSettings = {};

Axios.get("/data/knobSettings.json")
  .then(function(result) {    
    // we got it!
    DownPaymentKnobSettings = result.data.DownPaymentKnobSettings;
    MonthlyKnobSettings = result.data.MonthlyKnobSettings;
    console.log(DownPaymentKnobSettings);
});

/*
const DownPaymentKnobSettings = {
    palette: 'light2',
    value_min: 0,
    value_max: 5000,
    initial_value: 1500,

    // track background:
    track_bg_radius: 40, //40
    track_bg_width: 12, //8

    // track:
    track_radius: 40, //40
    track_width: 16, //8

    // cursor
    cursor_radius: 18, // same unit as radius
    cursor_length: 10,
    cursor_width: 20,

    font_family: 'sans-serif',
    font_size: 20
};

const MonthlyKnobSettings = {
    palette: 'light',
    value_min: 0,
    value_max: 500,
    initial_value: 250,

    // track background:
    track_bg_radius: 40, //40
    track_bg_width: 12, //8

    // track:
    track_radius: 40, //40
    track_width: 16, //8

    // cursor
    cursor_radius: 18, // same unit as radius
    cursor_length: 10,
    cursor_width: 20,

    font_family: 'sans-serif',
    font_size: 20
};
*/


const SecondPage = () => (
  <div>
    <h1>Testing out a control</h1>
    <p>Select your down payment:</p>
    <SvgKnob knobSettings={ DownPaymentKnobSettings } data-label="D" />
    <p>Select your monthly payment:</p>
    <SvgKnob knobSettings={ MonthlyKnobSettings } />

    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default SecondPage;
