function SierpinskiTriangle(vertices, repeatTimes) {
    if (!repeatTimes) return
    var canvas = document.getElementById('my_Canvas');
    var gl = canvas.getContext('experimental-webgl');

    /* Tạo tọa độ các đỉnh dưới dạng mảng và lưu nó vào buffer object */

    //Tạo tọa độ đỉnh
    // var vertices = [-0.8, 1, -0.8, -1, Math.sqrt(3) - 0.8, 0,];

    // Tạo buffer object
    var vertex_buffer = gl.createBuffer();

    // bind buffer object với một mảng buffer rỗng
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Lưu trữ dữ liệu các đỉnh vào buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Unbind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /* tạo và biên dich shader program */

    // code cho vertex shader
    var vertCode =
        'attribute vec2 coordinates;' +
        'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';

    //Tạo vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);

    //gán vertex shader code cho vertex shader object
    gl.shaderSource(vertShader, vertCode);

    //biên dịch vertext shader
    gl.compileShader(vertShader);

    //Tương tự với fragment shader
    var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' + '}';

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(fragShader, fragCode);

    gl.compileShader(fragShader);

    // Tạo shader program object để lưu trữ shader.
    var shaderProgram = gl.createProgram();

    // gán các shader object cho shasder program
    gl.attachShader(shaderProgram, vertShader);

    gl.attachShader(shaderProgram, fragShader);

    // Liên kết 2 shader
    gl.linkProgram(shaderProgram);

    // Sử dụng shader program
    gl.useProgram(shaderProgram);

    /* Liên kết shader program với buffer object */

    //Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    //Lấy attribute location của shader program
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(coord);

    /* Vẽ hình */

    gl.enable(gl.DEPTH_TEST);

    // gl.clear(gl.COLOR_BUFFER_BIT);

    // thiết lập view port
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Vẽ hình yêu cầu ở đây là tam giác
    gl.drawArrays(gl.LINE_LOOP, 0, 3);


    if (repeatTimes > 0) {
        var newVertices = [];
        newVertices.push(...[vertices[0], vertices[1]]);
        newVertices.push(...GetMidPoint([vertices[0], vertices[1]], [vertices[2], vertices[3]]))
        newVertices.push(...GetMidPoint([vertices[0], vertices[1]], [vertices[4], vertices[5]]))
        SierpinskiTriangle(newVertices, repeatTimes - 1)

        newVertices = [];
        newVertices.push(...[vertices[2], vertices[3]]);
        newVertices.push(...GetMidPoint([vertices[0], vertices[1]], [vertices[2], vertices[3]]))
        newVertices.push(...GetMidPoint([vertices[2], vertices[3]], [vertices[4], vertices[5]]))
        SierpinskiTriangle(newVertices, repeatTimes - 1)

        newVertices = [];
        newVertices.push(...[vertices[4], vertices[5]]);
        newVertices.push(...GetMidPoint([vertices[4], vertices[5]], [vertices[2], vertices[3]]))
        newVertices.push(...GetMidPoint([vertices[0], vertices[1]], [vertices[4], vertices[5]]))
        SierpinskiTriangle(newVertices, repeatTimes - 1)

    }
}

function GetMidPoint(point1, point2) {
    return [(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2]
}