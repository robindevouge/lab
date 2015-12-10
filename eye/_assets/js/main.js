$(document).ready(function () {

	var screenWidth = window.innerWidth,
		halfWidth = screenWidth / 2,
		screenHeight = window.innerHeight,
		halfHeight = screenHeight / 2,
		mouseX = halfWidth,
		mouseY = halfHeight,
		eyeX = 50,
		eyeY = 50;
	
// Make the eye follow cursor	
	
	$(document).mousemove(function (e) {
		mouseX = e.pageX;
		mouseY = e.pageY;

	});

	function move() {
		eyeX = mouseX / screenWidth * 100;
		eyeY = mouseY / screenHeight * 100;

		$(".eye").css({
			left: eyeX + '%',
			top: eyeY + '%'
		});

		window.requestAnimationFrame(move);
	};

	move();
	
// Make blink effect

	function blink() {
		$(".lid-top").addClass("lid-go-down");
		$(".lid-bottom").addClass("lid-go-up");
		setTimeout(function () {
			$(".lid-top").removeClass("lid-go-down");
			$(".lid-bottom").removeClass("lid-go-up");
		}, 200);
	}

	// Blink and play sound on click
	var randomAudioNumber, audio, 
		audioFilesNumber = 1;
	
	$(".container").click(function () {
		randomAudioNumber = Math.floor(Math.random() * ((audioFilesNumber+1) - 1)) + 1;
		audio = document.getElementById("audio" + randomAudioNumber);
		audio.play();
		blink();

	});

	// Blink automatically every x seconds
	
	var blinkTime;
	
	function autoBlink() {
		blinkTime = (Math.random() * (8 - 3) + 3) * 1000;
		setTimeout(function () {
			blink();
			autoBlink();
		}, blinkTime);
	};
	autoBlink();

});