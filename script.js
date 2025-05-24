
document.getElementById('generateBtn').addEventListener('click', async () => {
  const image = document.getElementById('imageUpload').files[0];
  const prompt = document.getElementById('narration').value;
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const progressSection = document.querySelector('.progress-section');
  const outputSection = document.querySelector('.output-section');
  const outputVideo = document.getElementById('outputVideo');
  const downloadBtn = document.getElementById('downloadBtn');

  if (!image || !prompt) {
    alert('Please upload an image and enter narration');
    return;
  }

  progressSection.style.display = 'block';
  progressBar.value = 0;
  progressPercent.innerText = '0%';
  outputSection.style.display = 'none';

  const formData = new FormData();
  formData.append('image', image);
  formData.append('prompt', prompt);

  const res = await fetch('https://motionmaya-backend.vercel.app/api/start-generation', {
    method: 'POST',
    body: formData
  });

  const { taskId } = await res.json();

  let progress = 0;
  let videoUrl = "";

  const interval = setInterval(async () => {
    const progressRes = await fetch(`https://motionmaya-backend.vercel.app/api/progress/${taskId}`);
    const data = await progressRes.json();
    progress = data.percent;
    progressBar.value = progress;
    progressPercent.innerText = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      videoUrl = data.videoUrl;
      outputSection.style.display = 'block';
      outputVideo.src = videoUrl;
      outputVideo.load();
      downloadBtn.href = videoUrl;
    }
  }, 2000);
});
