const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.75;
canvas.height = window.innerHeight * 0.85;

const numberOfNumbers = 30;
let ticks = 0;
const speed = 100;
const array = [];
const arrayOfRectangles = [];
let isSorted = false;

function Rectangle(value, i) {
    this.colour = "black";
    this.value = value;
    this.x = (canvas.width/numberOfNumbers) * i;
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

function BubbleSort() {
    if(array[ticks] > array[ticks + 1]) {
        isSorted = false;
        //console.log(array[ticks]);
        let temp = array[ticks];
        array[ticks] = array[ticks+1];
        array[ticks+1] = temp;
        arrayOfRectangles[ticks].changeValue(array[ticks]);
        arrayOfRectangles[ticks+1].changeValue(array[ticks+1]);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawAll(arrayOfRectangles);
    }
    ticks++;
}

function animate() {
    isSorted = true;
    if(ticks < array.length - 1) {
        setTimeout(() => {
            BubbleSort();
            animate();
        }, speed)
    }
    else {
        ticks = 0;
        animate();
    }
}
/*
async function animate() {
    if(ticks < array.length - 1) {
        await setTimeout(BubbleSort(), speed * ticks);
        animate();
    }
}

function animate() {
        if(ticks < array.length - 1) {
            setTimeout(() => {
                BubbleSort();
                animate();
            }, speed);
        } else {
            ticks = 0;
            animate();
        }
}
*/
FillArray();
RandomiseArray();
PopulateArrayOfRectangles();
DrawAll(arrayOfRectangles);
animate();