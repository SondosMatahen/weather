/* Global Variables */
const API = '0a024f54b02105bb92c0c2f07a371fc4';
let form =document.getElementById('form')
// let zip = document.getElementById('zip').value;
// let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



document.getElementById('generate').addEventListener('click', handdleClick);

function handdleClick(e) {
    e.preventDefault();
    let zip = document.getElementById('zip').value;
    let content = document.getElementById('feelings').value;

    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}&units=metric`;

    getWeather(url)
    .then(useData => {
        console.log('getweather', useData);
        postData('/add', { date: newDate, temp: useData.main.temp, content })
    }).then(update=>{
        updateUI();
    });
    form.reset();
}

// function to get weather data
const getWeather = async (url) => {
    console.log('url', url)
    const res = fetch(url);
    try {
        // console.log('get weeeee', await res);
        const data =  (await res).json();
        // console.log('get we', data);
        return data
    } catch (e) {
        console.log(e)
    };

};

// function to post weather data
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    });

    try {
        const newData = await request.json();
        console.log('new', newData);
        return newData;
    } catch (e) {
        console.log('e', e);
    };
};


//Function to update the data to user
const updateUI = async () => {
    const req = await fetch('/getAll');
    try {
        const addData = await req.json();
        console.log('newwwww', addData);

        document.getElementById('date').innerHTML = addData.date;
        document.getElementById('temp').innerHTML = addData.temp;
        document.getElementById('content').innerHTML = addData.content;
    } catch (e) {
        console.log('e', e);
    };
};
