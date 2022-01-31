scoreLeftWrist = 0;
scoreRightWrist = 0;
status_song = "";
status_song2 = "";
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    
    status_song = song.isPlaying();
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

    if(status_song == false)
    {
        song.play();
        document.getElementById("song").innerHTML = "Harry Potter Theme Song";
    }
    }

    status_song2 = song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song.stop();

    if(status_song2 == false)
    {
        song2.play();
        document.getElementById("song").innerHTML = "Peter Pan Song";
    }
    }
}
