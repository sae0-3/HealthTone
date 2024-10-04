const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
// Actualizar la barra de progreso cuando el audio se esté reproduciendo
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Función para retroceder 10 segundos
rewindBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);  // Asegura que no retroceda más allá del inicio
});

// Función para adelantar 10 segundos
forwardBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);  // Asegura que no avance más allá de la duración total
});

// Permitir al usuario hacer clic en la barra para cambiar el tiempo de reproducción
document.querySelector('.progress-bar-container').addEventListener('click', (e) => {
    const containerWidth = e.target.clientWidth;
    const clickPosition = e.offsetX;
    const newTime = (clickPosition / containerWidth) * audio.duration;
    audio.currentTime = newTime;
});
