### Writeup
#### What is this project?
Maze is a web-based 3D maze game in JavaScript with React and Redux. Players can explore the maze using “W”, “A”, “S”, “D” to move. They can also move by clicking the buttons on the screen.  
There are four modes to choose from: Easy, Medium, Hard, Pure Maze.  
During the exploration, some random events may happen and change the status of the player or the view of the maze. These events are triggered randomly based on the player’s position in the game.  
 
#### Developing process:
* Designed the game view and main game logic.
* Generated maze layout using union-find algorithm and rendered 3D world using react-three-fiber
* Designed and developed welcome page, guide and game view
* Made game interactive by adding random game events with sound effects

#### Decisions we made:
* Use redux and @reduxjs/toolkit to manage states. 
For example, we use playerStatusSlice to manage the variables related to player status, such as HP. These variables will be updated by corresponding reducers.
Another example is that we use“elapseTimerSlice to the elapsed timer. Variables such as curNumSeconds are updated by corresponding reducers.
* Practice unidirectional flow of information to manage data-and-view separation. For example, LabyrinthView, LabyrinthCamera, EventManger, Minimap all receives props from LabryinthGame.
Also, we used redux to manage the dataflow from children to parents. For example, in GamePanel, we change the posX, and posZ, these values are reflected in the LabrinthGame.
* The App is designed and displayed in a one-page manner. That is, we swap between components using React-router to display different views. This is because we think it is more intuitive for players to stay on the same page while choosing game mode or playing. 

#### Addressing some questions:

##### What were some challenges you faced while making this app?
* The most changellening part in this project is to create a game that the state changes in each frame(1/60s) in the immutable react world. In react the typical logic is that states are immutable and rerender will be based on state change. But in the three-js world, every object is mutable, this is to improve the 3D rendering performance. Thus, we need to build a bridge between the mutable 4D(3D + time) world and immutable game logic. In order to solve this problem, we abstract the consecutive, constantly changing variables into their discrete, immutable counterparts. For example, in order to make the position info immutable and discrete, we have two kinds of position data. One we called position index, they are immutable integers that used in game logic, another is position coordinate, they are mutable floats that are used in 3D rendering only. Each time the player updates the position index, the index will be converted to the corresponding position coordinate for the 3D rendering to use.
* Rendering a 3D maze and adjusting the right user view and improve the 3D rendering performance was a challenge. It took a lot of searching, trying, fine-tuning the arguments to finally achieve. We use react-three-js and react-three/drei to help us render 3D objects, and tried a lot to improve the performance.
* Triggering the randomly generated events was also a challange.

##### Given more time, what additional features, functional or design changes would you make
Currently, the events triggering views are very simple: being triggered based on the position of the player. If we have more time, we could make these views more complex, like adding items in the maze that the players could pickup.  
Secondly, we will consider keeping a record of users in the database, Amazon S3 for example. In this case users could view their former game grades.  

##### What assumptions did you make while working on this assignment?
* Users prefer to read pictures than text, so we used icons instead of text to reflect player status.  
* It's more intuitive for players to stay on the same page when they play the game. Going to another page might give the player a strange feeling,, so we designed it as a one-page app.  
* It's more common to select game mode in the start rather than in the middle of the game.  
* We assume the player has already read the guide when playing the game, thus only basic operation direction needed during the game. Therefore the helper page in the game view only contains necessary information.  

##### How long did this assignment take to complete?
This assignment took us about a month to complete, including designing, discussing and implementing. We wrote more than 4000 lines codes and the total hours spent on working is about 120 hours altogether.

#### Credits:
	Music used in this project comes from Mixkit( https://mixkit.co/free-sound-effects/game/).
