export const javascriptPromises = {
    id: "js-promises",
    title: "JavaScript Promises",
    subtitle: "Master asynchronous operations without callback hell",
    tags: ["JavaScript", "Async"],

    sections: [
        {
            type: "info",
            title: "What & Why",
            description:
                "A Promise is an object representing the eventual completion or failure of an asynchronous operation.",
            highlights: [
                { text: "Callback Hell", type: "bad" },
                { text: "Promise Chain", type: "good" }
            ]
        },

        {
            type: "code",
            title: "Syntax",
            language: "js",
            code: `const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Done");
  else reject("Error");
});`
        },

        {
            type: "flow",
            title: "Promise Chaining",
            steps: [
                { label: "myPromise", description: "Starts async action" },
                { label: ".then()", description: "Handles success" },
                { label: ".catch()", description: "Handles failure" },
                { label: ".finally()", description: "Runs always" }
            ]
        }
    ]
};
