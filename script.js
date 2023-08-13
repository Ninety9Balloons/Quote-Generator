const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function compelete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new API quote
function newQuote() {
    loading();

    // Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author field is blank or null and replace it with 'Unknown
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styleing

    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    // Set quote, hide loader

    quoteText.textContent = quote.text;
    compelete();
}

// // Show new LOCAL quote
// function newQuote() {
//     // Pick a random quote from apiQuotes
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

// Get Quotes From API

async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();

// Local Quotes
// newQuote();
