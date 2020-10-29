

const video = document.querySelector("video");
const checkBox1 = document.getElementById("myCheck1");
const checkBox2 = document.getElementById("myCheck2");

 


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/webface99/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/webface99/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/webface99/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/webface99/models')
  ]).then(startVideo)

function startVideo() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}


video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      faceapi.draw.drawDetections(canvas, resizedDetections)
      if (checkBox1.checked == true){
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)}
      if (checkBox2.checked == true){
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)}
    }, 100)
  })
