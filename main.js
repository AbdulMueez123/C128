var song = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet( video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded() {
    console.log("poseNet Initialized");
}
function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        RightWristX = results[0].pose.RightWrist.x; 
        RightWristY = results[0].pose.RightWrist.y; 
        console.log("right wrist x = " + RightWristX + "right wrist y = " + RightWristY);
        LeftWristX = results[0].pose.LeftWrist.x; 
        LeftWristY = results[0].pose.LeftWrist.y; 
        console.log("Left wrist x = " + LeftWristX + "Left wrist y = " + LeftWristY);
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(LeftWristX,LeftWristY,20);
    InnumberLeftWristY = Number(LeftWristY);
    Remove_Decimal = floor(InnumberLeftWristY);
    volume = Remove_Decimal/500;
    document.getElementById("volume").innerHTML = "Volume : " + volume;
    song.setVolume(volume);
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}