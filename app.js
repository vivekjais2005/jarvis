//elements

const startbtn = document.querySelector("#start");
const stopbtn = document.querySelector("#stop");
const speakbtn =document.querySelector("#speak");

//weather setup
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            weatherCont [0].textContent = `Location : ${data.name}`;
            weatherCont [1].textContent = `Country : ${data.sys.country}`;
            weatherCont [2].textContent = `Weather type : ${data.weather[0].main}`;
            weatherCont [3].textContent = `Weather description : ${data.weather[0].description}`;
            weatherCont [4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCont [5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
            weatherCont[6].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
            weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
            
            weatherStatement =`sir the weather in${data.name} is ${data.weather[0].description} and the 
            temperature feels like ${ktc(data.main.feels_like)}`;

        } else {
            weatherCont[0].textContent ="weather info not found";
        }
    }

    xhr.send();
}


function ktc(k) {
    k = (k - 273.15);
    return k.toFixed(2);
}

//calling the weather function

//jarvis setup
if(localStorage.getItem("jarvis_setup") === null){
    weather()
}

//jarvis information setup
const setup = document.querySelector(".jarvis_setup")
setup.style.display = "none"
if(localStorage.getItem("jarvis_setup") !== null){
    setup.style.display ="block"
    setup.querySelector("button").addEventListener("click" ,userinfo)
}

//userinfo function
function userinfo(){
    let setupinfo ={
        name: setup.querySelectorAll("input")[0].value,
        bio: setup.querySelectorAll("input")[1].value,
        location: setup.querySelectorAll("input")[2].value,
        instagram: setup.querySelectorAll("input")[3].value,
        github: setup.querySelectorAll("input")[4].value,
        twitter: setup.querySelectorAll("input")[5].value,
    }

    let testArr = [];

    setup.querySelectorAll("input").forEach((e) =>{
        testArr.push(e.value);
    })

    if(testArr.includes("")){
        readout("sir complete your information");
    }else{
        localStorage.clear();
        localStorage.setItem("jarvis_setup" , JSON.stringify(setupinfo))
        setup.style.display = "none"

        weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
    }
}


// speech Recognition setup
const speechRecogniation = window.speechRecogniation || window.webkitSpeechRecognition;

const recognition = new speechRecogniation();

// SR start
recognition.onstart =function(){
   console.log("we are active"); 
}

//friday speech
function readOut(message){
    //API
    const speech = new SpeechSynthesisUtterance();
    //differnt voices
    const allVoices =speechSynthesis.getVoices();
    speech.voice =allVoices[121];
    speech.text = message;
    speech.volume =1;
    window.speechSynthesis.speak(speech);
    console.log("speaking out");
}


//SR results
recognition.onresult = function (event){
   let current = event.resultIndex;
    let transcript =event.results[current][0].transcript;
    
    transcript = transcript.toLowerCase();
    let userData = localStorage.getItem("jarvis_setup")
    console.log(transcript);


    //saying hello
    if(transcript.includes("hello, jarvis")){
        readOut("hello sir");
    }

    //opening youtube
    if(transcript.includes("open youtube")){
        readOut("opening youtube sir");
        window.open("https://www.youtube.com/")
    }

    //youtube search
    if(transcript.includes("play the")){
        readOut("here is the result");
        let input1 = transcript.split("")
        input1.splice(0 ,8);
        input1.pop();
        input1 = input1.join("").split("").join("+");
        window.open(`https://www.youtube.com/results?search_query=${input1}`);
    }
    // opening google
    if(transcript.includes("open google")){
        readOut("opening google sir");
        window.open("https://www.google.com/")
    }

    // google search
    if(transcript.includes("search for")){
        readOut("here is the result");
        let input = transcript.split("")
        input.splice(0 ,11);
        input.pop();
        input = input.join("").split("").join("+");
        window.open(`https://www.google.co.in/search?q=${input}`);
        console.log(input);
    }

    //open firebase
    if(transcript.includes("open firebase") || transcript.includes("open fire base")){
        readOut("opening firebase sir");
        window.open("https://firebase.google.com/")
    }

    //GITHUB commands
    if(transcript.includes("open github")){
        readOut("opening  github sir");
        window.open("https://github.com/");

    }
    if(transcript.includes("open my github profile")){
        readOut("opening  your github profile sir");
        window.open(`https://github.com/ ${JSON.parse(userData).github}`);

    }
    //Instargam commands
    if(transcript.includes("open instagram")){
        readOut("opening  instagram sir");
        window.open("https://www.instagram.com/")
    }

    if(transcript.includes("open my instagram profile")){
        readOut("opening  your instgram profile sir");
        window.open(`https://www.instagram.com/ ${JSON.parse(userData).instagram}`);
    }
};

//SR stop
recognition.onend = function(){
    console.log("voice recogination is deactivated");
}

//SR contnious
//recognition.continuous = true

startbtn.addEventListener("click" , () =>{
    recognition.start();
})

stopbtn.addEventListener("click" , () =>{
    recognition.stop();
})


//example
speakbtn.addEventListener("click" , () =>{
    readOut("Hello , I jarvis , How can I help you");
})
// for getting female voice on start
window.onload = function () {
    readOut("    ");
}