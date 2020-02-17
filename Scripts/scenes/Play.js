"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            //VARIABLES
            _this.playerMoney = 1000;
            _this.winnings = 0;
            _this.jackpot = 5000;
            _this.turn = 0;
            _this.playerBet = 0;
            _this.winNumber = 0;
            _this.lossNumber = 0;
            _this.spinResult = ["", "", ""];
            _this.fruits = "";
            _this.winRatio = 0;
            _this.grapes = 0;
            _this.bananas = 0;
            _this.oranges = 0;
            _this.cherries = 0;
            _this.bars = 0;
            _this.bells = 0;
            _this.sevens = 0;
            _this.blanks = 0;
            // initialization
            _this.statsLabel = new objects.Label();
            _this.reel0Label = new objects.Image();
            _this.reel1Label = new objects.Image();
            _this.reel2Label = new objects.Image();
            _this.betInput = document.getElementById("playerBet");
            _this.winOrLoseLabel = new objects.Label();
            _this.spinButton = new objects.Button();
            _this.resetButton = new objects.Button();
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //Utility function to show Player Stats
        Play.prototype.showPlayerStats = function () {
            this.winRatio = this.winNumber / this.turn;
            this.statsLabel.setText("Jackpot:" + this.jackpot + "\nPlayer Money:" + this.playerMoney + "\nTurn:" + this.turn + "\nWins:" + this.winNumber + "\nLosses:" + this.lossNumber + "\nWin Ratio:" + (this.winRatio * 100).toFixed(2) + "%");
        };
        //Utility function to reset all fruit tallies 
        Play.prototype.resetFruitTally = function () {
            this.grapes = 0;
            this.bananas = 0;
            this.oranges = 0;
            this.cherries = 0;
            this.bars = 0;
            this.bells = 0;
            this.sevens = 0;
            this.blanks = 0;
        };
        //Utility function to reset the player stats
        Play.prototype.resetAll = function () {
            this.playerMoney = 1000;
            this.winnings = 0;
            this.jackpot = 5000;
            this.turn = 0;
            this.playerBet = 0;
            this.winNumber = 0;
            this.lossNumber = 0;
            this.winRatio = 0;
        };
        //Check to see if the player won the jackpot
        Play.prototype.checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this.jackpot + " Jackpot!!");
                this.playerMoney += this.jackpot;
                this.jackpot = 1000;
            }
        };
        //Utility function to show a win message and increase player money
        Play.prototype.showWinMessage = function () {
            createjs.Sound.play("win");
            this.playerMoney += this.winnings;
            this.winOrLoseLabel.setText("You Won: $" + this.winnings);
            this.resetFruitTally();
            this.checkJackPot();
        };
        //Utility function to show a loss message and reduce player money
        Play.prototype.showLossMessage = function () {
            createjs.Sound.play("lose");
            this.playerMoney -= this.playerBet;
            this.winOrLoseLabel.setText("You Lost!");
            this.resetFruitTally();
        };
        //Utility function to check if a value falls within a range of bounds
        Play.prototype.checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        };
        //When this function is called it determines the betLine results. 
        Play.prototype.Reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this.checkRange(outCome[spin], 1, 27): // 41.5% probability
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
        };
        //This function calculates the player's winnings, if any
        Play.prototype.determineWinnings = function () {
            if (this.blanks == 0) {
                if (this.grapes == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this.bananas == 3) {
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
            else {
                this.lossNumber++;
                this.showLossMessage();
            }
        };
        Play.prototype.spinButtonOnClicked = function () {
            this.playerBet = +this.betInput.value;
            if (this.playerMoney == 0) {
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
                this.reel0Label = new objects.Image('./Assets/images/' + this.spinResult[0] + '.png', 122, 188, false);
                this.reel1Label = new objects.Image('./Assets/images/' + this.spinResult[1] + '.png', 260, 224, true);
                this.reel2Label = new objects.Image('./Assets/images/' + this.spinResult[2] + '.png', 328, 188, false);
                this.addChild(this.reel0Label);
                this.addChild(this.reel1Label);
                this.addChild(this.reel2Label);
                this.determineWinnings();
                this.turn++;
                this.showPlayerStats();
                console.log(this.spinResult[0] + this.spinResult[1] + this.spinResult[2]);
            }
            else {
                alert("Please enter a valid bet amount");
            }
        };
        Play.prototype.Start = function () {
            //
            createjs.Sound.registerSound("./Assets/sounds/win.mp3", "win");
            createjs.Sound.registerSound("./Assets/sounds/lose.mp3", "lose");
            //instantiate a new Text object
            this.statsLabel = new objects.Label("Jackpot:" + this.jackpot + "\nPlayer Money:" + this.playerMoney + "\nTurn:" + this.turn + "\nWins:" + this.winNumber + "\nLosses:" + this.lossNumber + "\nWin Ratio:" + (this.winRatio * 100).toFixed(2) + "%", "16px", "Consolas", "#ffffff", 80, 10, false);
            this.winOrLoseLabel = new objects.Label("", "32px", "Consolas", "#ff0000", 400, 40, false);
            //Reels
            this.reel0Label = new objects.Image('./Assets/images/blank.png', 122, 188, false);
            this.reel1Label = new objects.Image('./Assets/images/blank.png', 260, 224, true);
            this.reel2Label = new objects.Image('./Assets/images/blank.png', 328, 188, false);
            // buttons
            this.spinButton = new objects.Button('./Assets/images/Circle_Red.png', 256, 410, true);
            this.resetButton = new objects.Button('./Assets/images/reset.png', 400, 410, true);
            this.Main();
        };
        Play.prototype.Update = function () {
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this.statsLabel);
            this.addChild(this.reel0Label);
            this.addChild(this.reel1Label);
            this.addChild(this.reel2Label);
            this.addChild(this.winOrLoseLabel);
            this.addChild(this.spinButton);
            this.addChild(this.resetButton);
            this.spinButton.on("click", function () {
                _this.removeChild(_this.reel0Label);
                _this.removeChild(_this.reel1Label);
                _this.removeChild(_this.reel2Label);
                _this.spinButtonOnClicked();
                console.log("spin!!!");
            });
            this.resetButton.on("click", function () {
                _this.removeChild(_this.reel0Label);
                _this.removeChild(_this.reel1Label);
                _this.removeChild(_this.reel2Label);
                _this.resetAll();
                _this.showPlayerStats();
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map