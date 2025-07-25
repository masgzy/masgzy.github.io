// 从 video.json 加载视频数据并随机跳转
fetch('video.json')
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            // 随机选择一个视频
            const randomIndex = Math.floor(Math.random() * data.length);
            const selectedVideo = data[randomIndex];
            
            // 跳转到视频URL
            window.location.href = selectedVideo.url;
        } else {
            console.error('video.json中没有视频数据或格式不正确');
        }
    })
    .catch(error => {
        console.error('加载video.json失败:', error);
    });
