# Mars Rover Project

> 👾 🚀 You are working in an Engineering Squad for the 🎶 Melody Mars Mission,
> tasked with designing software to manage robots 🤖 and cool vehicles for space
> exploration! 👽 🛸🌏

My implementation of the Tech Returners Mars Rover Project.

## Project Description

> You have been asked to create a program to move rovers around the surface of Mars! ✨
> The surface of Mars is represented by a Plateau. You can make the assumption that the
> Plateau is a square/rectangular grid for the purpose of this task.
> Rovers navigate the Plateau so they can use their special cameras 📷 and robot arms
> 🦾 to collect samples back to Planet Earth 🌏

### Objectives

To simulate the movement of a Mars rover on a plateau:

- [x] The first line inputted into the program represents the upper-right coordinates of the Plateau, e.g. 5 5
- [x] The second line represent the rovers starting position and orientation, e.g. 1 2 N
- [x] The third line is a string of movement instructions for the rover (e.g., "LMMRMM").
- [x] Implement the logic to move the rover according to these instructions.
- [x] The rover should not fall off the plateau or run into obstacles.

Output:

- [x] For each Rover, the output represents its final position (final coordinates and where it is facing).

Stretch tasks:

- [x] Handle multiple rovers on the same plateau.
- [x] Implement a UI to control the rovers.
- [x] Supple input via a file

TODO:

- [ ] UI based error handling
- [ ] Further refactoring

## Running locally

### Prerequisites

- Install [Git](https://git-scm.com/)
- Install [Node.js](https://nodejs.org/) (the project was developed using Node 18.18.2).

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/chaecramb/mars-rover.git
   ```

2. Change to the project directory:

   ```sh
   cd mars-rover
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. (optional) Run tests:

```sh
npm test
```

## Usage

### GUI

For GUI mode it is suggested to run in a full screen standalone terminal window.

```sh
npm start
```

Controls

- Movement
  - For simplicity of keyboard control, the arrow keys can be used to control the rover
  - Up to move forward
  - Left/Right to turn
  - These will be translated to commands the rover understands, e.g. L R M.
- Press q to quit the simulation
- Press l to launch another rover
- Press s to switch active rovers. This will cycle through the active rovers

### File Based Input

```sh
npm start <filename>
```
