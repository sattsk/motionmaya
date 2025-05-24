document.getElementById('generateBtn').addEventListener('click', () => {
    const progressSection = document.querySelector('.progress-section');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    progressSection.style.display = 'block';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;
        progressPercent.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            document.querySelector('.output-section').style.display = 'block';
            document.getElementById('outputVideo').src = 'sample-video.mp4';
        }
    }, 300);
});
