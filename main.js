const prompt = require('prompt-sync')({sigint: true});

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
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  console.log(myField.print)