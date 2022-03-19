music = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload() {
    music = loadSound("music.mp3");

}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(700,300);

    video = createCapture(VIDEO);
    video.center();
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", GotPoses);
}

function modelLoaded() {
 console.log("Posenet has been initialized");
}

function draw() {
    image(video, 0, 0, 500 ,500);
    if (scoreRightWrist > 0.2) {
    stroke("red");
    fill("red");
    circle(rightWrist_x, rightWrist_y, 20);
    InNumberRightWristY = Number(rightWrist_y);
    rounded_decimal = floor(InNumberRightWristY);
    volume = rounded_decimal/500;
    music.setVolume(volume);
    console.log(volume);
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    }


    if (scoreLeftWrist > 0.1) {
        
        stroke("green");
        fill("green");
        circle(leftWrist_x, leftWrist_y, 20);
        
    if (leftWrist_y > 0 && leftWrist_y <= 100) {
        document.getElementById("sound").innerHTML = "Speed = 0.5x";
        music.rate(0.5);
    }

    if (leftWrist_y > 100 && leftWrist_y <= 200) {
        document.getElementById("sound").innerHTML = "Speed = 1x";
        music.rate(1);
    }

    if (leftWrist_y > 200 && leftWrist_y <= 300) {
        document.getElementById("sound").innerHTML = "Speed = 1.5x";
        music.rate(1.5);
    }

    if (leftWrist_y > 300 && leftWrist_y <= 400) {
        document.getElementById("sound").innerHTML = "Speed = 2x";
        music.rate(2);
    }

    if (leftWrist_y > 400 && leftWrist_y <= 500) {
        document.getElementById("sound").innerHTML = "Speed = 2.5x";
        music.rate(2.5);
    }
}
}

function play() {
    music.play();//play music

}

function GotPoses(results, error) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(" Score right Wrist - " + scoreRightWrist);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score left Wrist - " + scoreLeftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWrist_x + " left Wrist Y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWrist_x + " Right Wrist Y = " + rightWrist_y);
    }
}