ST = "";
HP = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    ST = loadSound("St.mp3");
    HP = loadSound("Hp.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function modelLoaded()
{
    console.log('Posenet Is Intialised');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
       
    }
}
function draw()
{
    image(video,0,0,600,500);
    song1_status = ST.isPlaying();
	song2_status = HP.isPlaying();
    fill("#FF0000");
	stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
        ST.stop();

		if(song1_status == false)
		{
			ST.play();
			document.getElementById("song").innerHTML = "Playing - Stranger Things Theme Song"
		}
	}

	if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);

			HP.stop();

		if(song2_status == false)
		{
			HP.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}

	}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
 }