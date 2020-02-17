module scenes
{
    export class Play extends objects.Scene
    {
        //VARIABLES
        playerMoney: number = 1000;
        winnings: number = 0;
        jackpot: number = 5000;
        turn: number = 0;
        playerBet: number = 0;
        winNumber: number = 0;
        lossNumber: number = 0;
        spinResult: string[]= ["","",""];
        fruits: string="";
        winRatio: number = 0;
        grapes: number = 0;
        bananas: number = 0;
        oranges: number = 0;
        cherries: number = 0;
        bars: number = 0;
        bells: number = 0;
        sevens: number = 0;
        blanks: number = 0;
        
        // PRIVATE INSTANCE MEMBERS
        statsLabel: objects.Label;
        reel0Label: objects.Image;
        reel1Label: objects.Image;
        reel2Label: objects.Image;
        betInput: HTMLInputElement;

        winOrLoseLabel: objects.Label;
        resetButton: objects.Button;
        spinButton: objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.statsLabel = new objects.Label();
            this.reel0Label = new objects.Image();
            this.reel1Label = new objects.Image();
            this.reel2Label = new objects.Image();
            this.betInput = <HTMLInputElement>document.getElementById("playerBet");
            this.winOrLoseLabel = new objects.Label();
            this.spinButton = new objects.Button();
            this.resetButton = new objects.Button();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //Utility function to show Player Stats
        public showPlayerStats():void
        {
            this.winRatio = this.winNumber / this.turn;
            this.statsLabel.setText("Jackpot:" +this.jackpot+"\nPlayer Money:"+this.playerMoney+"\nTurn:"+this.turn+"\nWins:"+this.winNumber+"\nLosses:"+this.lossNumber+"\nWin Ratio:"+(this.winRatio * 100).toFixed(2)+"%")
        }
        
        //Utility function to reset all fruit tallies 
        public resetFruitTally():void {
            this.grapes = 0;
            this.bananas = 0;
            this.oranges = 0;
            this.cherries = 0;
            this.bars = 0;
            this.bells = 0;
            this.sevens = 0;
            this.blanks = 0;
        }
        //Utility function to reset the player stats
        public resetAll():void {
            this.playerMoney = 1000;
            this.winnings = 0;
            this.jackpot = 5000;
            this.turn = 0;
            this.playerBet = 0;
            this.winNumber = 0;
            this.lossNumber = 0;
            this.winRatio = 0;
        }
        
        //Check to see if the player won the jackpot
        public checkJackPot():void {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this.jackpot + " Jackpot!!");
                this.playerMoney += this.jackpot;
                this.jackpot = 1000;
            }
        }

        //Utility function to show a win message and increase player money
        public showWinMessage():void {
            createjs.Sound.play("win");
            this.playerMoney += this.winnings;
            this.winOrLoseLabel.setText("You Won: $"+this.winnings);
            this.resetFruitTally();
            this.checkJackPot();
        }

        //Utility function to show a loss message and reduce player money
        public showLossMessage():void {
            createjs.Sound.play("lose");
            this.playerMoney -= this.playerBet;
            this.winOrLoseLabel.setText("You Lost!");
            this.resetFruitTally();
        }

        //Utility function to check if a value falls within a range of bounds
        public checkRange(value: number, lowerBounds: number, upperBounds: number) {
            if (value >= lowerBounds && value <= upperBounds)
            {
                return value;
            }
            else {
                return !value;
            }
        }
        
        //When this function is called it determines the betLine results. 
        public Reels() {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
        
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this.checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "blank";
                        this.blanks++;
                        break;
                    case this.checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Grapes";
                        this.grapes++;
                        break;
                    case this.checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Banana";
                        this.bananas++;
                        break;
                    case this.checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Orange";
                        this.oranges++;
                        break;
                    case this.checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this.cherries++;
                        break;
                    case this.checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this.bars++;
                        break;
                    case this.checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Bell";
                        this.bells++;
                        break;
                    case this.checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Seven";
                        this.sevens++;
                        break;
                }
            }
            return betLine;
        }

        //This function calculates the player's winnings, if any
        public determineWinnings()
        {
            if (this.blanks == 0)
            {
                if (this.grapes == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if(this.bananas == 3) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this.oranges == 3) {
                    this.winnings = this.playerBet * 30;
                }
                else if (this.cherries == 3) {
                    this.winnings = this.playerBet * 40;
                }
                else if (this.bars == 3) {
                    this.winnings = this.playerBet * 50;
                }
                else if (this.bells == 3) {
                    this.winnings = this.playerBet * 75;
                }
                else if (this.sevens == 3) {
                    this.winnings = this.playerBet * 100;
                }
                else if (this.grapes == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this.bananas == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this.oranges == 2) {
                    this.winnings = this.playerBet * 3;
                }
                else if (this.cherries == 2) {
                    this.winnings = this.playerBet * 4;
                }
                else if (this.bars == 2) {
                    this.winnings = this.playerBet * 5;
                }
                else if (this.bells == 2) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this.sevens == 2) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this.sevens == 1) {
                    this.winnings = this.playerBet * 5;
                }
                else {
                    this.winnings = this.playerBet * 1;
                }
                this.winNumber++;
                this.showWinMessage();
            }
            else
            {
                this.lossNumber++;
                this.showLossMessage();
            }
            
        }

        public spinButtonOnClicked()
        {
            this.playerBet=+this.betInput.value;
            if (this.playerMoney == 0)
            {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    this.resetAll();
                    this.showPlayerStats();
                }
            }
            else if (this.playerBet > this.playerMoney) {
                alert("You don't have enough Money to place that bet.");
            }
            else if (this.playerBet < 0) {
                alert("All bets must be a positive $ amount.");
            }
            else if (this.playerBet <= this.playerMoney) {
                this.spinResult = this.Reels();
                this.reel0Label=new objects.Image('./Assets/images/'+this.spinResult[0]+'.png', 122, 188, false);
                this.reel1Label=new objects.Image('./Assets/images/'+this.spinResult[1]+'.png', 260, 224, true);
                this.reel2Label=new objects.Image('./Assets/images/'+this.spinResult[2]+'.png', 328, 188, false);
                this.addChild(this.reel0Label);
                this.addChild(this.reel1Label);
                this.addChild(this.reel2Label);
                this.determineWinnings();
                this.turn++;
                this.showPlayerStats();
                console.log(this.spinResult[0]+this.spinResult[1]+this.spinResult[2])
            }
            else {
                alert("Please enter a valid bet amount");
            }
        }

        public Start(): void 
        {
            //
            
            createjs.Sound.registerSound("./Assets/sounds/win.mp3", "win");
            createjs.Sound.registerSound("./Assets/sounds/lose.mp3", "lose");
            //instantiate a new Text object
            this.statsLabel = new objects.Label("Jackpot:" +this.jackpot+"\nPlayer Money:"+this.playerMoney+"\nTurn:"+this.turn+"\nWins:"+this.winNumber+"\nLosses:"+this.lossNumber+"\nWin Ratio:"+(this.winRatio * 100).toFixed(2)+"%", "16px", "Consolas", "#ffffff", 80, 10, false);
            this.winOrLoseLabel = new objects.Label("", "32px", "Consolas", "#ff0000", 400, 40, false);
            //Reels
            this.reel0Label = new objects.Image('./Assets/images/seven.png', 122, 188, false);
            this.reel1Label = new objects.Image('./Assets/images/seven.png', 260, 224, true);
            this.reel2Label = new objects.Image('./Assets/images/seven.png', 328, 188, false);
            // buttons
            this.spinButton = new objects.Button('./Assets/images/Circle_Red.png', 256, 410, true);
            this.resetButton = new objects.Button('./Assets/images/reset.png', 400, 410, true);
            this.Main();
            
        }        
        
        public Update(): void 
        {
           
        }
        
        public Main(): void 
        {
            this.addChild(this.statsLabel);
            this.addChild(this.reel0Label);
            this.addChild(this.reel1Label);
            this.addChild(this.reel2Label);

            this.addChild(this.winOrLoseLabel);
            this.addChild(this.spinButton);
            this.addChild(this.resetButton);

            this.spinButton.on("click", ()=>{
                this.removeChild(this.reel0Label);
                this.removeChild(this.reel1Label);
                this.removeChild(this.reel2Label);
                this.spinButtonOnClicked();
                console.log("spin!!!")
            });
            this.resetButton.on("click", ()=>{
                this.removeChild(this.reel0Label);
                this.removeChild(this.reel1Label);
                this.removeChild(this.reel2Label);
                this.resetAll();
                this.showPlayerStats();
            });

        }

        
    }
}