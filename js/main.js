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
    initBgMusic();
    initLightboxModal();
    initCalendarEvent();
});

/* ==========================================================================
   1. PRELOADER, OPEN INVITATION BUTTON & CONFETTI INTRO
   ========================================================================== */
function initPreloader() {
    const loader = document.getElementById('modern-loader');
    const enterBtn = document.getElementById('loader-enter-btn');

    function openInvitation() {
        if (!loader || loader.classList.contains('loader-done')) return;
        
        // Hide preloader overlay
        loader.classList.add('loader-done');
        document.body.classList.remove('loading-active');

        // Play music with full sound using explicit user gesture
        playBgMusicUnmuted();

        // Launch celebratory confetti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 85,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    if (enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openInvitation();
        });
    }

    if (loader) {
        loader.addEventListener('click', openInvitation);
    }
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
   3. BACKGROUND MUSIC (music.mpeg) PLAYBACK CONTROLLER
   ========================================================================== */
function playBgMusicUnmuted() {
    const bgMusic = document.getElementById('bg-music');
    const wrapper = document.querySelector('.audio-control-wrapper');
    if (!bgMusic) return;

    bgMusic.muted = false;
    const promise = bgMusic.play();
    if (promise !== undefined) {
        promise.then(() => {
            if (wrapper) wrapper.classList.add('audio-playing');
        }).catch((err) => {
            console.log("Audio play error:", err);
            // Muted fallback if browser still blocks
            bgMusic.muted = true;
            bgMusic.play().then(() => {
                if (wrapper) wrapper.classList.add('audio-playing');
            }).catch(() => {});
        });
    }
}

function initBgMusic() {
    const bgMusic = document.getElementById('bg-music');
    const audioBtn = document.getElementById('audio-toggle-btn');
    const wrapper = document.querySelector('.audio-control-wrapper');

    if (!bgMusic) return;

    // Attempt playback on page load
    playBgMusicUnmuted();

    // Universal gesture unlock for unmuting sound on any touch/click/scroll
    const unlockAudioOnGesture = () => {
        playBgMusicUnmuted();
        ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'keydown'].forEach((evt) => {
            window.removeEventListener(evt, unlockAudioOnGesture);
            document.removeEventListener(evt, unlockAudioOnGesture);
        });
    };

    ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, unlockAudioOnGesture, { passive: true, once: true });
        document.addEventListener(evt, unlockAudioOnGesture, { passive: true, once: true });
    });

    // Equalizer floating button toggle
    if (audioBtn) {
        audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused || bgMusic.muted) {
                playBgMusicUnmuted();
            } else {
                bgMusic.pause();
            }
        });
    }

    // Keep UI equalizer animation state in sync with audio element state
    bgMusic.addEventListener('play', () => {
        if (wrapper && !bgMusic.muted) wrapper.classList.add('audio-playing');
    });

    bgMusic.addEventListener('pause', () => {
        if (wrapper) wrapper.classList.remove('audio-playing');
    });
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



