const audios = document.querySelectorAll('audio');
audios.forEach(audio => {
    const legenda = audio.nextElementSibling.matches('.legenda') ? audio.nextElementSibling : null;
    const textTracks = audio.textTracks ?? null;

    if (!legenda || !textTracks) return;

    legenda.setAttribute('hidden', '');
    audio.addEventListener('play', () => {
        legenda.removeAttribute('hidden', '');
    });

    textTracks.addEventListener('change', (event) => {
        let legendaDesativada = false;
        Array.from(textTracks).forEach(textTrack => {
            if (textTrack.mode !== 'showing') {
                legendaDesativada = true;
            }
        });
        legenda.hidden = legendaDesativada;
    });

    Array.from(textTracks).forEach(textTrack => {
        textTrack.addEventListener("cuechange", (event) => {
            if (event.target.activeCues.length) {
                legenda.innerText = Array.from(event.target.activeCues).map(cue => cue.text).join("\n");
            } else {
                legenda.innerText = '';
            }
        })
    });
});
