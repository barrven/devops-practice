const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
draw(200, 200, 20); //draw the spiral with defaults when the page loads

function draw(startX, startY, n){

    //define edges
    let xEdgeVal = canvas.getAttribute('width');
    let yEdgeVal = canvas.getAttribute('height');

    //define starting coordinates
    let coords = [startX, startY]
    context.moveTo(coords[0], coords[1]); //start the line

    let pixelIncrement = n; // increases the length of the line segment on each iteration
    let sign = 1; // sets the direction of the increment: 1 == right or down, -1 == left or up

    //continue drawing the line while coordinates are not out of bounds
    while (!isOutOfBounds([coords[0], coords[1]], [xEdgeVal, yEdgeVal])){
        for (let i = 0; i < 2; i++){
            if (sign === 1){
                coords[i] += pixelIncrement;
            }
            else{
                coords[i] -= pixelIncrement;
            }
            context.lineTo(coords[0], coords[1]); // next point of line
            context.stroke(); //draw
        }
        console.log(`${coords[0]}, ${coords[1]}, ${sign}`);
        pixelIncrement += n; //update the pixel increment for the next for loop iteration
        sign *= -1; //flip the sign
    }

}

//canvas edge detection
function isOutOfBounds(coordinates, bounds){
    //coordinates and bounds are arrays of the same length
    let length = coordinates.length;

    for (let i = 0; i < length; i++){
        //if any coordinates are < 0, then they are out of bounds
        if (coordinates[i] < 0)
            return true;

        // if any coordinates are larger than the height and width of the canvas, they are out of bounds
        if (coordinates[i] > bounds[i])
            return true;
    }
    return false;
}

function getValue(inputElement){
    return document.getElementById(inputElement).value;
}

function update(){

    /*get the value of each input element, then
    convert the string to an int so we can do math with it inside the draw function*/
    let n = parseInt(getValue('n'));
    let x = parseInt(getValue('x'));
    let y = parseInt(getValue('y'));

    erase();
    draw(x, y, n);
}

//clears the canvas of previous drawings
function erase(){
    let width = parseInt(canvas.getAttribute('width'));
    let height = parseInt(canvas.getAttribute('height'));
    //clears a rectangle shaped space of a given height and width and starting x,y
    context.clearRect(0,0, width, height);
    /*essential to use .beginPath() to clear the line buffer so that old lines do not
    appear next time .stroke() is called*/
    context.beginPath();
}