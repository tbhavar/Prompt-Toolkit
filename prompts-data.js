// ===================================
// Prompt Templates Database
// ===================================

const promptTemplates = [
    {
        title: "Blog Post Writer",
        description: "Generate engaging blog content on any topic",
        type: "writing",
        role: "Expert Content Writer and SEO Specialist",
        task: "Write a comprehensive, engaging blog post about [TOPIC]. The post should be informative, well-structured, and optimized for search engines.",
        context: "Target audience: [AUDIENCE]. Tone: informative yet conversational. Include relevant examples and actionable insights."
    },
    {
        title: "Code Debugger",
        description: "Debug and fix code issues with explanations",
        type: "coding",
        role: "Senior Software Engineer with expertise in debugging",
        task: "Analyze the following code, identify bugs, and provide corrected code with detailed explanations of what was wrong and why the fix works.",
        context: "Programming language: [LANGUAGE]. Focus on best practices, performance, and maintainability."
    },
    {
        title: "Data Analyst",
        description: "Analyze data and provide insights",
        type: "analysis",
        role: "Data Analyst with expertise in statistical analysis",
        task: "Analyze the provided dataset and identify key trends, patterns, and actionable insights. Present findings in a clear, data-driven manner.",
        context: "Include visualizations suggestions, statistical significance, and business recommendations."
    },
    {
        title: "Creative Story Writer",
        description: "Write engaging creative fiction",
        type: "creative",
        role: "Creative Fiction Writer",
        task: "Write an engaging short story based on the following premise: [PREMISE]. The story should have compelling characters, vivid descriptions, and an interesting plot.",
        context: "Genre: [GENRE]. Word count: approximately [COUNT] words. Include dialogue and sensory details."
    },
    {
        title: "Technical Documentation",
        description: "Create clear technical documentation",
        type: "technical",
        role: "Technical Writer with expertise in developer documentation",
        task: "Create comprehensive technical documentation for [PRODUCT/FEATURE]. Include setup instructions, usage examples, API references, and troubleshooting guides.",
        context: "Target audience: developers. Format: Markdown. Include code examples and diagrams where appropriate."
    },
    {
        title: "Educational Lesson Plan",
        description: "Design structured learning materials",
        type: "educational",
        role: "Experienced Educator and Curriculum Designer",
        task: "Create a detailed lesson plan for teaching [TOPIC] to [GRADE/LEVEL] students. Include learning objectives, activities, assessments, and differentiation strategies.",
        context: "Duration: [TIME]. Learning style: interactive and engaging. Include real-world applications."
    },
    {
        title: "Marketing Copy",
        description: "Write persuasive marketing content",
        type: "writing",
        role: "Marketing Copywriter with expertise in conversion optimization",
        task: "Write compelling marketing copy for [PRODUCT/SERVICE]. The copy should highlight benefits, address pain points, and include a strong call-to-action.",
        context: "Target audience: [AUDIENCE]. Channel: [PLATFORM]. Focus on emotional appeal and unique value proposition."
    },
    {
        title: "Code Review",
        description: "Review code for quality and best practices",
        type: "coding",
        role: "Senior Developer and Code Review Specialist",
        task: "Review the following code for quality, performance, security, and adherence to best practices. Provide specific, actionable feedback with examples.",
        context: "Language: [LANGUAGE]. Framework: [FRAMEWORK]. Focus on code maintainability, scalability, and security."
    },
    {
        title: "Research Summarizer",
        description: "Summarize complex research papers",
        type: "analysis",
        role: "Research Analyst with expertise in academic literature",
        task: "Read and summarize the key findings, methodology, and implications of the following research paper. Make it accessible to a general audience.",
        context: "Highlight novel contributions, limitations, and practical applications. Include key statistics and conclusions."
    },
    {
        title: "Social Media Content",
        description: "Create engaging social media posts",
        type: "creative",
        role: "Social Media Manager and Content Strategist",
        task: "Create [NUMBER] engaging social media posts about [TOPIC]. Posts should be platform-appropriate, include relevant hashtags, and encourage engagement.",
        context: "Platform: [PLATFORM]. Brand voice: [TONE]. Include emoji suggestions and optimal posting times."
    },
    {
        title: "API Documentation",
        description: "Document API endpoints clearly",
        type: "technical",
        role: "API Documentation Specialist",
        task: "Create comprehensive API documentation for [ENDPOINT]. Include endpoint description, parameters, request/response examples, error codes, and authentication requirements.",
        context: "Format: OpenAPI/Swagger compatible. Include cURL examples and SDK code snippets in multiple languages."
    },
    {
        title: "Tutorial Creator",
        description: "Design step-by-step tutorials",
        type: "educational",
        role: "Technical Educator and Tutorial Designer",
        task: "Create a step-by-step tutorial teaching [SKILL/TOPIC]. Each step should be clear, include examples, and build progressively in difficulty.",
        context: "Target audience: [LEVEL] learners. Include screenshots/diagrams, common pitfalls, and practice exercises."
    }
];

// Prompt Engineering Best Practices
const promptPrinciples = {
    clarity: {
        title: "Be Clear and Specific",
        description: "Use precise language and avoid ambiguity. Clearly state what you want.",
        examples: [
            "Bad: Write about dogs",
            "Good: Write a 500-word informative article about training Golden Retrievers for first-time dog owners"
        ]
    },
    context: {
        title: "Provide Context",
        description: "Give background information to help the AI understand the situation.",
        examples: [
            "Bad: Fix this code",
            "Good: Fix this Python function that should calculate fibonacci numbers but returns incorrect results for inputs > 10"
        ]
    },
    role: {
        title: "Assign a Role",
        description: "Tell the AI what expert perspective to adopt.",
        examples: [
            "Bad: Explain blockchain",
            "Good: As a blockchain architect, explain how blockchain technology works to a non-technical business executive"
        ]
    },
    format: {
        title: "Specify Output Format",
        description: "Define how you want the response structured.",
        examples: [
            "Bad: Tell me about planets",
            "Good: Create a comparison table of the 8 planets including diameter, distance from sun, and number of moons"
        ]
    },
    constraints: {
        title: "Set Constraints",
        description: "Define boundaries, limitations, and requirements.",
        examples: [
            "Bad: Write a story",
            "Good: Write a 300-word sci-fi story for young adults, avoiding violence, with a hopeful ending"
        ]
    },
    examples: {
        title: "Provide Examples",
        description: "Show the AI what you're looking for with examples.",
        examples: [
            "Zero-shot: Translate to French: Hello",
            "Few-shot: Translate to French:\nHello -> Bonjour\nGoodbye -> Au revoir\nThank you -> ?"
        ]
    }
};

// Common Prompt Patterns
const promptPatterns = {
    chainOfThought: "Think through this step-by-step and explain your reasoning at each stage.",
    taskDecomposition: "Break this complex task into smaller, manageable steps and complete each one.",
    selfConsistency: "Provide multiple approaches to solving this problem and identify the most reliable solution.",
    iterativeRefinement: "First provide a draft solution, then critique it, and finally provide an improved version.",
    constrained: "Answer within these strict constraints: [LIST CONSTRAINTS]",
    comparative: "Compare and contrast [OPTION A] vs [OPTION B] across these dimensions: [DIMENSIONS]",
    creative: "Generate [NUMBER] creative alternatives for [TASK], each with a different approach or style.",
    analytical: "Analyze [SUBJECT] by examining its components, relationships, patterns, and implications."
};

// Quality Criteria for Prompts
const qualityCriteria = {
    hasRole: {
        weight: 15,
        description: "Includes a specific expert role or perspective"
    },
    hasContext: {
        weight: 15,
        description: "Provides relevant background information"
    },
    isSpecific: {
        weight: 20,
        description: "Uses clear, specific language without ambiguity"
    },
    hasFormat: {
        weight: 15,
        description: "Specifies desired output format or structure"
    },
    hasConstraints: {
        weight: 10,
        description: "Includes relevant constraints or requirements"
    },
    usesTechniques: {
        weight: 15,
        description: "Employs prompt engineering techniques"
    },
    hasExamples: {
        weight: 10,
        description: "Provides examples for few-shot learning"
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        promptTemplates,
        promptPrinciples,
        promptPatterns,
        qualityCriteria
    };
}