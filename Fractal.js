function getRepeatValue() {
    return document.getElementById("iterations").value;
}
function getDrawType() {
    return document.getElementById("drawtype").value;
}
function Draw(repeatTimes, drawtype) {
    if (drawtype == 1) {
        SierpinskiTriangle([-0.8, 1, -0.8, -1, Math.sqrt(3) - 0.8, 0,], repeatTimes, drawtype)
    }
}