// déclaration objet jeu
var Game = function(bomb){
	var self = this;
	//mise en memoire des elem. du DOM
	self.dom = {
		container : document.getElementById("container"),
		score : document.getElementById("score"),
		hits : document.getElementById("hits"),
		level : document.getElementById("level"),
		miss : document.getElementById("miss")
	}

	self.score = 0;				//scores
	self.miss = 0;				//ratés
	self.hits = 0;				//bombes stoppées
	self.level = 1;				//niveau actuel
	self.maxLevel = 10;			//niveau max

	self.playing = false;		//si on est en train de jouer
	self.bombs = []				//liste des bombes
	self.bombCount = 16			//nb de bombes

	self.init = function(){
		self.playing = true;
		for  (var i = 0; i < self.bombCount; i++){
			var bomb = new Bomb(self);		//on donne le jeu en argument pour que la bombe sache a quel jeu elle appartient
				bomb.create();
				setTimeout(bomb.activate, Math.random() * bomb.wait); 

			self.bombs.push(bomb);
		};
	}

	self.updateScores = function(){
		self.dom.score.innerHTML = "score : "+ self.score;
		self.dom.hits.innerHTML = "hits : "+ self.hits;
		self.dom.level.innerHTML = "level : "+ self.level;
		self.dom.miss.innerHTML = "missed : "+ self.miss;

		//cond pour dire qu'on a perdu
		if(self.miss >= 10){
			self.playing = false;
			deleteGame();
		}
	}
}
// END Game


// objet bombe
var Bomb = function(game){
	var self = this;
// settings
	
	self.bonus = 25;				//points gagnés
	self.malus = 200;				//points perdus quand on rate
	self.wait = 5000;				//temps avant que la bombe explose
	self.time = self.wait;			//minuteur
	
// creation et ajout de la bombe dans le dom
	self.create = function(){
		self.element = document.createElement("div");
		self.element.classList.add("bomb");
		
		game.dom.container.appendChild(self.element);
	}
	
// activation
	self.activate = function(){
//		console.log("bomb activated ready to kill yo momma");
		
		self.time = self.wait;
		self.element.classList.remove("explode");
		self.element.classList.add("activated");
		self.element.addEventListener("touchstart", _onstop);
		self.element.addEventListener("click", _onstop);
		
		//mise a jour de l'html de la bombe
		
		self.update = setInterval(function(){
			if(self.time > 0){
				self.time -= 100
				//ms en s
				self.element.innerHTML = self.time/1000;
			}else{
				self.explode();
			}
		}, 100);
	}
	
// explosion
	self.explode = function(){
		self.disable();
		self.element.innerHTML = "BOOM";
		self.element.classList.remove("activated");
		self.element.classList.add("explode");
		game.miss = game.miss + 1;
		if(game.score - self.malus >= 0){
			game.score -= self.malus;
		}else{game.score = 0;}
		game.updateScores(self);
		self.renew();
		
		
	}
	
// désactivation
	self.disable = function(){
		clearInterval(self.update);
		clearTimeout(self.timeout);
		self.element.removeEventListener("touchstart", _onstop);
		self.element.removeEventListener("click", _onstop);
		self.element.innerHTML = ""
		self.element.classList.remove("activated");
		return;
	}
	
// clic sur une bombe	
	var _onstop = function(event){
		event.preventDefault();
		self.disable();
		self.element.innerHTML = "";
		game.score += self.bonus;
		game.hits++;
		//mise a jour des scores
		game.updateScores(self);
		self.renew();
	}

// mise en place de nouvelle bombe
	self.renew = function(){
		if(game.playing){
			self.timeout = setTimeout(self.activate, (Math.random() * self.wait) + 1000)
		}
	}
}

// END Bomb


// supprimer toutes les bombes
/*
var deleteGame = function(){
	var container = document.getElementById("container")
		bombs = container.childNodes;
	
	while (container.firstChild) {
  		container.removeChild(container.firstChild);
		}
}
*/

// interactions dans la page
var btnStart  = document.getElementById("btnStart");
	frontPage = document.getElementById("frontPage");
	btnStop   = document.getElementById("btnStop");

btnStart.addEventListener("click", function(){
	frontPage.classList.add("hidden");
	var bombSmash = new Game();
	bombSmash.init();
});

btnStop.addEventListener("click", function(){	
	deleteGame();
})