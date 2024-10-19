const express = require('express');


const app = express();
const port = 3000;

//BD 3.1 HW-2

//data
let cartItems = [
  { item: 'Book', price: 30 },
  { item: 'Pen', price: 5 },
  { item: 'Notebook', price: 50 },
  { item: 'Bag', price: 125 },
];

//1
function calculateTotalPrice(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price;
  }
  return total;
}

app.get('/cart/total', (req, res) => {
  let totalPrice = calculateTotalPrice(cartItems);
  res.json({ totalPrice: totalPrice });
});

//2

let students = [
  { name: 'John', grade: 'A' },
  { name: 'Jane', grade: 'A' },
  { name: 'Jack', grade: 'B' },
  { name: 'Jill', grade: 'C' },
];

function filterStudentsByGrade(students, grade) {
  let result = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].grade === grade) {
      result.push(students[i]);
    }
  }
  return result;
}

app.get('/students/filter', (req, res) => {
  let grade = req.query.grade;
  let result = filterStudentsByGrade(students, grade);
  res.json({ students: result });
});

//3

let temperatures = [0, 20, 30, 100];

function convertCelsiusToFahrenheit(temperatures) {
  let temp = [];
  for (let i = 0; i < temperatures.length; i++) {
    temp.push(temperatures[i] * (9 / 5) + 32);
  }
  return temp;
}

app.get('/temperatures/convert', (req, res) => {
  let result = convertCelsiusToFahrenheit(temperatures);
  res.json({ convertedTemperatures: result });
});

//4

let student_scores = [
  { name: 'John', score: 85 },
  { name: 'Jane', score: 90 },
  { name: 'Jack', score: 70 },
  { name: 'Jill', score: 60 },
];

function calculateAverageScore(student_scores) {
  let totalScore = 0;
  for (let i = 0; i < student_scores.length; i++) {
    totalScore = totalScore + student_scores[i].score;
  }
  return totalScore / student_scores.length;
}

app.get('/students/average-score', (req, res) => {
  let result = calculateAverageScore(student_scores);
  res.json({ averageScore: result });
});

// 5

let sentence = 'The quick brown fox jumps over the lazy dog';

function countWords(sentence) {
  let wordCount = 1;
  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === ' ') {
      wordCount = wordCount + 1;
    }
  }
  return wordCount;
}

app.get('/sentence/count-words', (req, res) => {
  let wordCount = countWords(sentence);
  res.json({ wordCount });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
