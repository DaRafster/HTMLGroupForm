// Inputs
firstName = document.getElementById("firstname");
lastName = document.getElementById("lastname");
groupSize = document.getElementById("GroupSize");
discountRate = document.getElementById("discRate");

// Select
listOfMembers = document.getElementById("members");

// Images
bee = document.getElementById("bee");

// Advice
advice = document.getElementById("advice");

// Buttons
buttons = document.getElementsByClassName("buttons");

function CalcGroupDiscount()
{
	let discount = 0;
		
	if(groupSize.value >= 5 && groupSize.value <= 10)
		discount = 0.10;
	else if(groupSize.value > 10 && groupSize.value <= 24)
		discount = 0.20;
	else
		discount = 0.25;
	
	let total = 50 - (50 * discount);
	
	discountRate.value = total.toFixed(2);
}

function AddGroupMember()
{
	let newMember = document.createElement("option");
	newMember.text = lastName.value + ", " + firstName.value;
	listOfMembers.add(newMember);
}

function RemoveGroupMember()
{
	if(listOfMembers.length <= 0)
	{
		alert("There are no group members to delete!");
		return;
	}
	listOfMembers.remove(listOfMembers.value);
}

function SortGroupMembers()
{
	if(listOfMembers.length <= 0)
	{
		alert("There are no group members to sort!");
		return;
	}
	
	const sortArray = [];
	for(let i = 0; i < listOfMembers.length - 1; i++)
	{
		memberOne = listOfMembers[i].value.split(",");
		memberTwo = listOfMembers[i + 1].value.split(",");
		
		sortArray[i] = memberOne[0] + ", " + memberOne[1];
		sortArray[i+1] = memberTwo[0] + ", " + memberTwo[1];
	}
	
	sortArray.sort();
	
	for(let i = 0; i < listOfMembers.length; i++)
	{
		listOfMembers[i].innerHTML = sortArray[i];
	}
}

function CheckForGroupMemberInput()
{	
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	
	try{
		if(firstName.value == "" || lastName.value == "")
			throw("Please enter a valid name");
		else if(/\d/.test(firstName.value) || /\d/.test(lastName.value))
			throw("Please enter a valid name");
		else if(specialChars.test(firstName.value) || specialChars.test(lastName.value))
			throw("Please enter a valid name");
	}
	catch(error)
	{
		alert(error);
		return;
	}
	
 	AddGroupMember();
}

function CheckForGroupSizeInput()
{
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	
	try{
		if(isNaN(groupSize.value))
			throw("Please enter a valid numerical value for group size");
		else if(specialChars.test(groupSize.value))
			throw("Please enter a valid numerical value for group size");
		else if(parseInt(groupSize.value) < 1)
			throw("Please enter a value larger than zero for group size");
	}
	catch(error)
	{
		groupSize.value = "0";
		alert(error);
		return;
	}
	
	CalcGroupDiscount();
}

let temp = 0;
function FlyingBee()
{
	bee.style.visibility = "visible";
	
	let positionX = 0, positionY = 0;
	
	clearInterval(temp);
	temp = setInterval(frame, 5);
	
	function frame()
	{
		if(positionX == screen.width * 0.6)
		{
			advice.style.display = "block";
			clearInterval(temp);
		} 
		else 
		{
			positionX++;
			positionY += 0.2;
			
			bee.style.left = positionX + 'px';
			bee.style.top = positionY + 'px';
		}
	}
}

buttons[0].onclick = function(){CheckForGroupMemberInput()};
buttons[1].onclick = function(){RemoveGroupMember()};
buttons[2].onclick = function(){SortGroupMembers()} 
groupSize.onblur = function(){CheckForGroupSizeInput()}; // Check group size right after they enter a number
FlyingBee(); // Bee flies right away (assignment pdf did not specify when the bee should fly)