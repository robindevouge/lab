$(document).ready(function () {

	/*
	var char, operation, result;
	
	$(".num, .operator").click(function(){
		var char = $(this).attr("value");
		$("#resultFrame").append(char);
	});
	
	$("#clear").click(function(){
		$("#resultFrame").html("");
	});
	
	$("#equal").click(function(){
		operation = $("#resultFrame").html();
		result = eval(operation);
		$("#resultFrame").html(result);
	});
	*/

	var char, result, operationString,
		operation = [], // used for visually separate operation elements so you can have more characters per operation and prevents this bug when you had a unlimited decimal you couldn't start from there to do more operations
		charNumber = 0,
		charLimit = 15;

	$(".num").click(function () {
		if (charNumber < charLimit) { //char number
			char = $(this).attr("value");
			$("#resultFrame").append(char);
			
			charNumber++; //char number

			operation.push(char); //sep ops
		}
	});

	$(".operator").click(function () {
		$("#resultFrame").html("");
		
		char = $(this).attr("value");
		$("#resultFrame").append(char);

		charNumber = 1; //char number

		operation.push(char); //sep ops
	});

	$("#clear").click(function () {
		$("#resultFrame").html("");
		
		charNumber = 0; //char number
		
		operation = []; //sep ops
	});

	$("#equal").click(function () {
		operationString = operation.join(""); //sep ops
		
		result = eval(operationString).toString();

		charNumber = result.length; //char number
		
		operation = []; //sep ops

		// this is for limiting the number of characters displayed in case of unlimited decimal
		if (charNumber >= charLimit) {
			result = result.substring(0, 15)
		}
		
		$("#resultFrame").html(result);
		
		operation.push(result); //sep ops


	});
});