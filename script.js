// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_36l7g78',
    templateId: 'template_zakxxsw',
    publicKey: 'k1PYqQSpq4l5IcnxT'
};

// reCAPTCHA Configuration
const RECAPTCHA_SITE_KEY = '6LfksPwrAAAAAPJybNbRh41EENB_tgoF94lMarx8';

// Archetype mapping for each question
const ARCHETYPE_MAPPING = {
    q1: { A: 'Doer', B: 'Analyst' },
    q2: { A: 'Doer', B: 'Connector' },
    q3: { A: 'Analyst', B: 'Explorer' },
    q4: { A: 'Doer', B: 'Explorer' },
    q5: { A: 'Analyst', B: 'Connector' },
    q6: { A: 'Doer', B: 'Explorer' },
    q7: { A: 'Analyst', B: 'Connector' },
    q8: { A: 'Doer', B: 'Connector' },
    q9: { A: 'Analyst', B: 'Explorer' },
    q10: { A: 'Doer', B: 'Explorer' },
    q11: { A: 'Analyst', B: 'Explorer' },
    q12: { A: 'Analyst', B: 'Explorer' },
    q13: { A: 'Analyst', B: 'Connector' },
    q14: { A: 'Analyst', B: 'Connector' },
    q15: { A: 'Analyst', B: 'Explorer' }
};

// Archetype descriptions
const ARCHETYPE_INFO = {
    Analyst: {
        icon: '🧠',
        description: 'Logical, structured, data-driven'
    },
    Doer: {
        icon: '⚡',
        description: 'Action-oriented, direct, results-focused'
    },
    Connector: {
        icon: '💬',
        description: 'Collaborative, empathetic, people-centered'
    },
    Explorer: {
        icon: '🌍',
        description: 'Curious, creative, flexible'
    }
};

// Initialize EmailJS
function initializeEmailJS() {
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// Calculate archetype scores
function calculateArchetypes(formData) {
    const scores = {
        Analyst: 0,
        Doer: 0,
        Connector: 0,
        Explorer: 0
    };

    // Count scores for questions 1-15
    for (let i = 1; i <= 15; i++) {
        const questionKey = `q${i}`;
        const answer = formData[questionKey];
        if (answer && ARCHETYPE_MAPPING[questionKey]) {
            const archetype = ARCHETYPE_MAPPING[questionKey][answer];
            if (archetype) {
                scores[archetype]++;
            }
        }
    }

    // Calculate percentages
    const total = 15;
    const percentages = {};
    for (const archetype in scores) {
        percentages[archetype] = Math.round((scores[archetype] / total) * 100);
    }

    // Find primary archetype
    const primary = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );

    // Find secondary archetype (within 2 points of primary)
    let secondary = null;
    const sortedArchetypes = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    if (sortedArchetypes.length > 1) {
        const primaryScore = scores[sortedArchetypes[0]];
        const secondaryScore = scores[sortedArchetypes[1]];
        if (primaryScore - secondaryScore <= 2 && secondaryScore > 0) {
            secondary = sortedArchetypes[1];
        }
    }

    return {
        scores,
        percentages,
        primary,
        secondary
    };
}

// Display archetype results
function displayResults(archetypes) {
    const resultsDiv = document.getElementById('archetypeResults');
    
    let html = '<h3>Your Learning Style Profile</h3>';
    
    // Primary archetype
    html += `
        <div class="primary-archetype">
            <div class="archetype-label">Primary Learning Style</div>
            <div class="archetype-value">
                ${ARCHETYPE_INFO[archetypes.primary].icon} ${archetypes.primary}
            </div>
            <p style="margin-top: 10px; color: #5d6d7e; font-size: 14px;">
                ${ARCHETYPE_INFO[archetypes.primary].description}
            </p>
        </div>
    `;

    // Secondary archetype if applicable
    if (archetypes.secondary) {
        html += `
            <div class="primary-archetype" style="border-color: #5c8ec7; margin-top: 10px;">
                <div class="archetype-label">Secondary Learning Style</div>
                <div class="archetype-value" style="color: #5c8ec7;">
                    ${ARCHETYPE_INFO[archetypes.secondary].icon} ${archetypes.secondary}
                </div>
                <p style="margin-top: 10px; color: #5d6d7e; font-size: 14px;">
                    ${ARCHETYPE_INFO[archetypes.secondary].description}
                </p>
            </div>
        `;
    }

    // Score breakdown
    html += '<div style="margin-top: 20px;">';
    for (const archetype in archetypes.scores) {
        const score = archetypes.scores[archetype];
        const percentage = archetypes.percentages[archetype];
        html += `
            <div class="archetype-item">
                <span class="archetype-name">
                    ${ARCHETYPE_INFO[archetype].icon} ${archetype}
                </span>
                <div class="archetype-score">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${percentage}%;"></div>
                    </div>
                    <span class="score-text">${score}/15</span>
                </div>
            </div>
        `;
    }
    html += '</div>';

    resultsDiv.innerHTML = html;
}

// Format email content
function formatEmailContent(formData, archetypes) {
    const questions = [
        "When I'm learning something new, I prefer...",
        "When someone gives me feedback, I prefer...",
        "I understand best when information is...",
        "When I make a mistake, I usually...",
        "I feel most motivated when...",
        "If a trainer were helping me, I'd want them to...",
        "In group training sessions, I usually...",
        "When someone corrects me, I appreciate...",
        "When I read instructions, I prefer...",
        "I like feedback that...",
        "I tend to...",
        "My best learning happens when...",
        "When I'm learning something challenging, I prefer to...",
        "I stay motivated when...",
        "My ideal coaching style would be..."
    ];

    const answerText = {
        q1: { A: "Trying it myself right away", B: "Watching or hearing an example first" },
        q2: { A: "Straightforward, direct comments", B: "A collaborative talk about what worked and what didn't" },
        q3: { A: "Structured and clear step-by-step", B: "Open-ended so I can explore and connect dots" },
        q4: { A: "Want to know exactly what went wrong", B: "Like to reflect on how to adjust next time" },
        q5: { A: "I know the numbers or logic behind my work", B: "I feel encouraged and supported by my team" },
        q6: { A: "Get straight to the point with examples", B: "Build context and talk through ideas" },
        q7: { A: "Prefer to focus and take my own notes", B: "Learn best through discussion and sharing ideas" },
        q8: { A: "Firm, clear direction so I can fix it fast", B: "Positive phrasing that helps me see progress too" },
        q9: { A: "Clear bullet points and steps", B: "A big-picture overview first" },
        q10: { A: "Tells me exactly what to change", B: "Encourages me to think through options" },
        q11: { A: "Trust data and logic most", B: "Trust experience and instinct most" },
        q12: { A: "I have a clear system to follow", B: "I can experiment and figure things out as I go" },
        q13: { A: "Break it into steps and tackle one at a time", B: "Talk it through and brainstorm solutions" },
        q14: { A: "I can see measurable progress", B: "I feel connected to a purpose or team goal" },
        q15: { A: "Structured sessions with clear takeaways", B: "Flexible conversations that evolve naturally" }
    };

    let content = "APTLY ABLE LEARNING PREFERENCES ASSESSMENT\n";
    content += "==========================================\n\n";
    content += `Submission Time: ${new Date().toLocaleString()}\n\n`;

    // Archetype Results
    content += "LEARNING STYLE PROFILE\n";
    content += "----------------------\n";
    content += `Primary Archetype: ${ARCHETYPE_INFO[archetypes.primary].icon} ${archetypes.primary} (${archetypes.scores[archetypes.primary]}/15 points)\n`;
    if (archetypes.secondary) {
        content += `Secondary Archetype: ${ARCHETYPE_INFO[archetypes.secondary].icon} ${archetypes.secondary} (${archetypes.scores[archetypes.secondary]}/15 points)\n`;
    }
    content += "\nScore Breakdown:\n";
    for (const archetype in archetypes.scores) {
        content += `  ${ARCHETYPE_INFO[archetype].icon} ${archetype}: ${archetypes.scores[archetype]}/15 (${archetypes.percentages[archetype]}%)\n`;
    }
    content += "\n\n";

    // Learning Preferences
    content += "LEARNING PREFERENCES\n";
    content += "====================\n\n";
    for (let i = 1; i <= 15; i++) {
        const questionKey = `q${i}`;
        const answer = formData[questionKey];
        const archetype = ARCHETYPE_MAPPING[questionKey][answer];
        content += `${i}. ${questions[i-1]}\n`;
        content += `   Answer: ${answer}. ${answerText[questionKey][answer]}\n`;
        content += `   Archetype: ${ARCHETYPE_INFO[archetype].icon} ${archetype}\n\n`;
    }

    // Reflection Questions
    content += "\nREFLECTION RESPONSES\n";
    content += "====================\n\n";
    content += "1. What's one thing a coach should definitely do to help you thrive?\n";
    content += `   ${formData.reflection1}\n\n`;
    content += "2. What's one thing that doesn't work well for you when learning or receiving feedback?\n";
    content += `   ${formData.reflection2}\n\n`;
    content += "3. How do you prefer to receive feedback? (In writing, verbally, or both)\n";
    content += `   ${formData.reflection3}\n\n`;

    return content;
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('assessmentForm');
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    // Collect form data
    const formData = {};
    const formElements = form.elements;
    
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
            if (element.type === 'radio') {
                if (element.checked) {
                    formData[element.name] = element.value;
                }
            } else if (element.type === 'textarea' || element.tagName === 'TEXTAREA') {
                formData[element.name] = element.value;
            }
        }
    }

    // Validate all questions are answered
    for (let i = 1; i <= 15; i++) {
        if (!formData[`q${i}`]) {
            errorMessage.textContent = `Please answer question ${i} before submitting.`;
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }

    // Validate reflection questions
    if (!formData.reflection1 || !formData.reflection2 || !formData.reflection3) {
        errorMessage.textContent = 'Please answer all reflection questions before submitting.';
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Honeypot spam check
    if (formData.website) {
        console.log('Spam detected via honeypot');
        return; // Silent fail for bots
    }

    // Verify reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        errorMessage.textContent = 'Please complete the reCAPTCHA verification.';
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Hide error message
    errorMessage.style.display = 'none';

    // Calculate archetypes
    const archetypes = calculateArchetypes(formData);

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.style.display = 'none';
    loadingSpinner.style.display = 'block';

    // Prepare email content
    const emailContent = formatEmailContent(formData, archetypes);

    try {
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
            throw new Error('EmailJS not configured. Please update the configuration in script.js');
        }

        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            {
                message: emailContent,
                to_email: 'info@aptlyable.com',
                subject: `Learning Preferences Assessment - ${new Date().toLocaleDateString()}`
            }
        );

        console.log('Email sent successfully:', response);

        // Show success message
        form.style.display = 'none';
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        displayResults(archetypes);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Error sending email:', error);
        
        // Show error message
        errorMessage.textContent = 'There was an error submitting your assessment. Please try again or contact support.';
        errorMessage.style.display = 'block';
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
        
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initializeEmailJS();

    // Add form submit listener
    const form = document.getElementById('assessmentForm');
    form.addEventListener('submit', handleSubmit);

    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add visual feedback when radio buttons are selected
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const questionGroup = this.closest('.question-group');
            questionGroup.style.borderLeftColor = '#24568d';
            questionGroup.style.background = '#f8fafc';
            
            setTimeout(() => {
                questionGroup.style.borderLeftColor = '';
                questionGroup.style.background = '';
            }, 300);
        });
    });

    console.log('Aptly Able Assessment Form initialized');
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        console.warn('⚠️ EmailJS is not configured. Please update the EMAILJS_CONFIG object in script.js with your credentials.');
    }
});

