/* Global Variables */
const key = 'e823b669e6402b2763f04501616d718a';
const url1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const url2 = '&appid=';

const element = document.getElementById('generate');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const contentEl = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Add Event listener to the button.

element.addEventListener('click', () => {
  const zipCode = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;

  getWeather(url1, zipCode, url2, key)
    .then((data) => {
      postData('/data', data, feel);
    })
    .then(() => {
      updateUI('/all');
    })
    .catch((err) => {
      console.log(err);
    });
  // Clear input elements
  document.getElementById('zip').value = '';
  document.getElementById('feelings').value = '';
});

// Helper functions
const getWeather = async (url1, zipCode, url2, key) => {
  const res = await fetch(url1 + zipCode + url2 + key);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const postData = async (url = '/data', data, feel) => {
  const newData = { ...data, feel };
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log('error', error);
  }
};

const updateUI = async (url) => {
  const res = await fetch(url);
  try {
    // destructure the response from server
    const { temp, feel } = await res.json();
    // update the UI
    dateEl.innerHTML = newDate;
    tempEl.innerHTML = temp;
    contentEl.innerHTML = feel;
  } catch (err) {
    console.log(err);
  }
};
