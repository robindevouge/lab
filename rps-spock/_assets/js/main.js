$(document).ready(function(){
	
	var values = ["rock", "paper", "scissors", "spock"],
		player,	cpu, result,
		cpuScore = 0,
		playerScore = 0
	
	function Result (){
		player = values[player];
		cpu = values[cpu];
		$(".result").append(result);
	}
	
	$(".play").click(function(){
					
		player = values.indexOf($(this).val());		//gets the chosen value
		
		playerRandom = Math.floor((Math.random() * 50));		//1 chance out of 50
		if (playerRandom === 0){player = 3}						//to set spock to player
		
		$(".player").empty().append(values[player]);	//displays player choice
		$(".cpu").empty();								//erases previous cpu choice
		$(".result").empty();							//erases previous result
		
		cpu = Math.floor((Math.random() * 3));			//generates a random value for the computer
		
		cpuRandom = Math.floor((Math.random() * 100));		//1 chance out of 100
		if (cpuRandom === 0){cpu = 3}						//to set spock to computer
		
		setTimeout(function(){
			$(".cpu").append(values[cpu]);
			
			if (player === 0 && cpu === 0){
				result = "draw"
				Result();
			}

			if (player === 1 && cpu === 0){
				result = "win"
				Result();
			}

			if (player === 2 && cpu === 0){
				result = "lose"
				Result();
			}
			
			if (player === 3 && cpu === 0){
				result = "u spock"
				Result();
			}

			if (player === 0 && cpu === 1){
				result = "lose"
				Result();
			}

			if (player === 1 && cpu === 1){
				result = "draw"
				Result();
			}

			if (player === 2 && cpu === 1){
				result = "win"
				Result();
			}
			
			if (player === 3 && cpu === 1){
				result = "u spock"
				Result();
			}

			if (player === 0 && cpu === 2){
				result = "win"
				Result();
			}

			if (player === 1 && cpu === 2){
				result = "lose"
				Result();
			}

			if (player === 2 && cpu === 2){
				result = "draw"
				Result();
			}
			
			if (player === 3 && cpu === 2){
				result = "u spock"
				Result();
			}

			if (player === 0 && cpu === 3){
				result = "spock"
				Result();
			}

			if (player === 1 && cpu === 3){
				result = "spock"
				Result();
			}

			if (player === 2 && cpu === 3){
				result = "spock"
				Result();
			}

			if (player === 3 && cpu === 3){
				result = "ULTIMATE SPOCK"
				Result();
			}
			
			switch (result) {
				case "win":
					playerScore++;
					$(".playerScore").empty().append(playerScore);
					$(".cpuScore").empty().append(cpuScore);
					break;

				case "lose":
					cpuScore++;
					$(".playerScore").empty().append(playerScore);
					$(".cpuScore").empty().append(cpuScore);
					break;

				case "draw":
					$(".playerScore").empty().append(playerScore);
					$(".cpuScore").empty().append(cpuScore);
					break;

				case "spock":
					cpuScore = cpuScore + 3;
					$(".playerScore").empty().append(playerScore);
					$(".cpuScore").empty().append(cpuScore);
					break;
					
				case "u spock":
					playerScore = playerScore + 3;
					$(".playerScore").empty().append(playerScore);
					$(".cpuScore").empty().append(cpuScore);
					break;
				
				case "ULTIMATE SPOCK":
					$(".playerScore, .cpuScore").empty().append("IT'S OVER 9000 !!!");
					$(".cpuScore").empty().append("IT'S OVER 9000 !!!");
					playerScore = playerScore + 9000;
					cpuScore = cpuScore + 9000;
					break;
			}
		}, 800)
		
	})
		
		
	
	
	$(".reset").click(function(){
		cpuScore = 0;
		playerScore = 0;
		$(".playerScore").empty().append(playerScore);
		$(".cpuScore").empty().append(cpuScore);
		$(".player").empty();
		$(".cpu").empty();
		$(".result").empty().append("Bet you were losing !");
		
	})
	
	
	
	
	
	
	
	
	
});