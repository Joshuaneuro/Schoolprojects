window.onload = function() {

	// get Elements
	console.log("ik doe het!");
	var bol = document.getElementById("bol");
	var bol2 = document.getElementById("bol2");
	var bol3 = document.getElementById("bol3");
	var bol4 = document.getElementById("bol4");
	var camera = document.getElementById("camera");
	var cursor = document.getElementById("cursor-main");
	var box1 = document.getElementById("tafelblad");
	var scene = document.getElementById("scene");
	var schaar = document.getElementById("schaar");
	var tape = document.getElementById("tape");
	var plane1 = document.getElementById("plane1");
	var pootlinksvoor = document.getElementById("pootlinksvoor");
	var pootrechtsvoor = document.getElementById("pootrechtsvoor");
	var pootlinksachter = document.getElementById("pootlinksachter");
	var pootrechtsachter = document.getElementById("pootrechtsachter");
	var plane2 = document.getElementById("plane2");
	var cursload = document.getElementById("cursor-loader");

	// make variables for hands and timer.
	var handsfull = false;
	var hand;
	var timer;
	var spot1 = new TableSpot("1","", false);
	var spot2 = new TableSpot("2","", false);
	var spot3 = new TableSpot("3","", false);
	var spot4 = new TableSpot("4","", false);
	var objectl;

	console.log(hand);

	// constructor for table
	function TableSpot(nmr, object, spot) {
		this.nmr = nmr;
		this.object = object;
		this.spot = spot;

		this.getSpot = function(){
			return this.spot;
		}

		this.setObject = function(newObject) {
			this.object = newObject;
		}
		this.getObject = function(newObject) {
			return this.object;
		}

		this.emptyObject = function() {
			this.object = "";
		}

		this.emptySpot = function() {
			this.spot = false;
		}

		this.fillSpot = function() {
			this.spot = true;
		}
	}

	// function for giving object hand position
	function setHandPositie(object) {
		object.setAttribute("position", "3 -2 -2");
	}

	// put the object on the table function
	function SetObjTable1(object){
		scene.appendChild(hand);
		object.setAttribute("position", "-3 1 -3");
		spot1.fillSpot();
		spot1.setObject(hand.getAttribute("id"));
	}
	function SetObjTable2(object){
		scene.appendChild(hand);
		object.setAttribute("position", "-1 1 -3");
		spot2.fillSpot();
		spot2.setObject(hand.getAttribute("id"));
	}
	function SetObjTable3(object){
		scene.appendChild(hand);
		object.setAttribute("position", "1 1 -3");
		spot3.fillSpot();
		spot3.setObject(hand.getAttribute("id"));
	}
	function SetObjTable4(object){
		scene.appendChild(hand);
		object.setAttribute("position", "3 1 -3");
		spot4.fillSpot();
		spot4.setObject(hand.getAttribute("id"));
	}

	// function for checking if table spots are avaible
	function checkSpot(id) {
		for (i=0;i=1;i++) {
			if(id == spot1.getObject() && spot1.getSpot() == true) {
				spot1.emptySpot();
				spot1.emptyObject();
				return true;
				break;
			} 
			else if (id == spot2.getObject() && spot2.getSpot() == true) {
				spot2.emptySpot();
				spot2.emptyObject();
				return true;
				break;
			}
			else if (id == spot3.getObject() && spot3.getSpot() == true) {
				spot3.emptySpot();
				spot3.emptyObject();
				return true;
				break;
			}
			else if (id == spot4.getObject() && spot4.getSpot() == true) {
				spot4.emptySpot();
				spot4.emptyObject();
				return true;
				break;
			} else {
				return false;
				handsfull = true;
			}
		}
	}


	function getObjSpot(id) {
		for (i=0;i=1;i++) {
			if(id == spot1.getObject() && spot1.getSpot() == true) {
				return spot1;
				break;
			}
			else {
				break;
				return false;
			}
		}
	}
	// korte alert voor gebruiker ------------------------------------------------------------------------------------------
	function showAlert(string) {
		console.log(string);
		// scene.append('<a-entity id="text" text="value:' + string + ';color:black" position="0 1.8 -1"></a-entity>');

		//$('#scene').append('<a-entity id="text" text="value:' + string + ';color:black" position="0 1.8 -1"></a-entity>');

		timer1 = setTimeout(function() {
		
		console.log("2 seconden later!");
		},2000);
	}

	// function which checks if table is free to put objects on
	function putOnTable(object) {
		for (i=0;i=1;i++) {	
			if (!spot1.getSpot() ) {
					SetObjTable1(object);
					break;
			 	}
			else if(!spot2.getSpot()) {
			 		SetObjTable2(object);
			 		break;
			 	}
			else if (!spot3.getSpot()) {
					SetObjTable3(object);	
					break;
				}
			else if (!spot4.getSpot()) {
					SetObjTable4(object);
					break;
				}		
			else {
				showAlert("table is full");
				break;
			} 
		}
	}

	// take object your looking at in your hand
	function takeInHand(obj) {
		if (handsfull == false) {
				timer = setTimeout(function() {
					hand = obj;
						if (checkSpot(hand.getAttribute("id"))) {		
							cursor.appendChild(obj);		
							setHandPositie(obj);
							handsfull = true;	
						} else {							
							cursor.appendChild(obj);		
							setHandPositie(obj);
							handsfull = true;	
						}				
				},1000)		
			} else {
				console.log("je handen zijn vol!");
				showAlert("je handen zijn vol");
			}
	}

	// function for removing the loading animation on certain objects that dont need the loading 
	function removeLoad(obj) {
		obj.setAttribute("material","color: #439DC2;");
	}

	// undoing the removeLoad function by adding it back
	function addLoad(obj) {
		obj.setAttribute("material","color: #000000;");
	}

	// function for handling object interaction
	function actionHandler(obj) {
		timer = setTimeout(function() {
			//console.log("deze vuist op deze vuist");
			//if (obj) {
			//console.log(hand.getAttribute("id"));
			//}
			if (hand == schaar && obj == bol2) {
				console.log("knip bol2 met schaar");
				checkSpot(obj);

			}
			else if (hand == schaar && obj == tape) {
				console.log("knip tape met schaar");
			}
			else {
				console.log("handen vol!");
			}
		},1000);
		

	}
	// begin function for checking if you want to interact with objects or picking up
	function startFunction(obj) {
		if (handsfull) {
			actionHandler(obj);
		} else {
			takeInHand(obj);
		}
	}

	// EventListeners for picking up objects -------------------------------------------------------------------------------------
	bol3.addEventListener("mouseenter", function() {
		startFunction(bol3);
	});
	bol4.addEventListener("mouseenter", function() {
		startFunction(bol4);
	});
	schaar.addEventListener("mouseenter", function() {
		startFunction(schaar);
	}) 
	tape.addEventListener("mouseenter", function() {
		startFunction(tape);
	}) 	
	bol.addEventListener("mouseenter", function(){
		startFunction(bol);
	});	
	bol2.addEventListener("mouseenter", function(){
		startFunction(bol2);
	});

	// eventlisteners for disrupting ------------------------------------------------------------------------------------------
	bol.addEventListener("mouseleave", function () {
		clearTimeout(timer);
	});
    bol2.addEventListener("mouseleave", function () {
        clearTimeout(timer);
    });
    bol3.addEventListener("mouseleave", function () {
        clearTimeout(timer);
    });
    box1.addEventListener("mouseleave",function() {
    	clearTimeout(timer);
    });
    bol4.addEventListener("mouseleave", function () {
		clearTimeout(timer);
	});
	schaar.addEventListener("mouseleave", function () {
		clearTimeout(timer);
	});
	tape.addEventListener("mouseleave", function () {
		clearTimeout(timer);
	});

	// removing loading functions on not needed objects ------------------------------------------------------------------------

	plane1.addEventListener("mouseenter", function() {
		removeLoad(cursload);
	});
	plane1.addEventListener("mouseleave", function() {
		addLoad(cursload);
	});
	pootlinksvoor.addEventListener("mouseenter", function() {
		removeLoad(cursload);
	});
	pootlinksvoor.addEventListener("mouseleave", function() {
		addLoad(cursload);
	});
	pootlinksachter.addEventListener("mouseenter", function() {
		removeLoad(cursload);
	});
	pootlinksachter.addEventListener("mouseleave", function() {
		addLoad(cursload);
	});
	pootrechtsvoor.addEventListener("mouseenter", function() {
		removeLoad(cursload);
	});
	pootrechtsvoor.addEventListener("mouseleave", function() {
		addLoad(cursload);
	});
	pootrechtsachter.addEventListener("mouseenter", function() {
		removeLoad(cursload);
	});
	pootrechtsachter.addEventListener("mouseleave", function() {
		addLoad(cursload);
	});
	plane2.addEventListener("mouseenter", function() {
		removeLoad(cursload);
	});
	plane2.addEventListener("mouseleave", function() {
		addLoad(cursload);
	});

	// eventlistener for putting downobject -----------------------------------------------------------------------------------

	box1.addEventListener("mouseenter", function() {
		if (handsfull) {
		timer = setTimeout(function() {
			putOnTable(hand);
			handsfull = false;
		},1000)
		} 
		else {
		showAlert("je handen zijn vol");
		}
	});

}