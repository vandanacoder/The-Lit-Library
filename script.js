// ===== RANDOM QUOTE GENERATOR =====

const quotes = [
  {
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin"
  },
  {
    text: "So many books, so little time.",
    author: "Frank Zappa"
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King"
  },
  {
    text: "Reading is essential for those who seek to rise above the ordinary.",
    author: "Jim Rohn"
  },
  {
    text: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "A book is a dream that you hold in your hand.",
    author: "Neil Gaiman"
  },
  {
    text: "Reading is to the mind what exercise is to the body.",
    author: "Joseph Addison"
  },
  {
    text: "The best books are treasuries of good words and golden thoughts.",
    author: "Alfred Lord Tennyson"
  },
  {
    text: "Literature is the most agreeable way of ignoring life.",
    author: "Fernando Pessoa"
  },
  {
    text: "In the case of good books, the point is not to see how many of them you can get through, but rather how many can get through to you.",
    author: "David McCullough"
  },
  {
    text: "A library is not a luxury but one of the necessities of life.",
    author: "Henry Ward Beecher"
  },
  {
    text: "Words are, of course, the most powerful drug used by mankind.",
    author: "Rudyard Kipling"
  },
  {
    text: "Reading is important, because if you can read, you can learn any subject that you want to know.",
    author: "Tom Clancy"
  },
  {
    text: "I have always imagined that Paradise will be a kind of library.",
    author: "Jorge Luis Borges"
  },
  {
    text: "There is no greater thing you can do with your life and your work than follow your passions, in a way that serves the world and serves yourself.",
    author: "Richard Branson"
  },
  {
    text: "The person who says it is impossible should not interrupt the person doing it.",
    author: "Chinese Proverb"
  },
  {
    text: "A reader knows that good books improve the mind and feed the soul.",
    author: "Unknown"
  },
  {
    text: "Books are mirrors: you only see in them what you already have inside you.",
    author: "Carlos Ruiz Zafón"
  },
  {
    text: "The reading of all good books is like a conversation with the finest minds of past centuries.",
    author: "René Descartes"
  },
  {
    text: "Outside of a dog, a book is man's best friend. Inside of a dog it's too dark to read.",
    author: "Groucho Marx"
  },
  {
    text: "Any book that helps a child to form a habit of reading, to make reading one of his deep and continuing needs, is good for him.",
    author: "Maya Angelou"
  },
  {
    text: "Literature is my Utopia. Here I am not disfranchised.",
    author: "Helen Keller"
  },
  {
    text: "The best gifts come in small packages. Books are small packages of infinite possibilities.",
    author: "Unknown"
  },
  {
    text: "To learn to read is to light a fire; every syllable that is spelled out is a spark.",
    author: "Victor Hugo"
  }
];

let currentQuoteIndex = -1;
let usedQuotes = [];

function getRandomQuote() {
  // Reset used quotes when all are used
  if (usedQuotes.length === quotes.length) {
    usedQuotes = [];
  }

  // Get a random quote not yet used
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (usedQuotes.includes(randomIndex));

  usedQuotes.push(randomIndex);
  currentQuoteIndex = randomIndex;
  return quotes[randomIndex];
}

function displayRandomQuote() {
  const quoteContainer = document.getElementById('quote-container');
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  // Fade out animation
  quoteContainer.style.opacity = '0.5';
  quoteContainer.style.transform = 'scale(0.95)';

  // Add slight delay for smooth transition
  setTimeout(() => {
    const quote = getRandomQuote();
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;

    // Fade in animation
    quoteContainer.style.opacity = '1';
    quoteContainer.style.transform = 'scale(1)';
  }, 300);
}

// Initialize quote on page load
document.addEventListener('DOMContentLoaded', () => {
  const newQuoteBtn = document.getElementById('new-quote-btn');
  
  // Display first quote
  displayRandomQuote();

  // Add click event to button
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', displayRandomQuote);
  }

  // Optional: Auto-load random quote every 30 seconds
  // Uncomment if you want auto-refresh
  // setInterval(displayRandomQuote, 30000);
});

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.borderBottom = 'none';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.borderBottom = '2px solid #d4a574';
    }
  });
});

// ===== FORM VALIDATION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#d32f2f';
        input.style.boxShadow = '0 0 10px rgba(211, 47, 47, 0.3)';
        isValid = false;
      } else {
        input.style.borderColor = '#e8dcc8';
        input.style.boxShadow = 'none';
      }
    });

    if (isValid) {
      // Success message
      const formParent = this.parentElement;
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        margin-bottom: 20px;
        font-weight: 600;
        text-align: center;
        animation: slideDown 0.3s ease;
      `;
      successMsg.textContent = '✓ Thank you! We will get back to you soon.';
      
      formParent.insertBefore(successMsg, this);
      this.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => successMsg.remove(), 300);
      }, 5000);

      inputs.forEach(input => {
        input.style.borderColor = '#e8dcc8';
        input.style.boxShadow = 'none';
      });
    }
  });

  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.style.borderColor = '#d4a574';
      this.style.boxShadow = '0 0 10px rgba(212, 165, 116, 0.3)';
    });
    input.addEventListener('blur', function () {
      if (!this.value.trim()) {
        this.style.borderColor = '#e8dcc8';
        this.style.boxShadow = 'none';
      } else {
        this.style.borderColor = '#d4a574';
      }
    });
  });
}

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== PAGE LOAD COMPLETE =====
console.log('✓ The Lit Library - Website loaded successfully');
console.log('✓ Random Quote Generator - Active');
console.log('✓ Form Validation - Enabled');
console.log('✓ Smooth Navigation - Ready');
