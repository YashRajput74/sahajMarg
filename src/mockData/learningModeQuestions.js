export const learningModeQuestions = [
    {
        id: 1,
        topic: "Web Vitals",

        question: "What are Web Vitals?",

        explanation: {
            definition:
                "Web Vitals are a set of metrics defined by Google to measure the quality of user experience on the web, focusing on loading, interactivity, and visual stability.",

            description:
                "Web Vitals help developers understand how real users experience a website. Core Web Vitals include Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)."
        },

        tip: "Think of Web Vitals as a health check for your website—fast, responsive, and stable pages make happy users.",

        examples: [
            {
                title: "Largest Contentful Paint (LCP)",
                description:
                    "Measures loading performance. For a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading."
            },
            {
                title: "First Input Delay (FID)",
                description:
                    "Measures interactivity. Pages should have an FID of less than 100 milliseconds to feel responsive."
            },
            {
                title: "Cumulative Layout Shift (CLS)",
                description:
                    "Measures visual stability. A CLS score below 0.1 ensures that elements don’t unexpectedly shift on the page."
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
