/**
 * VECTORS OF TRUTH — EXHIBITION INTERACTIVE ENGINE (app.js)
 * High-performance vanilla JavaScript driving multimedia museum exhibits:
 * - Dynamic Video Presentation & Era Scrubber with Kinetic Subtitles
 * - Interactive Composition Overlays (Rule of Thirds, Leading Lines, Focal Points)
 * - Typographic Specimen Customizer & Zine Spread Engine
 * - Studio Audio Console with Web Audio API Waveform Visualizer & SFX Synthesizer
 * - Synchronized Studio Teleprompter & Curatorial Placard Plaque System
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initWingNavigation();
  initCuratorNarration();
  initVideoSimulator();
  initPhotoOverlays();
  initTypographicControls();
  initAudioStudio();
  initPlacardTabs();
  initExportToolkit();
  initStoryboardModal();
});

/* ==========================================================================
   1. THEME TOGGLER (DARK / LIGHT EXHIBITION MODES)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;

  // Check saved preference
  const savedTheme = localStorage.getItem('exhibit-theme');
  if (savedTheme === 'light') {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('theme-dark')) {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      localStorage.setItem('exhibit-theme', 'light');
      showToast('Switched to Gallery Natural Light Mode');
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      localStorage.setItem('exhibit-theme', 'dark');
      showToast('Switched to Museum Chiaroscuro Dark Mode');
    }
  });
}

/* ==========================================================================
   2. WING NAVIGATION & SCROLL TRACKING
   ========================================================================== */
function initWingNavigation() {
  const navItems = document.querySelectorAll('.wing-nav .nav-item');
  const sections = document.querySelectorAll('.exhibit-wing');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer to highlight current active wing in nav
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(nav => {
          if (nav.getAttribute('href') === `#${id}`) {
            nav.classList.add('active');
          } else {
            nav.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. CURATOR'S STATEMENT SPEECH NARRATOR
   ========================================================================== */
let curatorSpeaking = false;
function initCuratorNarration() {
  const narrateBtn = document.getElementById('narrate-statement-btn');
  const curatorTextEl = document.getElementById('curator-text');

  if (!narrateBtn || !('speechSynthesis' in window)) {
    if (narrateBtn) narrateBtn.style.display = 'none';
    return;
  }

  narrateBtn.addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      curatorSpeaking = false;
      narrateBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <span>Listen to Statement</span>
      `;
      showToast('Audio narration stopped');
      return;
    }

    const text = curatorTextEl.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.95;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onend = () => {
      curatorSpeaking = false;
      narrateBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <span>Listen to Statement</span>
      `;
    };

    window.speechSynthesis.speak(utterance);
    curatorSpeaking = true;
    narrateBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
      <span>Pause Narration</span>
    `;
    showToast('Playing Curatorial Statement Audio Guide');
  });
}

/* ==========================================================================
   4. WING 1: VIDEO PRESENTATION SIMULATOR & TIMELINE ENGINE
   ========================================================================== */
const ERA_DATA = [
  {
    idx: 0,
    title: "ACT I: PRE-INDUSTRIAL AGE (BEFORE 1700s)",
    timeRange: "00:00 – 01:00",
    startSeconds: 0,
    endSeconds: 60,
    subtitles: [
      { at: 0, text: "Before machines learned to speak, memory was bound to bone, stone, and breath..." },
      { at: 15, text: "In ancient Sumer, scribes pressed reed styluses into wet clay, creating monuments of permanence." },
      { at: 35, text: "Truth was preserved through oral poetry and courier stone along imperial routes. Knowledge belonged to the sovereign." }
    ],
    narration: "Before machines learned to speak, memory was bound to bone, stone, and breath. In the Pre-Industrial epoch, media was intimate, localized, and laborious. An inscription on clay was not an instantaneous broadcast; it was a physical monument to permanence. When our ancestors painted galloping bison on cavern stone, they engineered the first external hard drives of humanity. Information traveled at the physical velocity of a walking messenger, and truth was preserved through the rhythm of oral poetry and sacred scripts. Knowledge belonged to the scribe, the elder, and the sovereign."
  },
  {
    idx: 1,
    title: "ACT II: INDUSTRIAL AGE (1700s – 1930s)",
    timeRange: "01:00 – 02:00",
    startSeconds: 60,
    endSeconds: 120,
    subtitles: [
      { at: 60, text: "Then came the clatter of iron and steam. Johann Gutenberg's movable type dismantled the monopoly of monastic scribes." },
      { at: 85, text: "The Industrial Revolution turned print into an unstoppable engine of mass public consciousness." },
      { at: 105, text: "With the copper telegraph wire, information divorced physical transportation, traveling along electric veins." }
    ],
    narration: "Then came the clatter of iron and the heat of steam. Johann Gutenberg’s movable metal type dismantled the monopoly of monastic scribes, but the Industrial Revolution turned print into an unstoppable engine of mass consciousness. For the first time, identical texts could be replicated by the thousands every hour. The printing press birthed the modern public sphere, fueled scientific revolutions, and gave rise to the nation-state. With the telegraph wire, information divorced physical transportation—traveling instantaneously along copper veins. Mass media was born: uniform, industrialized, and distributed to millions simultaneously."
  },
  {
    idx: 2,
    title: "ACT III: ELECTRONIC AGE (1930s – 1980s)",
    timeRange: "02:00 – 03:00",
    startSeconds: 120,
    endSeconds: 180,
    subtitles: [
      { at: 120, text: "By the mid-twentieth century, the signal had become airborne. Vacuum tubes and transistors filled living rooms." },
      { at: 145, text: "Broadcast television collapsed geographical distance entirely, uniting audiences in real-time collective witness." },
      { at: 165, text: "Yet this was a one-way monologue: centralized studios determined what the world saw, while citizens watched and absorbed." }
    ],
    narration: "By the mid-twentieth century, the signal had become airborne. In the Electronic Age, vacuum tubes and transistors transformed airwaves into shared national living rooms. Broadcast radio and television collapsed geographical distance entirely, uniting audiences in real-time collective witness. The voice of the broadcaster carried unassailable authority; visual documentation became the definitive benchmark of historical reality. Yet, this was a one-way monologue: centralized broadcast studios determined what the world saw, while citizens watched, listened, and absorbed."
  },
  {
    idx: 3,
    title: "ACT IV: INFORMATION / NEW MEDIA AGE (1990s – PRESENT)",
    timeRange: "03:00 – 04:00",
    startSeconds: 180,
    endSeconds: 240,
    subtitles: [
      { at: 180, text: "Today, the broadcast tower has been replaced by the network mesh. Every recipient is now a publisher." },
      { at: 200, text: "Yet with infinite access came cognitive overload. Algorithms reward outrage over accuracy." },
      { at: 220, text: "The signal is everywhere. The literacy to decode it is ours to master." }
    ],
    narration: "Today, the broadcast tower has been replaced by the network mesh. The Information Age democratized production: every recipient of media is now a creator, publisher, and broadcaster. Yet with infinite access came cognitive overload. Algorithms reward outrage over accuracy, and synthetic reality blurs the boundary between document and simulation. The challenge of our century is no longer acquiring information, but developing the critical discernment to locate truth within the deluge. The signal is everywhere; the literacy to decode it is ours to master."
  }
];

let videoCurrentTime = 0; // seconds (0 to 240)
let videoPlaying = false;
let videoInterval = null;
let voiceoverEnabled = true;

function initVideoSimulator() {
  const playBtn = document.getElementById('video-play-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const timecodeDisplay = document.getElementById('video-timecode');
  const timelineProgress = document.getElementById('timeline-progress');
  const timelineTrack = document.getElementById('timeline-track');
  const kineticSub = document.getElementById('kinetic-subtitle');
  const currentEraBadge = document.getElementById('current-era-badge');
  const eraTabs = document.querySelectorAll('.era-tab');
  const checkpoints = document.querySelectorAll('.era-checkpoint');
  const voiceoverBtn = document.getElementById('voiceover-toggle-btn');
  const visualContainers = document.querySelectorAll('.era-visual-container');

  function updateVideoState(sec) {
    videoCurrentTime = Math.max(0, Math.min(240, sec));
    const currentEraIdx = Math.min(3, Math.floor(videoCurrentTime / 60));
    const currentEra = ERA_DATA[currentEraIdx];

    // Update timecode
    const mins = Math.floor(videoCurrentTime / 60).toString().padStart(2, '0');
    const secs = Math.floor(videoCurrentTime % 60).toString().padStart(2, '0');
    timecodeDisplay.textContent = `${mins}:${secs} / 04:00`;

    // Update progress bar
    const percent = (videoCurrentTime / 240) * 100;
    timelineProgress.style.width = `${percent}%`;

    // Update visuals
    visualContainers.forEach((el, idx) => {
      el.classList.toggle('active', idx === currentEraIdx);
    });

    // Update era tabs and checkpoints
    eraTabs.forEach((tab, idx) => tab.classList.toggle('active', idx === currentEraIdx));
    checkpoints.forEach((cp, idx) => cp.classList.toggle('active', idx === currentEraIdx));
    currentEraBadge.textContent = currentEra.title;

    // Subtitles
    const sub = currentEra.subtitles.slice().reverse().find(s => videoCurrentTime >= s.at);
    if (sub) {
      kineticSub.textContent = `"${sub.text}"`;
    }
  }

  function playVideo() {
    if (videoPlaying) return;
    videoPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';

    if (voiceoverEnabled && 'speechSynthesis' in window) {
      speakEraNarration(Math.min(3, Math.floor(videoCurrentTime / 60)));
    }

    videoInterval = setInterval(() => {
      videoCurrentTime += 1;
      if (videoCurrentTime >= 240) {
        pauseVideo();
        videoCurrentTime = 0;
      }
      updateVideoState(videoCurrentTime);
    }, 1000);
  }

  function pauseVideo() {
    videoPlaying = false;
    clearInterval(videoInterval);
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function speakEraNarration(eraIdx) {
    if (!voiceoverEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const era = ERA_DATA[eraIdx];
    const utterance = new SpeechSynthesisUtterance(era.narration);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  playBtn.addEventListener('click', () => {
    if (videoPlaying) pauseVideo();
    else playVideo();
  });

  // Timeline click scrubbing
  timelineTrack.addEventListener('click', (e) => {
    const rect = timelineTrack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    const targetSec = Math.floor(ratio * 240);
    updateVideoState(targetSec);
    if (videoPlaying && voiceoverEnabled) {
      speakEraNarration(Math.min(3, Math.floor(targetSec / 60)));
    }
  });

  // Era tabs click
  eraTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      const targetSec = idx * 60;
      updateVideoState(targetSec);
      if (videoPlaying && voiceoverEnabled) {
        speakEraNarration(idx);
      }
    });
  });

  // Checkpoints click
  checkpoints.forEach((cp, idx) => {
    cp.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetSec = idx * 60;
      updateVideoState(targetSec);
      if (videoPlaying && voiceoverEnabled) {
        speakEraNarration(idx);
      }
    });
  });

  // Voiceover toggle
  voiceoverBtn.addEventListener('click', () => {
    voiceoverEnabled = !voiceoverEnabled;
    voiceoverBtn.querySelector('span').textContent = `Voiceover: ${voiceoverEnabled ? 'ON' : 'OFF'}`;
    if (!voiceoverEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    } else if (voiceoverEnabled && videoPlaying) {
      speakEraNarration(Math.min(3, Math.floor(videoCurrentTime / 60)));
    }
    showToast(`Video voiceover narration ${voiceoverEnabled ? 'enabled' : 'disabled'}`);
  });

  // Initial state
  updateVideoState(0);
}

/* ==========================================================================
   5. WING 2: PHOTO ESSAY COMPOSITION OVERLAYS
   ========================================================================== */
function initPhotoOverlays() {
  const toggleGrid = document.getElementById('toggle-grid-btn');
  const toggleLines = document.getElementById('toggle-lines-btn');
  const toggleFocal = document.getElementById('toggle-focal-btn');
  const body = document.body;

  // Set default initial active states on body
  body.classList.add('show-grid', 'show-lines', 'show-focal');

  toggleGrid.addEventListener('click', () => {
    const isActive = body.classList.toggle('show-grid');
    toggleGrid.classList.toggle('active', isActive);
    showToast(`Rule of Thirds grid ${isActive ? 'shown' : 'hidden'}`);
  });

  toggleLines.addEventListener('click', () => {
    const isActive = body.classList.toggle('show-lines');
    toggleLines.classList.toggle('active', isActive);
    showToast(`Leading lines vectors ${isActive ? 'shown' : 'hidden'}`);
  });

  toggleFocal.addEventListener('click', () => {
    const isActive = body.classList.toggle('show-focal');
    toggleFocal.classList.toggle('active', isActive);
    showToast(`Focal point targets ${isActive ? 'shown' : 'hidden'}`);
  });
}

/* ==========================================================================
   6. WING 3: TYPOGRAPHIC SPECIMEN & ZINE SPREAD CONTROLS
   ========================================================================== */
function initTypographicControls() {
  const zineArticle = document.getElementById('zine-article');
  const typeBtns = document.querySelectorAll('.type-btn');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const layoutBtn = document.getElementById('layout-toggle-btn');

  // Font family changer
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const font = btn.dataset.font;

      zineArticle.classList.remove('font-serif', 'font-sans', 'font-mono');
      zineArticle.classList.add(`font-${font}`);
      showToast(`Font updated to ${btn.textContent.trim()}`);
    });
  });

  // Font size changer
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const size = btn.dataset.size;

      zineArticle.classList.remove('size-small', 'size-medium', 'size-large');
      zineArticle.classList.add(`size-${size}`);
      showToast(`Type scale set to ${size.toUpperCase()}`);
    });
  });

  // Layout changer (Dual-Column vs Single-Column)
  layoutBtn.addEventListener('click', () => {
    const isDual = zineArticle.classList.toggle('dual-column');
    layoutBtn.classList.toggle('active', isDual);
    layoutBtn.innerHTML = isDual
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="18"/><rect x="13" y="3" width="8" height="18"/></svg> Dual-Column Zine`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg> Single-Column Reader`;
    showToast(`Spread layout: ${isDual ? 'Dual-Column Editorial Zine' : 'Single-Column Reading Flow'}`);
  });
}

/* ==========================================================================
   7. WING 4: STUDIO AUDIO CONSOLE & REAL-TIME WEB AUDIO VISUALIZER
   ========================================================================== */
let audioCtx = null;
let audioPlaying = false;
let audioSeconds = 0; // 0 to 165 (2:45)
let audioTimer = null;
let isBedActive = true;

function initAudioStudio() {
  const playMasterBtn = document.getElementById('audio-play-master-btn');
  const aPlayIcon = document.getElementById('a-play-icon');
  const aPauseIcon = document.getElementById('a-pause-icon');
  const currentTimeDisplay = document.getElementById('audio-current-time');
  const scrubTrack = document.getElementById('audio-scrub-track');
  const scrubProgress = document.getElementById('audio-scrub-progress');
  const prompterStatus = document.getElementById('prompter-status');
  const cueBlocks = document.querySelectorAll('.cue-block');
  const canvas = document.getElementById('audio-visualizer-canvas');
  const sfxButtons = document.querySelectorAll('.sfx-btn');
  const ambientBedBtn = document.getElementById('toggle-ambient-bed');

  const canvasCtx = canvas.getContext('2d');

  // Draw idle visualizer
  drawVisualizerWave(canvasCtx, canvas.width, canvas.height, false);

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playMasterAudio() {
    if (audioPlaying) return;
    getAudioContext();
    audioPlaying = true;
    aPlayIcon.style.display = 'none';
    aPauseIcon.style.display = 'block';
    prompterStatus.textContent = 'PLAYING MASTER BROADCAST';
    prompterStatus.style.background = 'rgba(239, 68, 68, 0.2)';
    prompterStatus.style.color = '#ef4444';

    // Start synthesised narration if speech available
    speakPodcastSegment(audioSeconds);

    audioTimer = setInterval(() => {
      audioSeconds += 1;
      if (audioSeconds >= 165) {
        pauseMasterAudio();
        audioSeconds = 0;
      }
      updateAudioState(audioSeconds);
    }, 1000);

    requestAnimationFrame(renderLoop);
  }

  function pauseMasterAudio() {
    audioPlaying = false;
    clearInterval(audioTimer);
    aPlayIcon.style.display = 'block';
    aPauseIcon.style.display = 'none';
    prompterStatus.textContent = 'READY FOR PLAYBACK';
    prompterStatus.style.background = 'rgba(56, 189, 248, 0.15)';
    prompterStatus.style.color = 'var(--accent-cyan)';
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    drawVisualizerWave(canvasCtx, canvas.width, canvas.height, false);
  }

  function updateAudioState(sec) {
    audioSeconds = Math.max(0, Math.min(165, sec));
    const mins = Math.floor(audioSeconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(audioSeconds % 60).toString().padStart(2, '0');
    currentTimeDisplay.textContent = `${mins}:${secs}`;

    const percent = (audioSeconds / 165) * 100;
    scrubProgress.style.width = `${percent}%`;

    // Highlight corresponding cue in teleprompter
    let activeBlock = null;
    cueBlocks.forEach(block => {
      const blockTime = parseInt(block.dataset.time, 10);
      if (audioSeconds >= blockTime) {
        activeBlock = block;
      }
    });

    if (activeBlock) {
      cueBlocks.forEach(b => b.classList.remove('active'));
      activeBlock.classList.add('active');
      activeBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderLoop() {
    if (!audioPlaying) return;
    drawVisualizerWave(canvasCtx, canvas.width, canvas.height, true);
    requestAnimationFrame(renderLoop);
  }

  playMasterBtn.addEventListener('click', () => {
    if (audioPlaying) pauseMasterAudio();
    else playMasterAudio();
  });

  scrubTrack.addEventListener('click', (e) => {
    const rect = scrubTrack.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const targetSec = Math.floor(ratio * 165);
    updateAudioState(targetSec);
    if (audioPlaying) {
      speakPodcastSegment(targetSec);
    }
  });

  ambientBedBtn.addEventListener('click', () => {
    isBedActive = !isBedActive;
    ambientBedBtn.classList.toggle('active', isBedActive);
    ambientBedBtn.innerHTML = `<span class="pill-dot"></span> BGM Bed: ${isBedActive ? 'Ducked (-14dB)' : 'Muted'}`;
    showToast(`Musical backing bed ${isBedActive ? 'enabled' : 'muted'}`);
  });

  // Soundboard SFX
  sfxButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sfxType = btn.dataset.sfx;
      triggerSynthSFX(sfxType);
    });
  });

  function speakPodcastSegment(sec) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Map time to host lines
    let scriptText = "";
    if (sec < 32) {
      scriptText = "Take a second and check your screen time report. Go on—be honest. Between the infinite scroll of your morning feed, the group chat memes, and the thirty-second video explainers you watched over lunch... how many pieces of media did you digest today? Two hundred? A thousand? Here’s the catch: your brain wasn’t designed for a firehose.";
    } else if (sec < 75) {
      scriptText = "In the modern attention economy, information isn’t scarce anymore. What’s scarce is your focus. Platforms have perfected the art of the frictionless feed. They remove every cognitive bump that might make you pause. Auto-playing videos, infinite scrolling, predictive algorithms that feed you exactly what confirms your existing biases—because the longer your thumbs stay on the glass, the more ad revenue they print. And in that frictionless slipstream, misinformation doesn't just travel; it sprints.";
    } else if (sec < 118) {
      scriptText = "Stop. Breathe. Media literacy isn’t about swearing off your smartphone or living in an analog cave. It’s about introducing conscious friction into your digital life. Before you hit that share button, ask yourself three simple questions: One: Who made this, and why do they want me to feel angry right now? Two: Can I corroborate this claim with an independent, verifiable source? And three: If this turns out to be false tomorrow, am I willing to own the harm it causes?";
    } else {
      scriptText = "Every time you pause to check a source, you aren't just protecting yourself from getting fooled—you’re acting as a responsible node in your community’s information network. You’re stopping the contagion of falsehood in its tracks. In a world addicted to frictionless speed, your critical pause is the ultimate act of rebellion. Stay curious, stay skeptical, and keep your signal clear.";
    }

    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

/* Synthesizer Waveform Visualizer on Canvas */
let waveOffset = 0;
function drawVisualizerWave(ctx, width, height, isLive) {
  ctx.clearRect(0, 0, width, height);

  // Background subtle grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Center line
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  if (!isLive) {
    // Static flat signal
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    return;
  }

  waveOffset += 0.08;

  // Render multi-layered glowing sine waveforms
  const layers = [
    { color: '#38bdf8', amp: 38, freq: 0.02, width: 2.5 },
    { color: '#d4af37', amp: 22, freq: 0.035, width: 1.8 },
    { color: '#10b981', amp: 14, freq: 0.015, width: 1.2 }
  ];

  layers.forEach((layer, idx) => {
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = layer.width;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const noise = Math.sin(x * 0.1 + waveOffset * 2) * 4;
      const y = height / 2 + Math.sin(x * layer.freq + waveOffset + idx) * layer.amp + noise;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
}

/* Web Audio API Sound Effects Synthesizer */
function triggerSynthSFX(type) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();

  if (type === 'notification') {
    // High double chime
    const now = ctx.currentTime;
    [880, 1174].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.3, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
    showToast('Auditioning SFX: Triple Notification Chime (00:01)');
  } else if (type === 'cash') {
    // Metallic bell ring
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.15);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
    showToast('Auditioning SFX: Ad-Revenue Register Swoosh (00:34)');
  } else if (type === 'tapestop') {
    // Tape screech down into dead air
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
    showToast('Auditioning SFX: Analog Tape-Stop Screech & Dead Air (01:22)');
  }
}

/* ==========================================================================
   8. CURATORIAL PLACARDS TABS (WINGS 1–4)
   ========================================================================== */
function initPlacardTabs() {
  const placards = document.querySelectorAll('.curatorial-placard-plaque');

  placards.forEach(placard => {
    const tabs = placard.querySelectorAll('.placard-tab');
    const panes = placard.querySelectorAll('.placard-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetPane = placard.querySelector(`#${targetId}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  });
}

/* ==========================================================================
   9. EXPORT & TOOLKIT DRAWER
   ========================================================================== */
function initExportToolkit() {
  const exportBtn = document.getElementById('export-drawer-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('export-drawer');
  const copyMdBtn = document.getElementById('copy-markdown-btn');
  const printBtn = document.getElementById('print-portfolio-btn');

  function openDrawer() {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
  }

  exportBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  printBtn.addEventListener('click', () => {
    closeDrawer();
    window.print();
  });

  copyMdBtn.addEventListener('click', () => {
    // Fetch or copy from PORTFOLIO_MASTER_DOCUMENT
    const summaryMarkdown = `# VECTORS OF TRUTH: Tracing the Human Signal Across Eras of Media & Information
## A Multimedia E-Portfolio for Media and Information Literacy (MIL)

Please find the complete unabridged academic portfolio text in PORTFOLIO_MASTER_DOCUMENT.md located inside your project folder!`;
    navigator.clipboard.writeText(summaryMarkdown).then(() => {
      showToast('Master Portfolio Markdown copied to clipboard!');
    }).catch(() => {
      showToast('Master document ready in your project directory.');
    });
  });
}

/* ==========================================================================
   10. STORYBOARD MODAL (WING 1 SCRIPT VIEWER)
   ========================================================================== */
function initStoryboardModal() {
  const storyboardBtn = document.getElementById('storyboard-modal-btn');
  const closeBtn = document.getElementById('close-storyboard-btn');
  const overlay = document.getElementById('storyboard-overlay');
  const modal = document.getElementById('storyboard-modal');
  const contentBody = document.getElementById('storyboard-content-body');

  storyboardBtn.addEventListener('click', () => {
    contentBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        <div>
          <h4 style="color:var(--gold); margin-bottom:0.4rem;">Act I: The Pre-Industrial Age (Before 1700s) — 00:00 to 01:00</h4>
          <p><strong>Visual:</strong> Cave walls at Chauvet, Sumerian cuneiform clay tablets, Egyptian papyrus fibers, smoke signals.</p>
          <p><strong>Narration:</strong> "Before machines learned to speak, memory was bound to bone, stone, and breath..."</p>
          <p><strong>Audio/SFX:</strong> Hearth fire crackle, slow resonant tribal drum pulse, reed stylus scraping clay.</p>
        </div>
        <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1);">
        <div>
          <h4 style="color:var(--gold); margin-bottom:0.4rem;">Act II: The Industrial Age (1700s–1930s) — 01:00 to 02:00</h4>
          <p><strong>Visual:</strong> Lead movable type, steam rotary presses printing broadsheets, copper telegraph lines, early cinema celluloid.</p>
          <p><strong>Narration:</strong> "Then came the clatter of iron and the heat of steam. Gutenberg’s movable metal type dismantled the monopoly of monastic scribes..."</p>
          <p><strong>Audio/SFX:</strong> Rotary press clatter, steam hiss, Morse key clicks, driving industrial march.</p>
        </div>
        <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1);">
        <div>
          <h4 style="color:var(--gold); margin-bottom:0.4rem;">Act III: The Electronic Age (1930s–1980s) — 02:00 to 03:00</h4>
          <p><strong>Visual:</strong> Glowing radio vacuum tubes, CRT television screens showing Moon Landing, transistor radios on shoulders.</p>
          <p><strong>Narration:</strong> "By the mid-twentieth century, the signal had become airborne. In the Electronic Age, vacuum tubes and transistors transformed airwaves into shared national living rooms..."</p>
          <p><strong>Audio/SFX:</strong> Static radio tuning whistle, broadcast mic chime, CRT scanline hum.</p>
        </div>
        <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1);">
        <div>
          <h4 style="color:var(--gold); margin-bottom:0.4rem;">Act IV: Information / New Media Age (1990s–Present) — 03:00 to 04:00</h4>
          <p><strong>Visual:</strong> Glowing fiber optics, rapid notification UI popups, algorithmic recommendation feeds, neural network data mesh.</p>
          <p><strong>Narration:</strong> "Today, the broadcast tower has been replaced by the network mesh. The Information Age democratized production: every recipient is now a creator..."</p>
          <p><strong>Audio/SFX:</strong> Dial-up modem tone, digital chimes, sub-bass pulse, culminating chord.</p>
        </div>
      </div>
    `;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}

/* ==========================================================================
   UTILITY: TOAST NOTIFICATIONS
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
