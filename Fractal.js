function getRepeatValue() {
    return document.getElementById("iterations").value;
}
function getDrawType() {
    return document.getElementById("drawtype").value;
}
function Draw(repeatTimes, drawtype) {
    var t0 = performance.now();
    if (drawtype == 1) {
        SierpinskiTriangle([-0.8, 1, -0.8, -1, Math.sqrt(3) - 0.8, 0,], repeatTimes, drawtype)
    }
    var t1 = performance.now();
    document.getElementById("status").innerText = `Finished rendering in ${Math.round(parseFloat(t1 - t0) * 1000) / 1000} ms.`
}

