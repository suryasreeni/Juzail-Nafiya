/* ==========================================================================
   JUZAIL & NAFIYA WEDDING INVITATION - MODERN BOHEMIAN JS
   Wix Template wh-1110 inspired interactive logic.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            offset: 80
        });
    }

    initPreloader();
    initCountdown();
    initAudioSynth();
    initLightboxModal();
    initCalendarEvent();
});

/* ==========================================================================
   1. PRELOADER & CONFETTI INTRO
   ========================================================================== */
function initPreloader() {
    const loader = document.getElementById('modern-loader');
    setTimeout(() => {
        if (loader) {
            loader.classList.add('loader-done');
            document.body.classList.remove('loading-active');
            
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    }, 1200);
}

/* ==========================================================================
   2. COUNTDOWN TIMER TO 15 NOVEMBER 2026 @ 11:00 AM
   ========================================================================== */
function initCountdown() {
    const weddingDate = new Date('2026-11-15T11:00:00+05:30').getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');

    if (!daysEl) return;

    function updateTimer() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minsEl.innerText = "00";
            secsEl.innerText = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minsEl.innerText = String(minutes).padStart(2, '0');
        secsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. AUDIO SYNTH AMBIENT MELODY
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let synthTimer = null;

function initAudioSynth() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
        if (isAudioPlaying) {
            stopAudioSynth();
        } else {
            startAudioSynth();
        }
    });

    document.addEventListener('touchstart', () => {
        if (!isAudioPlaying) startAudioSynth();
    }, { once: true });
}

function startAudioSynth() {
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isAudioPlaying = true;
        document.querySelector('.audio-control-wrapper')?.classList.add('audio-playing');

        const notes = [440, 554.37, 659.25, 830.61, 880, 1108.73];
        let index = 0;

        synthTimer = setInterval(() => {
            if (!isAudioPlaying || !audioCtx) return;
            playChimeNote(notes[index % notes.length], 1.2);
            index++;
        }, 900);

    } catch (e) {
        console.log("Audio error:", e);
    }
}

function stopAudioSynth() {
    isAudioPlaying = false;
    if (synthTimer) clearInterval(synthTimer);
    document.querySelector('.audio-control-wrapper')?.classList.remove('audio-playing');
}

function playChimeNote(freq, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

/* ==========================================================================
   4. LIGHTBOX MODAL & CALENDAR INTEGRATION
   ========================================================================== */
function initLightboxModal() {
    const card5 = document.getElementById('pos-5-card');
    const modalEl = document.getElementById('photo-lightbox-modal');
    const modalImg = document.getElementById('lightbox-modal-img');
    const img5 = document.getElementById('pos-image-5');

    if (!card5 || !modalEl) return;

    card5.addEventListener('click', () => {
        if (img5 && modalImg) {
            modalImg.src = img5.src;
        }

        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    });
}

function initCalendarEvent() {
    const btn = document.getElementById('btn-add-calendar');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const title = encodeURIComponent("Nikah Ceremony of Juzail & Nafiya");
        const details = encodeURIComponent("You are cordially invited to celebrate the Nikah of Juzail and Nafiya at AH Palace, Gandhi Nagar, Morthana.");
        const location = encodeURIComponent("AH Palace, Gandhi Nagar, Morthana");
        const startDate = "20261115T053000Z";
        const endDate = "20261115T083000Z";

        const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
        window.open(calUrl, '_blank');
    });
}



