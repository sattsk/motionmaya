async function generateVideo() {
    const imageInput = document.getElementById('imageInput');
    const narration = document.getElementById('narrationInput').value;
    const language = document.getElementById('languageSelect').value;
    const statusDiv = document.getElementById('status');
    const video = document.getElementById('outputVideo');

    if (!imageInput.files[0]) {
        alert("Please upload an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("prompt", narration);
    formData.append("lang", language);

    statusDiv.innerText = "Generating video... Please wait.";

    try {
        const response = await fetch("https://9363-35-222-134-147.ngrok-free.app/generate", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to generate video.");
        }

        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        video.src = videoUrl;
        video.style.display = "block";
        statusDiv.innerText = "Video ready!";
    } catch (err) {
        console.error(err);
        statusDiv.innerText = "Error generating video.";
    }
}
