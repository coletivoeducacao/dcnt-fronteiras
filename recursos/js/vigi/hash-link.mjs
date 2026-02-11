document.addEventListener('click', async (event) => {
    if (!event.target.matches('[id].hash-link')) return;

    try {
        await navigator.clipboard.writeText(document.location.origin + document.location.pathname + '#' + event.target.id);
        document.querySelectorAll('[id].hash-link.copiado').forEach(element => {
            element.classList.remove('copiado');
        });
        event.target.classList.add('copiado');
        setTimeout(function() {
            event.target.classList.remove('copiado');
        }, 2000);
    } catch (error) {
        document.querySelectorAll('[id].hash-link.falha').forEach(element => {
            element.classList.remove('copiado');
        });
        event.target.classList.add('falha');
        setTimeout(function() {
            event.target.classList.remove('falha');
        }, 2000);
    }
});