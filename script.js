document.getElementById('generateBtn').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageUpload');
    const narrationInput = document.getElementById('narration');
    const progressBar = document.getElementById('progressBar');
    const progressSection = document.querySelector('.progress-section');
    const progressPercent = document.getElementById('progressPercent');
    const outputSection = document.querySelector('.output-section');
    const outputVideo = document.getElementById('outputVideo');

    if (!imageInput.files[0] || !narrationInput.value) {
        alert("Please upload an image and enter narration.");
        return;
    }

    progressSection.style.display = 'block';
    progressBar.value = 0;
    progressPercent.textContent = "0%";
    outputSection.style.display = 'none';

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('prompt', narrationInput.value);

    try {
        const startRes = await fetch('https://your-colab-backend-url/start-generation', {
            method: 'POST',
            body: formData
        });

        const { taskId } = await startRes.json();

        let progress = 0;
        let videoUrl = "";

        while (progress < 100) {
            const progressRes = await fetch(`https://your-colab-backend-url/progress/${taskId}`);
            const data = await progressRes.json();
            progress = data.progress;
            videoUrl = data.video_url;

            progressBar.value = progress;
            progressPercent.textContent = `${progress}%`;

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (videoUrl) {
            outputSection.style.display = 'block';
            outputVideo.src = videoUrl;
            outputVideo.load();
        } else {
            alert("Video URL not received.");
        }
    } catch (err) {
        console.error("Error generating video:", err);
        alert("An error occurred while generating the video.");
    }
});
