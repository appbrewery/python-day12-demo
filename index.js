//Current line
var CurrentId = undefined;

var inputValues = [];
const inputPrompts = [];

const logo = `
  / _ \\_   _  ___  ___ ___  /__   \\ |__   ___    /\\ \\ \\_   _ _ __ ___ | |__   ___ _ __ 
 / /_\\/ | | |/ _ \\/ __/ __|   / /\\/ '_ \\ / _ \\  /  \\/ / | | | '_ ' _ \\| '_ \\ / _ \\ '__|
/ /_\\\\| |_| |  __/\\__ \\__ \\  / /  | | | |  __/ / /\\  /| |_| | | | | | | |_) |  __/ |   
\\____/ \\__,_|\\___||___/___/  \\/   |_| |_|\\___| \\_\\ \\/  \\__,_|_| |_| |_|_.__/ \\___|_|        
`;

const EASY_LEVEL_TURNS = 10;
const HARD_LEVEL_TURNS = 5;
let answer;
let turns;

//Click Run
$(document).ready(function () {
  $("#run-button").click(function () {
    inputValues = [];
    $("#Content").empty();
    restart();
  });
});

function restart() {
  answer = Math.floor(Math.random() * 100 + 1);

  NewLine(logo, false);
  NewLine("Welcome to the Number Guessing Game!", false);
  NewLine("I'm thinking of a number between 1 and 100.", false);
  // NewLine(`Pssst, the correct answer is ${answer}`);
  NewLine("Choose a difficulty. Type 'easy' or 'hard': ", true);
}

//Enter button
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  if (x === 13 || x == 13) {
    var consoleLine = $("#" + CurrentId + " input").val();
    inputValues.push({ id: CurrentId, val: consoleLine });

    if (inputValues.length > 1) {
      const guess = Number(inputValues[inputValues.length - 1].val);
      if (guess != answer) {
        turns -= 1;

        if (guess < answer) {
          NewLine("Too low.", false);
        } else if (guess > answer) {
          NewLine("Too high.", false);
        }

        if (turns == 0) {
          $(".console-carrot").remove();
          NewLine("You've run out of guesses, you lose.", false);
          return;
        } else {
          NewLine("Guess again.", false);
        }
      } else {
        $(".console-carrot").remove();
        NewLine(`You got it! The answer was ${answer}.`, false);
        return;
      }
    } else {
      if (inputValues[0].val.toLowerCase().trim() == "easy") {
        turns = 10;
      } else {
        turns = 5;
      }
    }
    NewLine(`You have ${turns} attempts remaining to guess the number.`);
    NewLine("Make a guess: ", true);
    // $(".console-carrot").remove();
    // if (biddingShouldContinue) {
    //   NewLine(inputPrompts[inputValues.length - 1], true);
    // }
  }
});
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  var line = $("#" + CurrentId + " input");
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * 0.95);
  }
  if (length === 0) {
    $("#" + CurrentId + " input").attr("size", "1");
  }
});
$(document).on("click", function (e) {
  $("#" + CurrentId + " input").focus();
});

//New line
function NewLine(text, isPrompt) {
  $(".console-carrot").remove();
  if (CurrentId !== undefined) {
    $("#" + CurrentId + " input").prop("disabled", true);
  }
  CurrentId = "consoleInput-" + GenerateId();

  if (isPrompt) {
    $("#Content").append(
      //One Line
      '<div id="' +
        CurrentId +
        '">' +
        text +
        '<input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>'
    );
    $("#" + CurrentId + " input").focus();
    $("#" + CurrentId + " input").attr("size", "1");
  } else {
    $("#Content").append('<div id="' + CurrentId + '">' + text + "</div>");
  }
  document.getElementById(CurrentId).scrollIntoView();
}

function GenerateId() {
  return Math.random().toString(16).slice(2);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
