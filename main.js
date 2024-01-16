const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(rows, cols, holesPercentage) {
        this._field = this.generateField(rows, cols, holesPercentage)
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

    generateField(rows, cols, holesPercentage) {
        const finalField = []

        for (let row = 0; row < rows; row++) {
            const generatedRow = []
            for (let col = 0; col < cols; col++) {
                generatedRow.push('░')
            }
            finalField.push(generatedRow)
        }

        console.log('finalField is:')
        console.log(finalField)
        console.log('finalField[0] is:')
        console.log(finalField[0])
        console.log('finalField[0][0] is:')
        console.log(finalField[0][0])
        finalField[0][0] = '*'
        console.log('finalField[0][0] is now:')
        console.log(finalField[0][0])

        // Set hat position
        let hatRow
        let hatCol
        while(hatRow == null && hatCol == null || hatRow === 0 && hatCol === 0) {
            hatRow = Math.floor(Math.random() * rows)
            hatCol = Math.floor(Math.random() * cols)                    
        }

        finalField[hatRow][hatCol] = '^'

        // Set holes
        const fieldCount = rows * cols
        const requiredHoles = Math.floor(fieldCount * holesPercentage)
        console.log(`There are ${fieldCount} fields and so ${holesPercentage} of that is ${requiredHoles}`)
        let holes = []
        for (let i = 0; i < requiredHoles; i++) {
            let holeRow
            let holeCol
            while (
                holeRow == null && holeCol == null || 
                holeRow === 0 && holeCol === 0 || 
                holeRow === hatRow && holeCol === hatCol || 
                holes.some(holeCoords => holeCoords.every((value, index) => value === [holeRow, holeCol][index])) 
            ) {
                holeRow = Math.floor(Math.random() * rows)
                holeCol = Math.floor(Math.random() * cols)
            }
            holes.push([holeRow, holeCol])
        }
        for (const holeCoordinate of holes) {
            finalField[holeCoordinate[0]][holeCoordinate[1]] = 'O'
        }

        if (!this.isPathToHat(finalField)) {
            this.generateField(rows, cols, holesPercentage)
        }

        return finalField
    }

    isPathToHat(field) {
        // Starting position
        let queue = [[0,0]]

        // Track visited tiles
        let visited = new Set(['0,0'])

        // While there are still tiles to visit
        while (queue.length > 0) {
            // Remove the first tile in the queue
            let [row, col] = queue.shift()
            // Check for the hat
            if (field[row][col] === '^') {
                return true
            }
            // if no hat, explore neighbours
            const neighbours = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]]
            neighbours.forEach(([newRow, newCol]) => {
                if (newRow >= 0 && 
                    newRow < field.length && 
                    newCol >= 0 && 
                    newCol < field[row].length && 
                    field[row][col] !== 'O' &&
                    !visited.has(`${newRow},${newCol}`)
                ) {
                    queue.push([newRow, newCol])
                    visited.add(`${newRow},${newCol}`)
                }
            })
        }
        return false //if no path found
    }

    getPosition(character) {
        let positionRow
        let positionCol
        for (let row = 0; row < myField.field.length; row++) {
            const checkForPlayer = myField.field[row].indexOf(character)
            if (checkForPlayer != -1) {
                positionRow = row
                positionCol = checkForPlayer
            }
        }
        return {positionRow, positionCol}
    }

    moveRight() {
        const {positionRow: playerRow, positionCol: playerCol} = this.getPosition('*')

        // Check if moving right would move the player out of bounds
        if(playerCol + 1 > myField.field[playerRow].length - 1) {
            console.log('You moved out of bounds!')
            process.exit()
        }        

        // Check if moving right would move the player into a hole
        if (myField.field[playerRow][playerCol + 1] === 'O') {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Check if moving right would cause the character to win the game
        if (myField.field[playerRow][playerCol + 1] === '^') {
            console.log('You win!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow][playerCol + 1] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')

    }

    moveLeft() {
        const {positionRow: playerRow, positionCol: playerCol} = this.getPosition('*')

        // Check if moving left would move the player out of bounds
        if(playerCol - 1 < 0) {
            console.log('You moved out of bounds!')
            process.exit()
        }        

        // Check if moving left would move the player into a hole
        if (myField.field[playerRow][playerCol - 1] === 'O') {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Check if moving left would cause the character to win the game
        if (myField.field[playerRow][playerCol - 1] === '^') {
            console.log('You win!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow][playerCol - 1] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')

    }

    moveDown() {
        const {positionRow: playerRow, positionCol: playerCol} = this.getPosition('*')

        if(playerRow + 1 > myField.field.length - 1) {
            console.log('You moved out of bounds!')
            process.exit()
        }

        // Check if moving down would move the player into a hole
        if (myField.field[playerRow + 1][playerCol] === 'O') {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Check if moving down would cause the character to win the game
        if (myField.field[playerRow + 1][playerCol] === '^') {
            console.log('You win!')
            process.exit(0)
        }

        // Move the player
        myField.field[playerRow + 1][playerCol] = '*'
        myField.field[playerRow][playerCol] = '░'
        console.clear()
        process.stdout.write(myField.print + '\n' + 'Which way? ')
 
    }

    moveUp() {
        const {positionRow: playerRow, positionCol: playerCol} = this.getPosition('*')

        // Check if moving up would move the player off the board
        if (playerRow - 1 < 0) {
            console.log('You moved out of bounds!')
            process.exit(0)
        }

        // Check if moving up would move the player into a hole
        if (myField.field[playerRow - 1][playerCol] === 'O') {
            console.log('You fell down a hole!')
            process.exit(0)
        }

        // Check if moving up would cause the character to win the game
        if (myField.field[playerRow - 1][playerCol] === '^') {
            console.log('You win!')
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


let myField = new Field(20, 20, 0.40)
console.clear()
process.stdout.write(myField.print + '\n' + 'Which way? ')
process.stdin.on('data', handleInput)