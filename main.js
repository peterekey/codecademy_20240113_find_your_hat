const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline')

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(arr) {
        this._field = arr
    }

    get field() {
        return this._field
    }

    get print() {
        let output = ''
        for (let i = 0; i < myField.field.length; i++) {
            output += myField.field[i].join('')
            if (i != myField.field.length-1) {
                output += '\n'
            }
        }
        return output
    }

    getPlayerPosition() {
        let playerRow
        let playerCol
        for (let row = 0; row < myField.field.length; row++) {
            const checkForPlayer = myField.field[row].indexOf('*')
            if (checkForPlayer != -1) {
                playerRow = row
                playerCol = checkForPlayer
            }
        }
        return {playerRow, playerCol}
    }

    moveRight() {
        const {playerRow, playerCol} = this.getPlayerPosition()

        // Check if moving right would move the player out of bounds
        if(playerCol + 1 > myField.field[playerRow].length - 1) {
            console.log('You moved out of bounds!')
            process.exit()
        }        

        // Check if moving left would move the player into a hole
        const holeRow = myField.field[playerRow].indexOf('O')
        if (playerRow + 1 === holeRow) {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow][playerCol + 1] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')

    }

    moveLeft() {
        const {playerRow, playerCol} = this.getPlayerPosition()

        // Check if moving left would move the player out of bounds
        if(playerCol - 1 < 0) {
            console.log('You moved out of bounds!')
            process.exit()
        }        

        // Check if moving left would move the player into a hole
        const holeRow = myField.field[playerRow].indexOf('O')
        if (playerRow - 1 === holeRow) {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow][playerCol - 1] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')

    }

    moveDown() {
        const {playerRow, playerCol} = this.getPlayerPosition()

        if(playerRow+1 > myField.field.length) {
            console.log('You moved out of bounds!')
            process.exit()
        }

        // Check if moving down would move the player into a hole
        const holeCol = myField.field[playerRow + 1].indexOf('O')
        if (playerCol === holeCol) {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow + 1][playerCol] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')
 
    }

    moveUp() {
        // Find the player's row and column index
        const {playerRow, playerCol} = this.getPlayerPosition()

        // Check if moving up would move the player off the board
        if (playerRow-1 < 0) {
            console.log('You moved out of bounds!')
            process.exit(0)
        }

        // Check if moving up would move the player into a hole
        const holeCol = myField.field[playerRow - 1].indexOf('O')
        if (playerCol === holeCol) {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow - 1][playerCol] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')

    }
}   

const handleInput = userInput => {
    switch(true) {
        case ((/r/).test(userInput)):
            myField.moveRight()
            break
        case((/l/).test(userInput)):
            myField.moveLeft()
            break
        case((/d/).test(userInput)):
            myField.moveDown()
            break
        case((/u/).test(userInput)):
            myField.moveUp()
            break
        case((/q/.test(userInput))):
            process.exit(0)
        default:
            console.log('Something went wrong')
            break
    }

}

let myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

console.clear()
process.stdout.write(myField.print + '\n' + 'Which way? ')
process.stdin.on('data', handleInput)