export const nodesData = {
    root: {
        id: "web-performance",
        title: "Web Performance",
        label: "Root Concept",
    },

    columns: [
        {
            id: "core-web-vitals",
            title: "Core Web Vitals",
            subtitle: "User experience metrics",

            nodes: [
                {
                    id: "lcp",
                    label: "LCP",
                    subtitle: "Largest Contentful Paint",
                },

                {
                    id: "fid",
                    label: "FID",
                    subtitle: "First Input Delay",
                },

                {
                    id: "cls",
                    label: "CLS",
                    subtitle: "Cumulative Layout Shift",
                }
            ]
        },

        {
            id: "network-timing",
            title: "Network Timing",
            subtitle: "Latency and delivery",

            nodes: [
                {
                    id: "ttfb",
                    label: "TTFB",
                    subtitle: "Time to First Byte",
                },

                {
                    id: "dns",
                    label: "DNS Lookup",
                    subtitle: "Domain resolution time",
                }
            ]
        },

        {
            id: "asset-optimization",
            title: "Asset Optimization",
            subtitle: "Resource efficiency",

            nodes: [
                {
                    id: "compression",
                    label: "Compression",
                    subtitle: "Gzip, Brotli",
                },

                {
                    id: "caching",
                    label: "Caching",
                    subtitle: "CDN, Browser Cache",
                },

                {
                    id: "bundling",
                    label: "Bundling",
                    subtitle: "Minification, Tree Shaking",
                }
            ]
        }
    ]
};

export const tooltips = {
    lcp: {
        heading: "Largest Contentful Paint (LCP)",
        data: "measures when the largest element on the screen becomes visible"
    },
    fid: {
        heading: "First Input Delay (FID)",
        data: "Measures responsiveness to the first user interaction."
    },
    cls: {
        heading: "Cumulative Layout Shift (CLS)",
        data: "Measures unexpected layout shifts during loading."
    },
    ttfb: {
        heading: "Time to first Byte (TTFB)",
        data: "Time until the first byte is received from the server."
    },
    dns: {
        heading: "DNS Lookup (DNS)",
        data: "Time taken to resolve a domain name."
    },
    compression: {
        heading: "Compression",
        data: "Reduces asset size before transfer."
    },
    caching: {
        heading: "Caching",
        data: "Stores assets closer to users."
    },
    bundling: {
        heading: "Bundling",
        data: "Reduces JS payload size."
    },
}

export const overlayData = {
    lcp: {
        meta: {
            title: "Largest Contentful Paint (LCP)",
            badge: "Core Web Vital",
            icon: "speed",
            topic: "Web Performance Optimization"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "Largest Contentful Paint (LCP) measures perceived load speed by tracking when the largest element becomes visible."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Faster LCP reduces bounce rates and improves SEO by making the page feel useful sooner."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Feel like writing in your own words?"
            }
        ]
    },

    fid: {
        meta: {
            title: "First Input Delay (FID)",
            badge: "Core Web Vital",
            icon: "touch",
            topic: "User Interaction"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "FID measures how quickly a page responds when a user first interacts with it."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "A low FID makes the site feel responsive and prevents user frustration."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "What causes delays on your site?"
            }
        ]
    },

    cls: {
        meta: {
            title: "Cumulative Layout Shift (CLS)",
            badge: "Core Web Vital",
            icon: "layers",
            topic: "Visual Stability"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "CLS tracks how much visible content unexpectedly shifts during loading."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Layout shifts cause mis-clicks and make pages feel broken or unstable."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Where do layout jumps happen?"
            }
        ]
    },

    ttfb: {
        meta: {
            title: "Time to First Byte (TTFB)",
            badge: "Network Metric",
            icon: "server",
            topic: "Server Performance"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "TTFB measures how long it takes for the server to send the first byte of data."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Slow TTFB delays everything else and makes the site feel sluggish."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Is your backend holding things up?"
            }
        ]
    },

    dns: {
        meta: {
            title: "DNS Lookup",
            badge: "Network Metric",
            icon: "globe",
            topic: "Network Infrastructure"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "DNS lookup time is how long it takes to resolve a domain name to an IP address."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Slow DNS resolution delays the very first request."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Could DNS be optimized?"
            }
        ]
    },

    compression: {
        meta: {
            title: "Compression",
            badge: "Optimization",
            icon: "zip",
            topic: "Asset Delivery"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "Compression reduces file sizes using formats like Gzip or Brotli."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Smaller files download faster and save bandwidth."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Which assets can be compressed?"
            }
        ]
    },

    caching: {
        meta: {
            title: "Caching",
            badge: "Optimization",
            icon: "database",
            topic: "Resource Reuse"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "Caching stores assets so they don’t need to be downloaded again."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Caching makes repeat visits much faster."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Are cache headers set correctly?"
            }
        ]
    },

    bundling: {
        meta: {
            title: "Bundling",
            badge: "Optimization",
            icon: "package",
            topic: "JavaScript Performance"
        },
        sections: [
            {
                type: "text",
                heading: "What is it?",
                content:
                    "Bundling combines and optimizes JS files using techniques like minification."
            },
            {
                type: "text",
                heading: "Why it matters",
                content:
                    "Smaller bundles load and execute faster."
            },
            {
                type: "notes",
                heading: "My Reflections",
                placeholder: "Is unused code being shipped?"
            }
        ]
    }
};
