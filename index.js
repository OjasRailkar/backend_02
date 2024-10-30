const express = require('express');
let cors = require("cors")

const app = express();
app.use(cors());

// data
let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 }
];
//************************************************************************************* */

// Endpoint 1: Add an Activity
function addActivity(activityId, type, duration, caloriesBurned ){
  let activity = {
    activityId : activityId,
    type : type,
    duration: duration,
    caloriesBurned : caloriesBurned
  }

  activities.push(activity)
  return activities
}

app.get('/activities/add', (req, res) => {
  let activityId = parseInt(req.query.activityId)
  let duration = parseInt(req.query.duration)
  let caloriesBurned = parseInt(req.query.caloriesBurned)
  let type = req.query.type

  let result = addActivity(activityId, type, duration, caloriesBurned)
  res.json({ activities : result})
})

// Endpoint 2: Sort Activities by Duration
function sortActivitiesByDuration(activity1, activity2){
  return activity1.duration - activity2.duration
}

app.get('/activities/sort-by-duration', (req,res) =>{
  let activitiesCopy = activities.slice()
  let result = activitiesCopy.sort(sortActivitiesByDuration)
  res.json({ activities : result})
})

//Endpoint 3: Filter Activities by Type
function filterByType(activities, type){
  return activities.filter( activity => activity.type === type)
}
app.get('/activities/filter-by-type', (req,res) => {
  let type = req.query.type
  let result = filterByType(activities, type)
  res.json({activities : result}) 
})

// Endpoint 4: Calculate Total Calories Burned
function sumOfCalories(activities){
  let totalCalories = 0
  for(let i = 0; i < activities.length; i++){
    totalCalories += activities[i].caloriesBurned
  }
  return totalCalories;
}

app.get('/activities/total-calories', (req,res) => {
  let result = sumOfCalories(activities)
  res.json({totalCaloriesBurned : result}) 
})


//Endpoint 5: Update Activity Duration by ID

function updateActivityDuration(activities, activityId, duration){
  for(let i = 0; i < activities.length; i++){
    if(activities[i].activityId === activityId){
      activities[i].duration = duration
    }
  }
  return activities
}

app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId)
  let duration = parseInt(req.query.duration)

  let result = updateActivityDuration(activities, activityId, duration)
  res.json({ activities : result})
})

// Endpoint 6: Delete Activity by ID
function deleteActivity(activities, activityId ) {
  return activities.filter(activity => activity.activityId != activityId)
}

app.get('/activities/delete', (req, res) => {
  let activityId = parseInt(req.query.activityId)
  let result = deleteActivity(activities, activityId )
  res.json({ activities : result})
})

// Endpoint 7: Delete Activities by Type
function deleteActivityByType(activities, type) {
  return activities.filter(activity => activity.type != type)
}

app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type
  let result = deleteActivityByType(activities, type)
  res.json({ activities : result})
})
















const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});