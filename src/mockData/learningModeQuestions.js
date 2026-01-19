export const learningModeQuestions = [
    {
        id: 1,
        topic: "Web Vitals",

        question: "What are Web Vitals?",

        explanation: {
            definition:
                "Web Vitals are simple ways to check how good a website feels to users.",

            description:
                "They tell us if a website loads fast, responds quickly, and doesn’t jump around while loading."
        },

        tip: "If a website feels slow, laggy, or annoying, Web Vitals will tell you why.",

        examples: [
            {
                title: "Slow Loading Page",
                description:
                    "If the main content takes too long to appear, users feel the site is slow. This affects LCP."
            },
            {
                title: "Button Click Delay",
                description:
                    "If clicking a button doesn’t respond instantly, users feel the site is broken. This affects FID."
            },
            {
                title: "Moving Content",
                description:
                    "If text or buttons move while loading, users may click the wrong thing. This affects CLS."
            }
        ]
    },

    {
        id: 2,
        topic: "Web Vitals",

        question: "What factors affect Web Vitals?",

        explanation: {
            definition:
                "Several factors can impact how well a website performs in terms of Core Web Vitals.",

            description:
                "Factors include server response time, render-blocking resources, JavaScript execution, image sizes, and layout shifts caused by dynamic content."
        },

        tip: null,

        examples: [
            {
                title: "Server Response Time",
                description:
                    "Slower server responses delay content loading, increasing LCP."
            },
            {
                title: "Render-Blocking Resources",
                description:
                    "CSS and JavaScript that block rendering can delay page load and affect LCP and FID."
            },
            {
                title: "Layout Shifts",
                description:
                    "Images or ads without dimensions, or dynamically injected content, can cause CLS issues."
            }
        ]
    },

    {
        id: 3,
        topic: "Web Vitals",

        question: "How can you measure Web Vitals?",

        explanation: {
            definition:
                "Web Vitals can be measured using both lab tools and field (real-user) data.",

            description:
                "Lab tools include Lighthouse and PageSpeed Insights, which simulate page loads. Field tools like Google Analytics or the Web Vitals JavaScript library collect real user metrics."
        },

        tip: "Use lab tools for debugging and field data to understand actual user experience.",

        examples: [
            {
                title: "Lighthouse",
                description:
                    "Simulates page load in a controlled environment to give performance scores."
            },
            {
                title: "PageSpeed Insights",
                description:
                    "Provides lab and field data, highlighting areas for improvement."
            },
            {
                title: "Web Vitals JS Library",
                description:
                    "Collects metrics from real users visiting your site."
            }
        ]
    },

    {
        id: 4,
        topic: "Web Vitals",

        question: "Why are Web Vitals important for SEO?",

        explanation: {
            definition:
                "Web Vitals impact search engine rankings because Google prioritizes sites that provide a good user experience.",

            description:
                "Fast, responsive, and stable pages tend to rank higher. Poor Core Web Vitals can lead to lower rankings, higher bounce rates, and less user engagement."
        },

        tip: "Think of Web Vitals as your site’s report card in Google’s eyes—better scores often lead to better visibility.",

        examples: [
            {
                title: "Better Rankings",
                description:
                    "Websites with good LCP, FID, and CLS tend to appear higher in search results."
            },
            {
                title: "Lower Bounce Rate",
                description:
                    "Users stay longer on fast and stable pages, improving engagement metrics."
            }
        ]
    },

    {
        id: 5,
        topic: "Web Vitals",

        question: "What strategies improve Largest Contentful Paint (LCP)?",

        explanation: {
            definition:
                "LCP measures how quickly the largest visible content loads on the page.",

            description:
                "Improving LCP involves optimizing images, server response time, CSS, and critical rendering paths."
        },

        tip: "Focus on the elements that users see first—their perception of speed is key.",

        examples: [
            {
                title: "Optimize Images",
                description:
                    "Use proper formats, compression, and lazy loading for off-screen images."
            },
            {
                title: "Reduce Server Response Time",
                description:
                    "Use faster hosting, caching, and content delivery networks (CDNs)."
            },
            {
                title: "Minimize Render-Blocking CSS",
                description:
                    "Inline critical CSS and defer non-essential styles."
            }
        ]
    },

    {
        id: 6,
        topic: "Web Vitals",

        question: "How can you reduce Cumulative Layout Shift (CLS)?",

        explanation: {
            definition:
                "CLS measures unexpected layout shifts that happen during page load or interaction.",

            description:
                "Reducing CLS improves visual stability, making the site feel smoother and more professional."
        },

        tip: "Reserve space for elements before they load—users dislike moving buttons or content.",

        examples: [
            {
                title: "Set Size Attributes",
                description:
                    "Always define width and height for images, videos, and iframes."
            },
            {
                title: "Avoid Inserting Content Above Existing Content",
                description:
                    "Place ads or dynamically loaded content in reserved spaces."
            },
            {
                title: "Use CSS Transformations Carefully",
                description:
                    "Avoid animations or transitions that shift layout unexpectedly."
            }
        ]
    }
];


export const set1Questions= [
    {
        "question": "Largest Contentful Paint (LCP) measures how long it takes the main content to load. If a site’s LCP is 4 seconds, what do you think will happen to user experience?",
        "options": [
            "Users feel the site is slow",
            "Users don’t notice",
            "Users enjoy the site normally"
        ],
        "outcome": "An LCP over 2.5 seconds is considered poor. Users will perceive the site as slow, impacting engagement."
    },
    {
        "question": "First Input Delay (FID) measures the responsiveness of a page to user interactions. If a page takes 500ms to respond after a click, what do you expect the user to do?",
        "options": [
            "Users get frustrated and click multiple times",
            "Users wait patiently",
            "Users don’t notice"
        ],
        "outcome": "A high FID (>100ms) makes the site feel sluggish. Users often click multiple times or leave, hurting usability."
    },
    {
        "question": "Cumulative Layout Shift (CLS) tracks unexpected movement of page elements. If images load late and push text down, what do you think happens?",
        "options": [
            "Users click wrong buttons by accident",
            "Users scroll normally",
            "Nothing changes"
        ],
        "outcome": "High CLS leads to mis-clicks and frustration. Pages should maintain layout stability as content loads."
    },
    {
        "question": "Web Vitals also include mobile performance. If a page is fast on desktop but buttons are tiny on mobile, what do you expect the user experience to be?",
        "options": [
            "Users leave or struggle to tap",
            "Users use it anyway",
            "Users ignore the buttons"
        ],
        "outcome": "Even with good speed, poor mobile usability hurts engagement. Mobile-friendly layout is critical for Core Web Vitals."
    },
    {
        "question": "A page loads quickly, but its largest content is below the fold. What do you think happens to LCP?",
        "options": [
            "LCP is delayed because main content appears late",
            "LCP is fast since page loads quickly",
            "LCP doesn’t matter"
        ],
        "outcome": "LCP measures when the largest visible content appears. If it’s below the fold, users perceive slow loading even if the page technically loads fast."
    }
]
