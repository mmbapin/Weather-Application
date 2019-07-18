window.addEventListener('load', () => {
    let lat;
    let long;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section span');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e8e0ac418b3937a6be30f5b6c3c460ee/${lat},${long}`;

            fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const {temperature, summary, icon} = data.currently;
                        const degTemp = Math.floor((5 * (temperature - 32))/ 9);
                        
                        temperatureDegree.textContent = degTemp + '\xB0';
                        temperatureDescription.textContent =summary;
                        locationTimeZone.textContent = data.timezone;
                        setIcon(icon, document.querySelector('.icon'));

                        // return temperature, degTemp;
                        document.querySelector('.degree-section').addEventListener('click', () => {
                            if(degreeSection === 'F'){
                                temperatureDegree.textContent = degTemp + '\xB0';
                                degreeSection.textContent = 'C';
                            }
                            else{
                                temperatureDegree.textContent = temperature + '\xB0';
                                degreeSection.textContent = 'F';
                            }
                        })
                    });

                    

                    
        });
    }

        function setIcon(icon, iconID) {
            const skycons = new Skycons({"color" : "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
});