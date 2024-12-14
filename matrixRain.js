function startMatrixRain(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found!`);
        return;
    }

    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const symbols = "!@#$%^&*()";
    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    function randomText() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 20, 147, 1)'; // Розовый неоновый цвет
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = randomText();
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Объемный эффект
            ctx.fillStyle = 'rgba(255, 20, 147, 0.3)';
            ctx.fillText(text, x + 2, y + 2); // Тень

            ctx.fillStyle = 'rgb(164, 0, 179)';
            ctx.fillText(text, x, y); // Основной текст

            // Если символ ушел за нижнюю границу, возвращаем его наверх
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 50);
}