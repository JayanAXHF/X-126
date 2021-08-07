function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}



function draw() {
    image(video, 0, 0, 600, 500);
    fill("3DFFE1")
    stroke("3DFFE1")





    if (leftWrist_score > 0.2) {
        circle(leftwristX, leftwristY, 20)

        leftwristY_no = Number(leftwristY);

        leftwristY_no = floor(leftwristY_no);

        volume = leftwristY_no / 500;

        document.getElementById("Volume").innerHTML = "Volume : " + volume;

        song.setVolume(volume);
    }

    // todo right hand 

    if (rightwrist_Score > 0.2) {
        circle(rightwristX, rightwristY, 20)

        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed : 0.5x"

            song.rate(0.5);

        } else if (rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed : 1x"

            song.rate(1);
        } else if (rightwristY > 200 && rightwristY <= 300) {

            document.getElementById("speed").innerHTML = "Speed : 1.5x"

            song.rate(1.5);
        } else if (rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed : 2x"

            song.rate(2)

        } else if (rightwristY > 400 && rightwristY <= 500) {

            document.getElementById("speed").innerHTML = "Speed : 2.5x"

            song.rate(2.5)
        }


    }









}


song = "";
leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

function preload() {
    song = loadSound("music.mp3");

}

let
    content = document.getElementsByClassName("play").value;


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);


    // if (content == "Play") {
    //     document.getElementsByClassName("play").innerHTML = "Pause";

    //     document.getElementsById("play").innerHTML = "Pause"
    // }
    // if (content == "Pause") {
    //     document.getElementsById("play").innerHTML = "Play";

    //     song.stop();

    // }
}



//!  dummy function

function modelLoaded() {

}

/* end of dummy function */

function gotPoses(results) {

    if (results.length > 0) {
        console.log(" file: main.js ~ line 64 ~ gotPoses ~ if statement ~ results = ", results);

        rightwrist_Score = results[0].pose.keypoints[10].score;
        console.log("🚀 ~ file: main.js ~ line 125 ~ gotPoses ~ rightwrist_Score", rightwrist_Score)


        leftWrist_score = results[0].pose.keypoints[9].score
        console.log("file: main.js ~ line 91 ~ gotPoses ~ leftWrist_score", leftWrist_score)


        leftwristX = results[0].pose.leftWrist.x;
        console.log("file: main.js ~ line 72 ~ gotPoses ~ leftwristX", leftwristX)

        leftwristY = results[0].pose.leftWrist.y;
        console.log("file: main.js ~ line 75 ~ gotPoses ~ leftwristY ", leftwristY)

        rightwristX = results[0].pose.rightWrist.x;
        console.log("🚀 ~ file: main.js ~ line 78 ~ gotPoses ~ rightwristX", rightwristX)

        rightwristY = results[0].pose.rightWrist.y;
        console.log("🚀 ~ file: main.js ~ line 81 ~ gotPoses ~ rightwristY", rightwristY)
    }
}