/**
 * JAMGBADI JULIET - Luxury 3D AI Systems & Automation Portfolio
 * Interactive Visual Experience & 3D Core Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeHeroScene();
  initTiltCards();
  initAiSandbox();
  initRoiSimulator();
  initProcessVideoPlayer();
  initProjectModals();
  initIntakeForm();
  initMobileMenu();
});

/* ==========================================================================
   1. THREE.JS INTERACTIVE 3D AI NEURAL CORE
   ========================================================================== */
function initThreeHeroScene() {
  const container = document.getElementById('three-hero-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group for all core 3D objects
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 1. Central Glowing AI Sphere (Icosahedron)
  const coreGeometry = new THREE.IcosahedronGeometry(5, 3);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  coreGroup.add(coreMesh);

  // Inner solid glow core
  const innerGeometry = new THREE.SphereGeometry(3.2, 32, 32);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.2,
    wireframe: true,
  });
  const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
  coreGroup.add(innerMesh);

  // 2. Surrounding Orbital Rings (Automation Cycles)
  const ringGroup = new THREE.Group();
  coreGroup.add(ringGroup);

  const ring1Geo = new THREE.TorusGeometry(8.5, 0.04, 16, 100);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  ringGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(10.5, 0.04, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  ringGroup.add(ring2);

  const ring3Geo = new THREE.TorusGeometry(12.5, 0.04, 16, 100);
  const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
  const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
  ring3.rotation.x = -Math.PI / 4;
  ringGroup.add(ring3);

  // 3. Floating Data Particles (Swarm of Automation Packets)
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 6 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);

    // Cyan or Purple
    if (Math.random() > 0.4) {
      particleColors[i * 3] = 0;
      particleColors[i * 3 + 1] = 0.94;
      particleColors[i * 3 + 2] = 1.0;
    } else {
      particleColors[i * 3] = 0.54;
      particleColors[i * 3 + 1] = 0.36;
      particleColors[i * 3 + 2] = 0.96;
    }
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.28,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  coreGroup.add(particleSystem);

  // 4. Mouse interaction & parallax tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (e.clientX - windowHalfX) * 0.0008;
    mouseY = (e.clientY - windowHalfY) * 0.0008;
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Smooth rotation
    coreMesh.rotation.y += 0.003;
    coreMesh.rotation.x += 0.0015;
    innerMesh.rotation.y -= 0.004;

    ring1.rotation.z += 0.004;
    ring2.rotation.x += 0.003;
    ring3.rotation.y += 0.002;

    particleSystem.rotation.y += 0.0012;

    // Fluid cursor parallax
    targetRotationX += (mouseY - targetRotationX) * 0.05;
    targetRotationY += (mouseX - targetRotationY) * 0.05;

    coreGroup.rotation.x = targetRotationX;
    coreGroup.rotation.y = targetRotationY;

    renderer.render(scene, camera);
  }
  animate();
}

/* ==========================================================================
   2. 3D TILT HOVER EFFECTS ON CARDS
   ========================================================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE "TRY IT LIVE" AI SANDBOX (CHATBOT SIMULATION)
   ========================================================================== */
function initAiSandbox() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const promptChips = document.querySelectorAll('.prompt-chip');
  const chatModeToggles = document.querySelectorAll('.chat-mode-toggle');
  const chatContainer = document.getElementById('chat-widget-container');

  if (!chatMessages) return;

  // Toggle visual theme: WhatsApp Style vs Modern Dark Glass
  chatModeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      chatModeToggles.forEach(t => t.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40'));
      toggle.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
      const mode = toggle.dataset.mode;
      if (mode === 'whatsapp') {
        chatContainer.classList.add('border-emerald-500/40');
        chatContainer.classList.remove('border-cyan-500/30');
      } else {
        chatContainer.classList.remove('border-emerald-500/40');
        chatContainer.classList.add('border-cyan-500/30');
      }
    });
  });

  // Prompt Chips Handler
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.dataset.prompt;
      if (promptText) {
        handleUserMessage(promptText);
      }
    });
  });

  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (text) {
        handleUserMessage(text);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value.trim();
        if (text) {
          handleUserMessage(text);
          chatInput.value = '';
        }
      }
    });
  }

  function handleUserMessage(text) {
    // 1. Append User Message
    appendMessage(text, 'user');

    // 2. Show Animated AI Thinking Status
    const thinkingId = 'thinking-' + Date.now();
    const thinkingHtml = `
      <div id="${thinkingId}" class="flex items-center space-x-2 text-cyan-400 text-xs font-code py-2 px-3 bg-cyan-950/40 rounded-lg w-max border border-cyan-800/40 animate-pulse">
        <svg class="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="32" stroke-dashoffset="10"/>
        </svg>
        <span>Claude 3.5 Reasoner running n8n tool pipeline...</span>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', thinkingHtml);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Generate Intelligent Contextual AI Response
    setTimeout(() => {
      const thinkingElem = document.getElementById(thinkingId);
      if (thinkingElem) thinkingElem.remove();

      const aiResponse = generateAiResponse(text);
      appendMessage(aiResponse, 'ai');
    }, 1100);
  }

  function appendMessage(content, sender) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let html = '';

    if (sender === 'user') {
      html = `
        <div class="flex justify-end mb-4">
          <div class="chat-bubble-user max-w-[82%] p-3.5 text-sm text-slate-100 shadow-lg">
            <p>${escapeHtml(content)}</p>
            <div class="text-[10px] text-purple-300/70 text-right mt-1 font-code">${time} ✓✓</div>
          </div>
        </div>
      `;
    } else {
      html = `
        <div class="flex justify-start mb-4">
          <div class="chat-bubble-ai max-w-[85%] p-4 text-sm text-slate-200 shadow-xl">
            <div class="flex items-center justify-between border-b border-slate-700/50 pb-2 mb-2">
              <span class="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 font-tech">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                Juliet's Autonomous AI Agent
              </span>
              <span class="text-[10px] text-slate-400 font-code">0.42s latency</span>
            </div>
            <div>${content}</div>
            <div class="text-[10px] text-slate-400 text-right mt-2 font-code">${time}</div>
          </div>
        </div>
      `;
    }

    chatMessages.insertAdjacentHTML('beforeend', html);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateAiResponse(input) {
    const lower = input.toLowerCase();

    if (lower.includes('order') || lower.includes('#luxe') || lower.includes('track')) {
      return `
        <div class="space-y-2 font-body">
          <p>Verified status for order <strong class="text-cyan-300 font-code">#LUXE-8821</strong> via automated Shopify & DHL API webhook:</p>
          <div class="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 font-code text-xs space-y-1">
            <div class="flex justify-between"><span class="text-slate-400">Status:</span> <span class="text-emerald-400 font-bold">Out for Delivery</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Carrier:</span> <span class="text-slate-200">DHL Express Air</span></div>
            <div class="flex justify-between"><span class="text-slate-400">ETA:</span> <span class="text-cyan-300">Today before 4:30 PM</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Location:</span> <span class="text-slate-300">Transit Hub - Bay Area</span></div>
          </div>
          <div class="pt-1 flex gap-2">
            <button class="text-xs px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition">Send WhatsApp Updates</button>
            <button class="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition">Request Signature Waiver</button>
          </div>
        </div>
      `;
    }

    if (lower.includes('book') || lower.includes('dental') || lower.includes('consultation') || lower.includes('appointment')) {
      return `
        <div class="space-y-2 font-body">
          <p>I just executed the <code class="code-tag">Google Calendar + CRM Check</code> tool. Slot verified!</p>
          <div class="bg-slate-900/80 p-3 rounded-lg border border-emerald-500/30 font-code text-xs space-y-1">
            <div class="flex justify-between text-emerald-400 font-semibold"><span>Slot Reserved:</span> <span>Tomorrow, 2:00 PM - 2:45 PM</span></div>
            <div class="flex justify-between text-slate-300"><span>Service:</span> <span>Executive VIP Consultation</span></div>
            <div class="flex justify-between text-slate-300"><span>Specialist:</span> <span>Dr. Vance (Clinic Lead)</span></div>
            <div class="flex justify-between text-slate-300"><span>Automated Sync:</span> <span>WhatsApp reminder sent</span></div>
          </div>
          <p class="text-xs text-slate-400">An instant confirmation email and WhatsApp calendar invite have been dispatched automatically via n8n.</p>
        </div>
      `;
    }

    if (lower.includes('n8n') || lower.includes('webhook') || lower.includes('hubspot') || lower.includes('api')) {
      return `
        <div class="space-y-2 font-body">
          <p>Here is how my custom architecture syncs webhooks to HubSpot with zero data drop:</p>
          <div class="bg-slate-900/90 p-3 rounded-lg border border-purple-500/30 font-code text-xs">
            <div class="text-purple-300 mb-1">// n8n Workflow Blueprint</div>
            <div class="text-slate-400">1. [Webhook Trigger] receives payload & verifies HMAC</div>
            <div class="text-slate-400">2. [Claude 3.5 Sonnet] extracts intent, cleans schema & enriches leads</div>
            <div class="text-slate-400">3. [HubSpot API] Upserts Contact & Deals with zero duplicates</div>
          </div>
          <p class="text-xs text-cyan-300">I can implement this exact pipeline in 48 hours for your company.</p>
        </div>
      `;
    }

    // Default Fallback
    return `
      <div class="space-y-2 font-body">
        <p>I received your message: <em class="text-cyan-300 font-semibold">"${escapeHtml(input)}"</em></p>
        <p>Juliet's autonomous agents are programmed with custom reasoning nodes, API tool access (HubSpot, Stripe, WhatsApp, n8n), and self-healing error recovery.</p>
        <p class="text-xs text-slate-400">Click below or in the calendar section to schedule a free 30-minute operational audit with Juliet!</p>
        <div class="pt-1">
          <a href="https://calendly.com/jamgbadijuliet49/30min" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-tech font-bold px-3 py-1.5 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition">
            Book 30-Min Audit with Juliet →
          </a>
        </div>
      </div>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

/* ==========================================================================
   4. INTERACTIVE WORKFLOW & ROI SIMULATOR
   ========================================================================== */
function initRoiSimulator() {
  const industrySelect = document.getElementById('sim-industry');
  const bottleneckSelect = document.getElementById('sim-bottleneck');
  const hoursSlider = document.getElementById('sim-hours');
  const hoursValue = document.getElementById('sim-hours-val');
  const rateInput = document.getElementById('sim-rate');

  const metricHoursSaved = document.getElementById('metric-hours-saved');
  const metricCostSaved = document.getElementById('metric-cost-saved');
  const metricResponseTime = document.getElementById('metric-response-time');
  const pipelineTriggerNode = document.getElementById('pipeline-trigger-node');
  const pipelineAiNode = document.getElementById('pipeline-ai-node');
  const pipelineActionNode = document.getElementById('pipeline-action-node');

  if (!hoursSlider) return;

  function updateCalculations() {
    const hours = parseInt(hoursSlider.value, 10);
    const rate = parseInt(rateInput.value, 10) || 45;
    const industry = industrySelect.value;
    const bottleneck = bottleneckSelect.value;

    hoursValue.textContent = `${hours} hrs/week`;

    // Calculation: 80% automation efficiency
    const hoursSavedPerWeek = Math.round(hours * 0.82);
    const annualSavings = Math.round(hoursSavedPerWeek * rate * 52);

    metricHoursSaved.textContent = `${hoursSavedPerWeek * 4}h`;
    metricCostSaved.textContent = `$${annualSavings.toLocaleString()}`;
    metricResponseTime.textContent = `< 10 sec`;

    // Dynamic Visual Pipeline Nodes
    if (bottleneck === 'support') {
      pipelineTriggerNode.innerHTML = `
        <div class="text-[11px] font-code text-cyan-400 font-bold mb-1">01. INCOMING TRIGGER</div>
        <div class="font-tech font-bold text-white text-sm">24/7 WhatsApp & Web Lead</div>
        <div class="text-xs text-slate-400 mt-1">Webhook catches customer query in real-time</div>
      `;
      pipelineAiNode.innerHTML = `
        <div class="text-[11px] font-code text-purple-400 font-bold mb-1">02. CLAUDE 3.5 REASONING</div>
        <div class="font-tech font-bold text-white text-sm">Knowledge Base & Tool Router</div>
        <div class="text-xs text-slate-400 mt-1">Checks booking availability or order tracking DB</div>
      `;
      pipelineActionNode.innerHTML = `
        <div class="text-[11px] font-code text-emerald-400 font-bold mb-1">03. AUTONOMOUS ACTION</div>
        <div class="font-tech font-bold text-white text-sm">Instant Resolution & CRM Sync</div>
        <div class="text-xs text-slate-400 mt-1">Updates HubSpot, books slot & confirms via WhatsApp</div>
      `;
    } else if (bottleneck === 'email') {
      pipelineTriggerNode.innerHTML = `
        <div class="text-[11px] font-code text-cyan-400 font-bold mb-1">01. INCOMING TRIGGER</div>
        <div class="font-tech font-bold text-white text-sm">Client Email Inbound</div>
        <div class="text-xs text-slate-400 mt-1">IMAP / Gmail API triggers on new urgent message</div>
      `;
      pipelineAiNode.innerHTML = `
        <div class="text-[11px] font-code text-purple-400 font-bold mb-1">02. CLAUDE 3.5 REASONING</div>
        <div class="font-tech font-bold text-white text-sm">Semantic Triage & Draft Agent</div>
        <div class="text-xs text-slate-400 mt-1">Categorizes urgency (VIP / General / Billing) and drafts reply</div>
      `;
      pipelineActionNode.innerHTML = `
        <div class="text-[11px] font-code text-emerald-400 font-bold mb-1">03. AUTONOMOUS ACTION</div>
        <div class="font-tech font-bold text-white text-sm">Zero-Touch Reply or Review Queue</div>
        <div class="text-xs text-slate-400 mt-1">Auto-sends standard answers; tags CEO only on critical matters</div>
      `;
    } else {
      pipelineTriggerNode.innerHTML = `
        <div class="text-[11px] font-code text-cyan-400 font-bold mb-1">01. INCOMING TRIGGER</div>
        <div class="font-tech font-bold text-white text-sm">Multi-Source Data Input</div>
        <div class="text-xs text-slate-400 mt-1">Form submission, Stripe checkout, or CSV drop</div>
      `;
      pipelineAiNode.innerHTML = `
        <div class="text-[11px] font-code text-purple-400 font-bold mb-1">02. CLAUDE 3.5 REASONING</div>
        <div class="font-tech font-bold text-white text-sm">Schema Cleaning & Data Enrichment</div>
        <div class="text-xs text-slate-400 mt-1">Validates emails, enriches company revenue & cleans tags</div>
      `;
      pipelineActionNode.innerHTML = `
        <div class="text-[11px] font-code text-emerald-400 font-bold mb-1">03. AUTONOMOUS ACTION</div>
        <div class="font-tech font-bold text-white text-sm">Instant Multi-App Sync</div>
        <div class="text-xs text-slate-400 mt-1">Auto-updates HubSpot, Notion, Google Sheets & Slack alert</div>
      `;
    }
  }

  hoursSlider.addEventListener('input', updateCalculations);
  rateInput.addEventListener('input', updateCalculations);
  industrySelect.addEventListener('change', updateCalculations);
  bottleneckSelect.addEventListener('change', updateCalculations);

  updateCalculations();
}

/* ==========================================================================
   5. BEHIND-THE-SCENES CINEMA VIDEO SHOWCASE PLAYER
   ========================================================================== */
function initProcessVideoPlayer() {
  const playBtn = document.getElementById('cinema-play-btn');
  const videoOverlay = document.getElementById('cinema-play-overlay');
  const progressBar = document.getElementById('cinema-progress-bar');
  const chapterPills = document.querySelectorAll('.chapter-pill');
  const stagePreview = document.getElementById('cinema-stage-preview');
  const stepStatus = document.getElementById('cinema-step-status');

  if (!playBtn || !videoOverlay) return;

  let isPlaying = false;
  let progress = 25;
  let timer = null;

  const chapters = {
    1: {
      title: "01. Mapping the Operational Bottlenecks",
      status: "Step 1 of 3: Deep Process Audit & Logic Flowcharting",
      code: `// Friction Analysis\nIDENTIFIED: 140+ weekly manual customer inquiries\nBOTTLENECK: Delayed average response (4.2 hours)\nSOLUTION: n8n Webhook Listener -> Claude 3.5 Sonnet Tool Caller`
    },
    2: {
      title: "02. Building the n8n + Claude Pipeline",
      status: "Step 2 of 3: Custom Nodes, System Prompts & API Connectors",
      code: `// n8n Pipeline Configuration\nPOST /v1/webhook/incoming-inquiry\nAUTH: Bearer [REDACTED_API_KEY]\nCALL: Anthropic Claude 3.5 Sonnet (Temperature: 0.2)\nEXECUTE: search_crm_customer(email)`
    },
    3: {
      title: "03. Live Zero-Downtime Deployment & Test Run",
      status: "Step 3 of 3: Production Hand-off & Live Metric Validation",
      code: `// Deployment Verification\nSTATUS: ONLINE (100% Uptime)\nLATENCY: 840ms average response\nSUCCESS RATE: 99.4% autonomous resolution`
    }
  };

  function updateChapter(chapterNum) {
    chapterPills.forEach(p => {
      p.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
      p.classList.add('bg-slate-900/60', 'text-slate-400');
    });

    const activePill = document.querySelector(`.chapter-pill[data-chapter="${chapterNum}"]`);
    if (activePill) {
      activePill.classList.remove('bg-slate-900/60', 'text-slate-400');
      activePill.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
    }

    const data = chapters[chapterNum];
    if (data && stagePreview && stepStatus) {
      stepStatus.textContent = data.status;
      stagePreview.textContent = data.code;
    }
  }

  chapterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const chapter = parseInt(pill.dataset.chapter, 10);
      updateChapter(chapter);
      if (chapter === 1) progress = 20;
      if (chapter === 2) progress = 55;
      if (chapter === 3) progress = 90;
      if (progressBar) progressBar.style.width = `${progress}%`;
    });
  });

  playBtn.addEventListener('click', togglePlay);
  videoOverlay.addEventListener('click', togglePlay);

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      videoOverlay.classList.add('opacity-0', 'pointer-events-none');
      timer = setInterval(() => {
        progress += 1.5;
        if (progress > 100) progress = 10;
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (progress < 40) updateChapter(1);
        else if (progress < 75) updateChapter(2);
        else updateChapter(3);
      }, 300);
    } else {
      videoOverlay.classList.remove('opacity-0', 'pointer-events-none');
      clearInterval(timer);
    }
  }
}

/* ==========================================================================
   6. PROJECT MODALS ("INSPECT PIPELINE")
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const inspectBtns = document.querySelectorAll('.inspect-pipeline-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalContent = document.getElementById('modal-project-body');

  if (!modal || !modalClose) return;

  const projectDetails = {
    1: {
      title: "Autonomous Email Triage & Draft Agent",
      client: "Vance Executive Clinic (Local Healthcare)",
      stats: "80% Inbox Time Eliminated • < 90s Urgency Routing",
      architecture: `
        <div class="space-y-4 font-body">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-700">
              <div class="text-xs font-code text-cyan-400 mb-1">INPUT TRIGGER</div>
              <div class="font-bold text-white text-sm">IMAP / Gmail Webhook</div>
              <div class="text-xs text-slate-400 mt-1">Filters spam, scans attachments, extracts sender identity</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-purple-500/40">
              <div class="text-xs font-code text-purple-400 mb-1">AI PROCESSING</div>
              <div class="font-bold text-white text-sm">Claude 3.5 Sonnet Analysis</div>
              <div class="text-xs text-slate-400 mt-1">Classifies into Urgent, Billing, Scheduling, or General</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-emerald-500/40">
              <div class="text-xs font-code text-emerald-400 mb-1">OUTPUT ACTION</div>
              <div class="font-bold text-white text-sm">Drafts Reply & Slack Alert</div>
              <div class="text-xs text-slate-400 mt-1">Drafts context-aware reply in Gmail & alerts lead doctor if urgent</div>
            </div>
          </div>
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 font-code text-xs text-slate-300">
            <span class="text-cyan-400 font-bold">// Result:</span> Doctor's daily triage time reduced from 2.5 hours every evening to just 15 minutes of reviewing one-click approvals.
          </div>
        </div>
      `
    },
    2: {
      title: "Full-Stack Website & Multi-App API Integration",
      client: "NovaFlow Commerce (Global DTC Brand)",
      stats: "100% Manual Data Entry Cut • Zero Sync Lag Across 4 Apps",
      architecture: `
        <div class="space-y-4 font-body">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-700">
              <div class="text-xs font-code text-cyan-400 mb-1">WEB FRONTEND</div>
              <div class="font-bold text-white text-sm">Lovable + Antigravity Engine</div>
              <div class="text-xs text-slate-400 mt-1">Sub-second load speed, reactive checkout & lead capture</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-purple-500/40">
              <div class="text-xs font-code text-purple-400 mb-1">BACKEND GLUE</div>
              <div class="font-bold text-white text-sm">n8n Workflow Hub</div>
              <div class="text-xs text-slate-400 mt-1">Bidirectional sync between Stripe, HubSpot CRM, and Supabase</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-emerald-500/40">
              <div class="text-xs font-code text-emerald-400 mb-1">LIVE OUTCOME</div>
              <div class="font-bold text-white text-sm">Instant Lead Enrichment</div>
              <div class="text-xs text-slate-400 mt-1">Customer tagged, invoice auto-generated & onboarding email sent</div>
            </div>
          </div>
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 font-code text-xs text-slate-300">
            <span class="text-cyan-400 font-bold">// Result:</span> Cut out 18 hours/week previously wasted by operations staff manually copying customer data across systems.
          </div>
        </div>
      `
    },
    3: {
      title: "24/7 E-Commerce & Local Support Chatbot",
      client: "Apex Realty & Care (Multi-Location Services)",
      stats: "Sub-10s Response • 72% Autonomous Inquiries Resolved",
      architecture: `
        <div class="space-y-4 font-body">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-700">
              <div class="text-xs font-code text-cyan-400 mb-1">OMNICHANNEL CHAT</div>
              <div class="font-bold text-white text-sm">WhatsApp Business API + Web</div>
              <div class="text-xs text-slate-400 mt-1">Accessible 24/7 on both mobile WhatsApp and company website</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-purple-500/40">
              <div class="text-xs font-code text-purple-400 mb-1">INTELLIGENT AGENT</div>
              <div class="font-bold text-white text-sm">RAG Knowledge Retrieval</div>
              <div class="text-xs text-slate-400 mt-1">Indexed on service pricing, FAQs, and real-time calendar availability</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-emerald-500/40">
              <div class="text-xs font-code text-emerald-400 mb-1">BOOKING ENGINE</div>
              <div class="font-bold text-white text-sm">Calendly & Stripe Payment</div>
              <div class="text-xs text-slate-400 mt-1">Collects deposit, issues calendar link & sets SMS reminder sequence</div>
            </div>
          </div>
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 font-code text-xs text-slate-300">
            <span class="text-cyan-400 font-bold">// Result:</span> Captured 34 additional booked clients in the first 30 days that previously bounced after business hours.
          </div>
        </div>
      `
    },
    4: {
      title: "High-Converting Website Build & Optimization",
      client: "Kinetix AI SaaS Platform",
      stats: "99 Lighthouse Score • 2.4x Conversion Increase",
      architecture: `
        <div class="space-y-4 font-body">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 bg-slate-900 rounded-lg border border-slate-700">
              <div class="text-xs font-code text-cyan-400 mb-1">UI/UX REDESIGN</div>
              <div class="font-bold text-white text-sm">Executive Dark Theme & 3D</div>
              <div class="text-xs text-slate-400 mt-1">Ultra-luxurious branding, clear CTA architecture, glassmorphism</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-purple-500/40">
              <div class="text-xs font-code text-purple-400 mb-1">SPEED ENGINEERING</div>
              <div class="font-bold text-white text-sm">Zero-Bloat Codebase</div>
              <div class="text-xs text-slate-400 mt-1">Optimized WebGL rendering, responsive typography, 0.4s FCP</div>
            </div>
            <div class="p-3 bg-slate-900 rounded-lg border border-emerald-500/40">
              <div class="text-xs font-code text-emerald-400 mb-1">CONVERSION HOOKS</div>
              <div class="font-bold text-white text-sm">Interactive Live Demos</div>
              <div class="text-xs text-slate-400 mt-1">Interactive product previews turning passive visitors into booked calls</div>
            </div>
          </div>
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 font-code text-xs text-slate-300">
            <span class="text-cyan-400 font-bold">// Result:</span> Bounce rate plummeted by 42%, while sales call booking conversion jumped from 1.8% to 4.3%.
          </div>
        </div>
      `
    }
  };

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.projectId;
      const data = projectDetails[id];
      if (data) {
        modalTitle.textContent = data.title;
        modalContent.innerHTML = `
          <div class="mb-4">
            <div class="text-xs font-tech text-cyan-400 font-bold uppercase tracking-wider">${data.client}</div>
            <div class="text-xs font-code text-purple-300 mt-0.5">${data.stats}</div>
          </div>
          ${data.architecture}
          <div class="mt-6 flex justify-end gap-3">
            <button onclick="document.getElementById('project-modal').classList.add('hidden')" class="btn-secondary-glass px-4 py-2 text-xs">Close Preview</button>
            <a href="https://calendly.com/jamgbadijuliet49/30min" target="_blank" class="btn-primary-glow px-5 py-2 text-xs font-tech font-bold text-slate-950 inline-flex items-center gap-1.5">
              Build This For My Business →
            </a>
          </div>
        `;
        modal.classList.remove('hidden');
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   7. 3-QUESTION INTAKE FORM & CALENDLY LINK
   ========================================================================== */
function initIntakeForm() {
  const form = document.getElementById('intake-form');
  const successBox = document.getElementById('intake-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const businessType = document.getElementById('intake-biz-type').value;
    const bottleneck = document.getElementById('intake-bottleneck').value;
    const contact = document.getElementById('intake-contact').value;

    if (!contact) {
      alert('Please provide your email or WhatsApp number so Juliet can review your bottleneck.');
      return;
    }

    form.classList.add('hidden');
    if (successBox) {
      successBox.classList.remove('hidden');
    }

    // Direct redirect to Juliet's official Calendly link with pre-filled context after 1.5 seconds
    setTimeout(() => {
      window.open('https://calendly.com/jamgbadijuliet49/30min', '_blank');
    }, 1200);
  });
}

/* ==========================================================================
   8. MOBILE RESPONSIVE MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}
