const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.85;

const numberOfNumbers = 50;
let i = 0;
let j = 0;
let hasSwapped = false;
const speed = 20;
const array = [];
const arrayOfRectangles = [];


function Rectangle(value, i) {
    this.colour = "black";
    this.i = i
    this.value = value;
    this.x = (canvas.width/numberOfNumbers) * i;
    this.y = 0;
    this.width = (canvas.width/numberOfNumbers) * 0.95;
    this.height = (canvas.height/numberOfNumbers) * value;

    this.changeValue = (v) => {
        this.value = v;
        this.height = canvas.height/numberOfNumbers * v;
    }

    this.changeColour = (colour) => {
        this.colour = colour;
    }

    this.drawRectangle = () => {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.rectangleResize = () => {
        this.x = (canvas.width/numberOfNumbers) * this.i;
        this.width = (canvas.width/numberOfNumbers) * 0.95;
        this.height = (canvas.height/numberOfNumbers) * this.value;
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.85;
    arrayOfRectangles.forEach(e => {
        e.rectangleResize();
    })
});

function FillArray() {
    for(let i = 1; i <= numberOfNumbers; i++) array.push(i);
}

function RandomiseArray() {
    array.sort(() => (Math.random() > 0.5 ? 1 : -1));
}

function DrawAll(rectangles) {
    rectangles.forEach(r => r.drawRectangle());
}

function PopulateArrayOfRectangles() {
    for(let i = 0; i < array.length; i++) arrayOfRectangles.push(new Rectangle(array[i], i));
}

function BubbleSort() {
    if(i > 0)arrayOfRectangles[array.length - i].changeColour('green');
    if(array[j] > array[j + 1]) {
        hasSwapped = true

        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;

        arrayOfRectangles[j].changeValue(array[j]);
        arrayOfRectangles[j+1].changeValue(array[j+1]);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawAll(arrayOfRectangles);
    }
    j++;
}

function animate() {
    if(j < array.length - i) {
        setTimeout(() => {
            BubbleSort();
            animate();
        }, speed)
    }
    else if(hasSwapped){
        setTimeout(() => {
            hasSwapped = false
            i++
            j = 0;
            animate();
        }, speed)
    }
    else{
        arrayOfRectangles.forEach(e => e.changeColour('green'));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawAll(arrayOfRectangles);
    }
}

FillArray();
RandomiseArray();
PopulateArrayOfRectangles();
DrawAll(arrayOfRectangles);
animate();