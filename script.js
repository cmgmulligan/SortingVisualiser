const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.85;
const numberOfNumbers = 30;
const array = [];
const arrayOfRectangles = [];

function Rectangle(value, i) {
    this.colour = "black";
    this.value = value;
    this.x = canvas.width/numberOfNumbers * i;
    this.y = 0;
    this.width = canvas.width/numberOfNumbers;
    this.height = (canvas.height/numberOfNumbers) * value;

    this.changeValue = (v) => {
        this.value = v;
        this.height = canvas.height/numberOfNumbers * v;
    }

    this.changeColour = (colour) => {
        this.colour = colour;
    }

    this.drawRectangle = () => {
        ctx.fillStyle.colour = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function FillArray() {
    for(let i = 1; i <= numberOfNumbers; i++) array.push(i);
}

function RandomiseArray() {
    array.sort((a,b) => (Math.random() > 0.5 ? 1 : -1));
}

function DrawAll(rectangles) {
    rectangles.forEach(r => r.drawRectangle());
}

function PopulateArrayOfRectangles() {
    for(let i = 0; i < array.length; i++) arrayOfRectangles.push(new Rectangle(array[i], i));
}

function ClearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function BubbleSort() {
    let speed = 100
    let ticks = 0;
    array.forEach(e => console.log(e));

    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - 1; j++) {
            if(array[j] > array[j+1]) {
                ticks++

                setTimeout(() => {
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                    arrayOfRectangles[j].changeValue(array[j]);
                    arrayOfRectangles[j+1].changeValue(array[j+1]);

                    ClearAll();
                    DrawAll(arrayOfRectangles);
                }, speed * ticks);
            }
        }
    }
    array.forEach(e => console.log(e));
}

FillArray();
RandomiseArray();
PopulateArrayOfRectangles();
DrawAll(arrayOfRectangles);
BubbleSort();