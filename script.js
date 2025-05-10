<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>刷脸系统</title>
  <style>
    /* 整体样式 */
    body {
      font-family: Arial, sans-serif;
      text-align: center;
    }

    /* 摄像头显示区域样式 */
    #camera {
      width: 300px;
      height: 300px;
      margin: 50px auto;
      border: 1px solid #ccc;
    }

    /* 按钮样式 */
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
    }

    /* 提示框样式 */
    #prompt {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    /* 输入框样式 */
    input {
      margin-bottom: 10px;
      padding: 5px;
    }
  </style>
</head>

<body>
  <div id="text-container">
    <p>点击下方按钮刷脸认证</p>
  </div>
  <div id="camera"></div>
  <button id="startButton">开始刷脸</button>
  <div id="prompt">
    <p>刷脸成功，请填写姓名：</p>
    <input type="text" id="nameInput">
    <button id="confirmButton">确定</button>
  </div>

  <script>
    const startButton = document.getElementById('startButton');
    const prompt = document.getElementById('prompt');
    const confirmButton = document.getElementById('confirmButton');
    const nameInput = document.getElementById('nameInput');
    const camera = document.getElementById('camera');

    startButton.addEventListener('click', function () {
      // 调用摄像头
      navigator.mediaDevices.getUserMedia({ video: true })
       .then(function (stream) {
          const video = document.createElement('video');
          video.width = 300;
          video.height = 300;
          video.srcObject = stream;
          video.play();
          camera.appendChild(video);

          // 模拟2秒后刷脸成功
          setTimeout(function () {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
            video.remove();
            prompt.style.display = 'block';
          }, 2000);
        })
       .catch(function (error) {
          console.log('无法访问摄像头', error);
        });
    });

    confirmButton.addEventListener('click', function () {
      const name = nameInput.value;
      if (name === "") {
        alert("姓名不能为空");
      } else if (/^[0-9]+$/.test(name)) {
        alert("姓名不能为数字");
      } else {
        // 这里可以添加将姓名发送到服务器等操作
        console.log('填写的姓名:', name);
        // 模拟跳转到index.html
        window.location.href = 'index.html';
      }
    });
  </script>
</body>

</html>
