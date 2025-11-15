// ===================================
// Prompt Engineering Generator
// Main JavaScript File
// ===================================

// Global State
const state = {
    taskType: 'writing',
    role: 'Professional Expert',
    task: '',
    context: '',
    formats: [],
    tone: 'professional',
    techniques: [],
    constraints: '',
    examples: '',
    generatedPrompt: '',
    promptHistory: [],
    promptCount: 0
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadFromLocalStorage();
    attachEventListeners();
    loadTemplates();
    checkURLParams();
});

// Initialize App
function initializeApp() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

// Load Data from Local Storage
function loadFromLocalStorage() {
    const savedHistory = localStorage.getItem('promptHistory');
    const savedCount = localStorage.getItem('promptCount');

    if (savedHistory) {
        state.promptHistory = JSON.parse(savedHistory);
        renderHistory();
    }

    if (savedCount) {
        state.promptCount = parseInt(savedCount);
        document.getElementById('promptCount').textContent = state.promptCount;
    }
}

// Attach Event Listeners
function attachEventListeners() {
    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Task Type Selection
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', (e) => selectTaskType(e.currentTarget));
    });

    // Form Inputs
    document.getElementById('roleInput').addEventListener('input', updateState);
    document.getElementById('taskInput').addEventListener('input', (e) => {
        updateState();
        updateCharCount(e.target);
    });
    document.getElementById('contextInput').addEventListener('input', updateState);
    document.getElementById('constraintsInput').addEventListener('input', updateState);
    document.getElementById('examplesInput').addEventListener('input', updateState);

    // Checkboxes and Radios
    document.querySelectorAll('input[name="format"]').forEach(input => {
        input.addEventListener('change', updateState);
    });

    document.querySelectorAll('input[name="tone"]').forEach(input => {
        input.addEventListener('change', updateState);
    });

    document.querySelectorAll('input[name="technique"]').forEach(input => {
        input.addEventListener('change', (e) => {
            updateState();
            toggleFewShotSection();
        });
    });

    // Advanced Options Toggle
    document.getElementById('advancedToggle').addEventListener('click', toggleAdvancedOptions);

    // Buttons
    document.getElementById('generateBtn').addEventListener('click', generatePrompt);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('downloadBtn').addEventListener('click', downloadPrompt);
    document.getElementById('shareBtn').addEventListener('click', sharePrompt);
    document.getElementById('resetBtn').addEventListener('click', resetForm);

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
    });
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.sun-icon');
    if (theme === 'dark') {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }
}

// Select Task Type
function selectTaskType(card) {
    document.querySelectorAll('.task-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    state.taskType = card.dataset.task;
}

// Update State
function updateState() {
    state.role = document.getElementById('roleInput').value;
    state.task = document.getElementById('taskInput').value;
    state.context = document.getElementById('contextInput').value;
    state.constraints = document.getElementById('constraintsInput').value;
    state.examples = document.getElementById('examplesInput').value;

    state.formats = Array.from(document.querySelectorAll('input[name="format"]:checked'))
        .map(input => input.value);

    state.tone = document.querySelector('input[name="tone"]:checked')?.value || 'professional';

    state.techniques = Array.from(document.querySelectorAll('input[name="technique"]:checked'))
        .map(input => input.value);
}

// Update Character Count
function updateCharCount(textarea) {
    const count = textarea.value.length;
    document.getElementById('charCount').textContent = count;
}

// Toggle Advanced Options
function toggleAdvancedOptions() {
    const section = document.getElementById('advancedOptions');
    const button = document.getElementById('advancedToggle');

    section.classList.toggle('expanded');
    button.classList.toggle('active');
}

// Toggle Few-Shot Section
function toggleFewShotSection() {
    const fewshotCheck = document.getElementById('fewshotCheck');
    const fewshotSection = document.getElementById('fewshotSection');

    if (fewshotCheck.checked) {
        fewshotSection.style.display = 'block';
    } else {
        fewshotSection.style.display = 'none';
    }
}

// Generate Prompt
function generatePrompt() {
    updateState();

    if (!state.task.trim()) {
        showToast('Please describe your task', 'error');
        return;
    }

    let prompt = '';

    // Role
    if (state.role) {
        prompt += `You are ${state.role}. `;
    }

    // Main Task
    prompt += `\n\n## Task\n${state.task}`;

    // Context
    if (state.context) {
        prompt += `\n\n## Context\n${state.context}`;
    }

    // Techniques
    if (state.techniques.includes('cot')) {
        prompt += `\n\nThink through this step-by-step and show your reasoning process.`;
    }

    if (state.techniques.includes('stepbystep')) {
        prompt += `\n\nProvide your response in clear, numbered steps.`;
    }

    // Output Format
    if (state.formats.length > 0) {
        prompt += `\n\n## Output Format\nProvide the response in the following format(s):\n`;
        state.formats.forEach(format => {
            prompt += `- ${format.charAt(0).toUpperCase() + format.slice(1)}\n`;
        });
    }

    // Tone
    const toneMap = {
        'professional': 'professional and clear',
        'casual': 'casual and conversational',
        'technical': 'technical and precise',
        'creative': 'creative and engaging',
        'formal': 'formal and structured'
    };

    prompt += `\n\n## Style\nUse a ${toneMap[state.tone]} tone.`;

    // Constraints
    if (state.constraints) {
        prompt += `\n\n## Constraints\n${state.constraints}`;
    }

    // Few-Shot Examples
    if (state.techniques.includes('fewshot') && state.examples) {
        prompt += `\n\n## Examples\n${state.examples}`;
    }

    // Additional Instructions
    if (state.techniques.includes('constraints')) {
        prompt += `\n\nEnsure all constraints and requirements are strictly followed.`;
    }

    state.generatedPrompt = prompt.trim();
    displayPrompt();
    analyzeQuality();
    saveToHistory();

    // Update stats
    state.promptCount++;
    localStorage.setItem('promptCount', state.promptCount);
    document.getElementById('promptCount').textContent = state.promptCount;

    showToast('Prompt generated successfully!', 'success');
}

// Display Prompt
function displayPrompt() {
    const preview = document.getElementById('promptPreview');
    preview.textContent = state.generatedPrompt;

    // Enable action buttons
    document.getElementById('copyBtn').disabled = false;
    document.getElementById('downloadBtn').disabled = false;
    document.getElementById('shareBtn').disabled = false;
}

// Analyze Prompt Quality
function analyzeQuality() {
    let score = 0;
    const suggestions = [];

    // Check for role
    if (state.role && state.role !== 'Professional Expert') {
        score += 15;
    } else {
        suggestions.push('Consider specifying a more detailed expert role');
    }

    // Check task length
    if (state.task.length > 50) {
        score += 20;
    } else {
        suggestions.push('Add more details to your task description');
    }

    // Check for context
    if (state.context.length > 30) {
        score += 15;
    } else {
        suggestions.push('Provide background context for better results');
    }

    // Check for format specification
    if (state.formats.length > 0) {
        score += 15;
    } else {
        suggestions.push('Specify desired output format');
    }

    // Check for constraints
    if (state.constraints) {
        score += 10;
    } else {
        suggestions.push('Add specific constraints or requirements');
    }

    // Check for advanced techniques
    if (state.techniques.length > 0) {
        score += 15;
    } else {
        suggestions.push('Try using advanced prompt engineering techniques');
    }

    // Check for examples
    if (state.techniques.includes('fewshot') && state.examples) {
        score += 10;
    }

    // Base score for having a task
    score += 10;

    // Update UI
    const scoreElement = document.getElementById('scoreValue');
    const qualityBadge = document.getElementById('qualityBadge');
    const qualityScore = document.getElementById('qualityScore');

    scoreElement.textContent = score;
    qualityScore.textContent = score;

    qualityBadge.classList.remove('low', 'medium', 'high');
    if (score < 50) {
        qualityBadge.classList.add('low');
    } else if (score < 80) {
        qualityBadge.classList.add('medium');
    } else {
        qualityBadge.classList.add('high');
    }

    // Display suggestions
    if (suggestions.length > 0) {
        const suggestionsContainer = document.getElementById('suggestions');
        const suggestionsList = document.getElementById('suggestionsList');

        suggestionsList.innerHTML = suggestions
            .map(s => `<div class="suggestion-item">${s}</div>`)
            .join('');

        suggestionsContainer.style.display = 'block';
    } else {
        document.getElementById('suggestions').style.display = 'none';
    }
}

// Save to History
function saveToHistory() {
    const historyItem = {
        id: Date.now(),
        task: state.task,
        prompt: state.generatedPrompt,
        timestamp: new Date().toISOString()
    };

    state.promptHistory.unshift(historyItem);

    // Keep only last 10
    if (state.promptHistory.length > 10) {
        state.promptHistory = state.promptHistory.slice(0, 10);
    }

    localStorage.setItem('promptHistory', JSON.stringify(state.promptHistory));
    renderHistory();
}

// Render History
function renderHistory() {
    const historyList = document.getElementById('historyList');

    if (state.promptHistory.length === 0) {
        historyList.innerHTML = '<p class="history-empty">No recent prompts yet</p>';
        return;
    }

    historyList.innerHTML = state.promptHistory
        .map(item => `
            <div class="history-item" onclick="loadHistoryItem(${item.id})">
                <div class="history-item-title">${item.task.substring(0, 50)}${item.task.length > 50 ? '...' : ''}</div>
                <div class="history-item-preview">${new Date(item.timestamp).toLocaleDateString()}</div>
            </div>
        `)
        .join('');
}

// Load History Item
function loadHistoryItem(id) {
    const item = state.promptHistory.find(h => h.id === id);
    if (item) {
        state.generatedPrompt = item.prompt;
        displayPrompt();
        showToast('Loaded from history', 'success');
    }
}

// Copy to Clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(state.generatedPrompt);
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = state.generatedPrompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!', 'success');
    }
}

// Download Prompt
function downloadPrompt() {
    const blob = new Blob([state.generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Prompt downloaded!', 'success');
}

// Share Prompt
function sharePrompt() {
    const params = new URLSearchParams({
        task: state.task,
        role: state.role,
        type: state.taskType
    });

    const shareURL = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
        navigator.share({
            title: 'Prompt Engineering Generator',
            text: 'Check out this AI prompt',
            url: shareURL
        }).catch(() => {
            copyShareURL(shareURL);
        });
    } else {
        copyShareURL(shareURL);
    }
}

function copyShareURL(url) {
    navigator.clipboard.writeText(url).then(() => {
        showToast('Share link copied!', 'success');
    });
}

// Reset Form
function resetForm() {
    document.getElementById('roleInput').value = 'Professional Expert';
    document.getElementById('taskInput').value = '';
    document.getElementById('contextInput').value = '';
    document.getElementById('constraintsInput').value = '';
    document.getElementById('examplesInput').value = '';
    document.getElementById('charCount').textContent = '0';

    document.querySelectorAll('input[name="format"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="technique"]').forEach(input => input.checked = false);
    document.querySelector('input[name="tone"][value="professional"]').checked = true;

    document.getElementById('promptPreview').innerHTML = '<p class="preview-placeholder">Your generated prompt will appear here. Fill in the form and click "Generate Prompt" to start.</p>';
    document.getElementById('suggestions').style.display = 'none';

    document.getElementById('copyBtn').disabled = true;
    document.getElementById('downloadBtn').disabled = true;
    document.getElementById('shareBtn').disabled = true;

    showToast('Form reset', 'success');
}

// Load Templates
function loadTemplates() {
    const templateGrid = document.getElementById('templateGrid');

    if (typeof promptTemplates === 'undefined') {
        return;
    }

    templateGrid.innerHTML = promptTemplates
        .map(template => `
            <div class="template-item" onclick='loadTemplate(${JSON.stringify(template).replace(/'/g, "\'")})'}>
                <div class="template-title">${template.title}</div>
                <div class="template-description">${template.description}</div>
            </div>
        `)
        .join('');
}

// Load Template
function loadTemplate(template) {
    document.getElementById('taskInput').value = template.task;
    document.getElementById('roleInput').value = template.role || 'Professional Expert';
    document.getElementById('contextInput').value = template.context || '';

    // Select task type
    document.querySelectorAll('.task-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.task === template.type) {
            card.classList.add('active');
        }
    });

    state.taskType = template.type;
    updateCharCount(document.getElementById('taskInput'));
    showToast(`Template "${template.title}" loaded!`, 'success');
}

// Check URL Parameters
function checkURLParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('task')) {
        document.getElementById('taskInput').value = params.get('task');
    }

    if (params.has('role')) {
        document.getElementById('roleInput').value = params.get('role');
    }

    if (params.has('type')) {
        const type = params.get('type');
        document.querySelectorAll('.task-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.task === type) {
                card.classList.add('active');
            }
        });
        state.taskType = type;
    }
}

// Toggle Accordion
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

    // Open clicked if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add tooltip functionality
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('tooltip-trigger')) {
        const tooltip = e.target.dataset.tooltip;
        e.target.setAttribute('title', tooltip);
    }
});