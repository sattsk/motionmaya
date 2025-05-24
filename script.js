const generateBtn = document.getElementById('generateBtn');
const imageUpload = document.getElementById('imageUpload');
const narration = document.getElementById('narration');
const progressSection = document.querySelector('.progress-section');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const outputSection = document.querySelector('.output-section');
const outputVideo = document.getElementById('outputVideo');

generateBtn.addEventListener('click', () => {
  if (!imageUpload.files.length) {
    alert('Please upload an image first!');
    return;
  }
  if (!narration.value.trim()) {
    alert('Please enter narration text!');
    return;
  }

  // Show progress bar and reset
  progressSection.style.display = 'block';
  outputSection.style.display = 'none';
  progressBar.value = 0;
  progressPercent.textContent = '0%';

  generateBtn.disabled = true;

  // Simulate video generation progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5; // Increase by random 5-15%
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      // Show dummy generated video
      outputVideo.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm';
      outputSection.style.display = 'block';
      generateBtn.disabled = false;
      progressSection.style.display = 'none';
    }
    progressBar.value = progress;
    progressPercent.textContent = progress + '%';
  }, 700);
});