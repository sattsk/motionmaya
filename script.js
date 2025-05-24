
document.getElementById('generateBtn').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageUpload');
  const narration = document.getElementById('narration').value;

  if (!imageInput.files[0] || !narration) {
    alert('Please upload an image and enter a narration.');
    return;
  }

  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('prompt', narration);

  document.querySelector('.progress-section').style.display = 'block';
  document.getElementById('progressBar').value = 0;
  document.getElementById('progressPercent').innerText = '0%';

  const response = await fetch('https://motionmaya-backend.vercel.app/api/start-generation', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  const taskId = data.taskId;

  const poll = setInterval(async () => {
    const res = await fetch(`https://motionmaya-backend.vercel.app/api/progress/${taskId}`);
    const result = await res.json();

    document.getElementById('progressBar').value = result.percent;
    document.getElementById('progressPercent').innerText = `${result.percent}%`;

    if (result.status === 'completed') {
      clearInterval(poll);
      document.querySelector('.output-section').style.display = 'block';
      const video = document.getElementById('outputVideo');
      video.src = result.videoUrl;
      video.load();
    }
  }, 2000);
});
