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

//5

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


// *******************************************************
let namesArray = ['Rahul', 'Sita', 'Amit', 'Vikram', 'Priya'];

function findName(ele, name) {
  return ele === name;
}

app.get('names/find/:name', (req, res) => {
  let name = req.params.name
  console.log(name);
  
  let result = namesArray.find(ele => findName(ele , name))
  console.log(result)
  res.json(result)
});

/************************************** DATA ************************************** */
//1
let products = [
  { productId: 1, name: 'Laptop', inStock: true },
  { productId: 2, name: 'Phone', inStock: true },
  { productId: 3, name: 'Tablet', inStock: false },
];

//2
let employees = [
  { employeeId: 1, name: 'Alice', active: true },
  { employeeId: 2, name: 'Bob', active: true },
  { employeeId: 3, name: 'Charlie', active: false },
];

//3
let orders = [
  { orderId: 1, product: 'Laptop', delivered: false },
  { orderId: 2, product: 'Phone', delivered: true },
  { orderId: 3, product: 'Tablet', delivered: false },
];

//4
let reservations = [
  { reservationId: 1, name: 'John', confirmed: false },
  { reservationId: 2, name: 'Jane', confirmed: true },
  { reservationId: 3, name: 'Jack', confirmed: false },
];

//5
let subscriptions = [
  { subscriptionId: 1, service: 'Netflix', active: false },
  { subscriptionId: 2, service: 'Spotify', active: true },
  { subscriptionId: 3, service: 'Amazon Prime', active: false },
];

/************************************** DATA ************************************** */

//1

function removeOutOfStockProducts(products) {
  return products.filter((product) => product.inStock);
}

app.get('/products/remove-out-of-stock', (req, res) => {
  let result = removeOutOfStockProducts(products);
  products = result; //update list
  res.json(result);
});

//2

function updateEmployeeStatusById(employees, employeeId, active) {
  for (i = 0; i < employees.length; i++) {
    if (employees[i].employeeId === employeeId) {
      employees[i].active = active;
    }
  }
  return employees;
}

app.get('/employees/update', (req, res) => {
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === 'true';
  let result = updateEmployeeStatusById(employees, employeeId, active);
  res.json(result);
});

//3

function updateOrderStatusById(orders, orderId, delivered) {
  for (i = 0; i < orders.length; i++) {
    if (orders[i].orderId === orderId) {
      orders[i].delivered = delivered;
    }
  }
  return orders;
}

app.get('/orders/update', (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered === 'true';
  let result = updateOrderStatusById(orders, orderId, delivered);
  res.json(result);
});

//4

function removeUnconfirmedReservations(reservations) {
  return reservations.filter((reservation) => reservation.confirmed);
}

app.get('/reservations/remove-unconfirmed', (req, res) => {
  let result = removeUnconfirmedReservations(reservations);
  reservations = result; //update list
  res.json(result);
});

//5

function updateSubscriptionStatusById(subscriptions, subscriptionId, active) {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      subscriptions[i].active = active;
    }
  }
  return subscriptions;
}

app.get('/subscriptions/update', (req, res) => {
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === 'true';
  let result = updateSubscriptionStatusById(
    subscriptions,
    subscriptionId,
    active
  );
  res.json(result);
});



let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function calculateTotalPrice(cart){
  let totalPrice = 0;
  for( let i of cart){
    totalPrice += i.quantity * i.price
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
