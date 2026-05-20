function processVideo() {
  console.log("Button clicked!");
  
  const ref = document.getElementById('refImage').files[0];
  const video = document.getElementById('videoFile').files[0];
  
  console.log("Ref file:", ref);
  console.log("Video file:", video);
  
  if (!ref || !video) {
    alert("Please upload both files!");
    return;
  }

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');

  const formData = new FormData();
  formData.append('reference', ref);
  formData.append('video', video);

  console.log("Sending request to backend...");

  fetch('http://127.0.0.1:5000/process', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log("Got response:", response);
    return response.json();
  })
  .then(data => {
    console.log("Got data:", data);
    document.getElementById('loading').classList.add('hidden');
    if (data.error) {
      alert("Error: " + data.error);
    } else {
      document.getElementById('timestamps').textContent =
        "Person appears at: " + data.timestamps.join('s, ') + "s";
      document.getElementById('downloadBtn').href = 'http://127.0.0.1:5000/download';
      document.getElementById('result').classList.remove('hidden');
    }
  })
  .catch(e => {
    console.error("Error:", e);
    document.getElementById('loading').classList.add('hidden');
    alert("Server error: " + e.message);
  });
}