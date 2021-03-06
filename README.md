# BK-909

Inspired by TR-909, coded by Bada Kim.
Drums synthesized from WebAudioApi.

http://cirakuze.github.io/BK-909

## Tech
BK-909 is an app built on React.
Drum sounds were synthesized using WebAudioAPI.
![Bass code](./app/assets/images/bassCode.png?raw=true "Bass code")

## Playing the Drums \m/
Drums are played by pressing the keyboard key labeled on the drums.
Some drums have two letters, and some one. Those with two letters are those that are often played rapidly in sucession.
![Drum keys](./app/assets/images/drumKeys.png?raw=true "Drum keys")

## Setting the Sequence
The white keys below the drum set are the keys for the sequencer.
Toggle a sequencer step by pressing the key labeled on the step.
Red dot is on, brown dot is off.
![Step keys](./app/assets/images/stepKeys.png?raw=true "Step keys")

## Playing back the sequence
Press the space bar to start the play back.
Press the space bar again to pause.
Press enter to reset to the beginning.

## Extending the pattern
Press +/- keys to lengthen or shorten the pattern.
Press tab to cycle through the rows for edit.
![Pattern Rows](./app/assets/images/patternRows.png?raw=true "Pattern Rows")

## Changing the tempo
The up/down arrow keys change the tempo of the sequencer.
This can be done during playback as well.
![Tempo change](./app/assets/images/tempoChange.png?raw=true "Tempo change")

## Changing the patterns
A pattern (a bank) stores the rhythm of 8 different drums.
There are 16 banks in total, for access to 16 different rhythms instantly.
Banks can be switched by pressing the ~ (tilde) key,
then pressing one of the sequencer step keys.

## BONUS: piano
Press the right arrow key to access the piano.
Space bar sustains notes.
![Piano Roll](./app/assets/images/pianoRoll.png?raw=true "Piano Roll")

## EXTRA BONUS: drawbars
Piano has four drawbars like on an electric organ that adds or reduces multiple layers of sound.
![Draw Bars](./app/assets/images/drawBars.png?raw=true "Draw Bars")

## Todos
Option to increase pattern length from 16 steps to 32 steps.
Different sets of drum sounds.
