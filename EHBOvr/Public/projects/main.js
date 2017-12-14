//@Author: Jeroen Rijsdijk
//@Func: VR star wars prototype, connection to SWAPI

//jquery equivalent voor window.onload

$(document).ready(function(){

  console.log("main.js geladen!!!");
  //Vraag aframe scene op
  var scene = document.getElementById('scene');
  var knop1 = document.getElementById('knop1');
  var knop2 = document.getElementById('knop2');
  var sphere1 = document.getElementById('sphere1');
  var sphere2 = document.getElementById('sphere2');


  sphere1.addEventListener('mouseenter', function() {
  	
  	this.setAttribute("dynamic-body","");

  	
  });

  sphere2.addEventListener('mouseenter', function() {
  	
  	this.setAttribute("dynamic-body","");
  	
  });
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
  setTimeout(function() {
	$('#tf1').remove();
	appendBox();
  },11000);

	
 	 knop1.addEventListener('collide', function (e) {
 	 	var xhttp = new XMLHttpRequest();
  		console.log("ik doe het");

  		xhttp.onreadystatechange = function () {

  			if (this.readyState == 4 && this.status == 200) {
  				// console.log(this.responseText);
  				var response = JSON.parse(this.responseText);
  				console.log(response);
  				$('#text').remove();				
  				$('#scene').append('<a-entity id="text" text="value:' + response.name + ';color:white" position="0 1.8 -1"></a-entity>');
  			} 		
  		}
  		console.log("t");
  		var random = getRandomInt(1,87);
  		xhttp.open("GET","https://swapi.co/api/people/" + random + "",true);
  		xhttp.send();
 		   //red.setAttribute('color','blue');
 	 });

  function appendBox() {
  	$('#scene').append('<a-box id="box" color="red" position="1 1.8 -3" depth="1" height="0.5" width="1"></a-box>');
  	var box = document.getElementById('box');

  	box.onmouseenter = function() {
  		var xhttp = new XMLHttpRequest();
  		console.log("ik doe het");

  		xhttp.onreadystatechange = function () {

  			if (this.readyState == 4 && this.status == 200) {
  				// console.log(this.responseText);
  				var response = JSON.parse(this.responseText);
  				console.log(response);
  				$('#text').remove();				
  				$('#scene').append('<a-entity id="text" text="value:' + response.name + ';color:white" position="0 1.8 -1"></a-entity>');
  			} 		
  		}
  		console.log("t");
  		var random = getRandomInt(1,87);
  		xhttp.open("GET","https://swapi.co/api/people/" + random + "",true);
  		xhttp.send();


  	}
  }
});
