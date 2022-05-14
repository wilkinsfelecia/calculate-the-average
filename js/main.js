'use strict';

// SET VARIABLES
let btnCalculate = document.querySelector('#calculate'),
  btnClear = document.querySelector('#clear');

let input = document.querySelector('#values');

let elm_error = document.querySelector('.error__message'),
  elm_sum = document.querySelector('.item--sum'),
  elm_average = document.querySelector('.item--average'),
  elm_quantity = document.querySelector('.item--quantity');

let str_values, arr_values, sum, average, quantity;

// SET INITAL VALUES
const init = function () {
  input.value = ``;
  elm_error.innerHTML = `&nbsp;`;
  elm_sum.innerHTML = `&nbsp;`;
  elm_average.innerHTML = `&nbsp;`;
  elm_quantity.innerHTML = `&nbsp;`;

  str_values = 0;
  arr_values = [];
  sum = 0;
  average = 0;
  quantity = 0;
};

init();

// CONVERT VALUES IN ARRAY FROM STRING TO NUMBERS
function convertValues(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Number(arr[i]);
  }
  return arr;
}

// CALCULATE THE SUM OF THE ARRAY
function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// CALCULATE THE AVERAGE OF THE ARRAY
function calcAverage(a, b) {
  return a / b;
}

// RETURN A VALUE TO TWO DECIMAL POINTS
function appendDecimals(value) {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function checkInput(str) {
  let regex = /\d/;
  return regex.test(str);
}

const calculate = function () {
  str_values = input.value; // returns a long string

  if (str_values == '' || str_values == null || str_values == undefined) {
    elm_error.innerHTML = `Input field is blank.`;
    elm_sum.innerHTML = `&nbsp;`;
    elm_average.innerHTML = `&nbsp;`;
    elm_quantity.innerHTML = `&nbsp;`;
  } else if (!checkInput(str_values)) {
    elm_error.innerHTML = `Enter numeric values only.`;
    elm_sum.innerHTML = `&nbsp;`;
    elm_average.innerHTML = `&nbsp;`;
    elm_quantity.innerHTML = `&nbsp;`;
  } else {
    arr_values = str_values.split(' '); // returns an array of strings
    arr_values = arr_values.filter(Number); // removes any none number elements
    arr_values = convertValues(arr_values); // returns an array of numbers
    sum = calculateSum(arr_values); // return a sum of the array
    average = calcAverage(sum, arr_values.length); // return the average of the array

    // returns a string at two decimal points
    sum = appendDecimals(sum);
    average = appendDecimals(average);

    // set the values in the dom
    elm_error.innerHTML = `&nbsp;`;
    elm_sum.innerHTML = sum;
    elm_average.innerHTML = average;
    elm_quantity.innerHTML = arr_values.length;
  }
};

btnCalculate.addEventListener('click', calculate);
btnClear.addEventListener('click', init);