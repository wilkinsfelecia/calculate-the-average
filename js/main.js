'use strict';

// SET VARIABLES
let btnCalculate = document.querySelector('#calculate'),
  btnClear = document.querySelector('#clear');

let elm_input = document.querySelector('#values');

let elm_error = document.querySelector('.error__message-main'),
  elm_error_position = document.querySelector('.error__message-items'),
  elm_sum = document.querySelector('.item--sum'),
  elm_average = document.querySelector('.item--average'),
  elm_quantity = document.querySelector('.item--quantity');

let str_values, arr_values, sum, average, quantity;

// SET INITAL VALUES
const init = function () {
  elm_input.value = ``;
  elm_input.classList.remove('throwError');
  elm_error.innerHTML = `&nbsp;`;
  elm_error_position.innerHTML = `&nbsp;`;
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

function hasNumbers(arr) {
  let regex = /\d/;
  return regex.test(arr);
}

function hasAlphabet(arr) {
  let regex = /[a-zA-Z]/;
  return regex.test(arr);
}

function hasSpecial(arr) {
  let regex = /[\/\\\^\$~!@#%&\*\(\)\_\+=\]\[}{"':;<>,\?|]/;
  return regex.test(arr);
}

function endswithHyphen(arr) {
  let regex = /-$/;
  return regex.test(arr);
}

// LOOP THROUGH ARRAY TO FIND BAD VALUES
function validateArr(arr) {
  let badArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr == '' || arr == null || arr == undefined) {
      badArr = ['&nbsp;'];
      elm_error.innerHTML = `Input field is blank.`;
    } else if (!hasNumbers(arr)) {
      badArr = ['&nbsp;'];
      elm_error.innerHTML = `Enter numeric values only.`;
    } else if (
      hasAlphabet(arr[i]) ||
      hasSpecial(arr[i]) ||
      endswithHyphen(arr[i])
    ) {
      elm_error.innerHTML = `Found a bad value. Please remove:`;
      badArr.push(arr[i]);
    }
  }

  if (badArr.length > 0) {
    elm_error_position.innerHTML = `${badArr.join(' ')}`;
    elm_input.classList.add('throwError');
    resetCalculation();
  } else {
    elm_input.classList.remove('throwError');
    elm_error.innerHTML = `&nbsp;`;
    elm_error_position.innerHTML = `&nbsp;`;
    calculate();
  }
}

function resetCalculation() {
  elm_sum.innerHTML = `&nbsp;`;
  elm_average.innerHTML = `&nbsp;`;
  elm_quantity.innerHTML = `&nbsp;`;
}

function displayCalculation() {
  elm_sum.innerHTML = `${sum}`;
  elm_average.innerHTML = `${average}`;
  elm_quantity.innerHTML = `${arr_values.length}`;
}

function returnNumber(value) {
  if (typeof value === 'number') return value;
}

const calculate = function () {
  arr_values = convertValues(arr_values); // returns an array of numbers
  arr_values = arr_values.filter(returnNumber); // filters out space values
  sum = calculateSum(arr_values); // return a sum of the array
  average = calcAverage(sum, arr_values.length); // return the average of the array

  // returns a string at two decimal points
  sum = appendDecimals(sum);
  average = appendDecimals(average);

  displayCalculation();
};

// on ENTER, focus on calculate button
elm_input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    btnCalculate.focus();
  }
});

btnCalculate.addEventListener('click', function () {
  str_values = elm_input.value; // returns a long string
  arr_values = str_values.split(' '); // returns an array of strings

  validateArr(arr_values);
});

btnClear.addEventListener('click', init);
