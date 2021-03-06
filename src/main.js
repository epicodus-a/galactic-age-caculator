import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { GalacticAgeCaculator } from "../src/galacticAgeCaculator"
import { Planet } from "../src/planet";
import { LivingBeing } from "../src/livingBeing"


$().ready( ()=> {
  $("#galactic").submit( e => {
    e.preventDefault();

    const earthYears = {
      Earth: 1,
      Venus: 0.62,
      Mars: 1.88,
      Jupiter: 11.86,
    }

    let name = $("#name").val();
    if(name){
      name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    }
    let birthday = new Date($("#birthday").val());
    let avgLifespan = parseInt($("#avgLifespan").val());

    
    let livingBeing = new LivingBeing(birthday, avgLifespan, name);
    for(let key in earthYears){
      let planet = new Planet(key, earthYears[key], livingBeing);
      let galacticAgeCaculator = new GalacticAgeCaculator(planet, livingBeing);
      let planetAge = galacticAgeCaculator.planetAge();
      let nextBirthday = galacticAgeCaculator.nextBirthdayDate();
      nextBirthday = nextBirthday.getMonth() + "/" + nextBirthday.getDate() + "/" + nextBirthday.getFullYear(); 
      
      let yearsLeft = Math.ceil(galacticAgeCaculator.yearsToGoOnOtherPlanets());
      let output = `<div class='mt-5'>
                     <h2 class='lead text-center'>${name}, On ${key} </h2><hr>  
                     <div class="row">
                      <div class="col-4 age">
                        <p class='lead'>You are ${planetAge} years old
                      </div>
                      <div class="col-4 yearsLeft">
                      <p class='lead'>Your next birthday is ${nextBirthday}
                      </div>
                      <div class="col-4 nextBirthday">
                      <p class='lead'>There are ${yearsLeft} years to have fun
                      </div>
                     </div>
                     </div>` 
      $(".planets").append(output);
    }

    // empty fileds
    $("input").val("");


    $(".reset").click(() => {
      location.reload();
    });
  });
});
