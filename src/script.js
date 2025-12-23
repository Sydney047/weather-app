import './style.css';

const weatherBtn = document.querySelector('#weatherBtn');
const formBtn = document.querySelector('#formButton');
const content = document.querySelector('.results');
const form = document.querySelector('.hiddenForm');
import load from './spinner/spinner.svg';

async function getWeather(url, address) {
    let weather = '';
    loadingScreen();
    try {
        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                weather = response.currentConditions;
                console.log(response.currentConditions);
            })
    } catch (error) {
        console.log("we had a problem");
        
    }
    const spinner = document.querySelector('.spinner');
    spinner.remove();
    if ( weather.temp === undefined ) {
        postError ();
    } else postWeather( address, weather.datetime, weather.temp, weather.icon, weather.feelslike, weather.conditions )
        
}
function postWeather ( addressData, timeData, tempData, iconName, feelslikeData, conditionsData ) {
    let div = document.createElement('div');
    let address = document.createElement('p');
    let time = document.createElement('p');
    let temp = document.createElement('h1');
    let svgHolder = document.createElement('img');
    let miniDIv = document.createElement('div');
    let feelslike = document.createElement('h3');
    let conditions = document.createElement('h2');
    let closeBtn = document.createElement('button');

    div.className = 'weatherElement';
    svgHolder.className = "weatherIcon";

    address.textContent = addressData.toUpperCase();
    time.textContent = timeData;
    temp.textContent = `${tempData} \u2103`;
    feelslike.textContent = `Feels like: ${feelslikeData} \u2103`;
    conditions.textContent = conditionsData;
    closeBtn.textContent = '\u2718';

    import( `./weather_icons/${iconName}.svg`).then(module=>{
        svgHolder.src = module.default;
        svgHolder.alt = `${iconName}`;
    })

    closeBtn.addEventListener( 'click', ()=> {
        div.remove();
    })

    miniDIv.append( conditions, feelslike );
    div.append( address, time, svgHolder, temp, miniDIv, closeBtn );
    content.appendChild ( div );
}
function postError () {
    alert ( 'Something Went Wrong :( ' );
}
function loadingScreen () {
    let spinner = document.createElement('img');

    spinner.className = 'spinner';

    spinner.src = load;
    spinner.alt = 'Loading...';
    content.appendChild( spinner );
}

weatherBtn.addEventListener('click', ()=>{
    form.className = 'shownForm';
});

formBtn.addEventListener('click', ()=>{
    let location = document.querySelector('#location');
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}?unitGroup=metric&key=BEY64TSN53LSNJBFU96V9RMVK&contentType=json`;
    getWeather( url, location.value );
    location.value = '';
    form.className = 'hiddenForm';
})