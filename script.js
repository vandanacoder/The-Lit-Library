/**
 * THE LIT LIBRARY — script.js
 * Single consolidated JavaScript file.
 * Features: Quote Generator, Book Search & Filter, Book Modal,
 * Reading List (LocalStorage), Favorites (LocalStorage),
 * Dark Mode (LocalStorage), Scroll Animations, Nav, FAQ, Contact Form.
 */

'use strict';

// ============================================================
// UTILITIES
// ============================================================

/** Show a brief toast notification */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/** Safely get item from LocalStorage */
function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

/** Safely set item in LocalStorage */
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota exceeded */ }
}

// ============================================================
// BOOK DATA
// ============================================================

const BOOKS = [
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    filterGenres: ['Fiction', 'Dystopian'],
    rating: 5,
    desc: 'A chilling vision of a totalitarian society where Big Brother watches every move.',
    fullDesc: 'Winston Smith works for the Ministry of Truth rewriting history. In Airstrip One, the Party controls everything — even thought. Orwell\'s masterwork is a terrifying prophecy about surveillance, propaganda, and the death of truth.',
    quote: '"If you want to keep a secret, you must also hide it from yourself."',
    why: 'A book that feels more relevant every year — its ideas about power, truth, and resistance are impossible to forget.',
    img: 'https://i.postimg.cc/NMpSVXN5/61Hkdy-Bp-KOL-AC-UF1000-1000-QL80.jpg'
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    filterGenres: ['Romance', 'Classics'],
    rating: 5,
    desc: 'A witty and romantic classic exploring society, love, and first impressions.',
    fullDesc: 'Elizabeth Bennet navigates the pressures of 19th-century England as she contends with issues of manners, upbringing, morality, education, and marriage. Austen\'s sharpest and most beloved novel.',
    quote: '"It is a truth universally acknowledged..."',
    why: 'Readers love Austen\'s sparkling wit, the unforgettable characters, and a love story that feels timeless and true.',
    img: 'https://i.postimg.cc/qBtPnPdh/7134u8y-D1YL-UF1000-1000-QL80.jpg'
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    filterGenres: ['Fiction', 'Classics'],
    rating: 4,
    desc: 'A portrait of wealth, illusion, and broken dreams in the roaring twenties.',
    fullDesc: 'Narrated by Nick Carraway, this is the story of Jay Gatsby\'s obsessive quest to recapture a lost love across the glittering, hollow world of Long Island\'s elite. The definitive American novel.',
    quote: '"So we beat on, boats against the current, borne back ceaselessly into the past."',
    why: 'Its prose is so beautiful it hurts — a meditation on longing, class, and the impossibility of going back.',
    img: 'https://i.postimg.cc/fRNW8x7h/71YF1h-HLw7L.jpg'
  },
  {
    id: 4,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    filterGenres: ['Fiction', 'Classics'],
    rating: 5,
    desc: 'A powerful story of justice, morality, and empathy in the American South.',
    fullDesc: 'Scout Finch watches her father, lawyer Atticus Finch, defend a Black man unjustly accused of a crime in Depression-era Alabama. A landmark of American literature about conscience and compassion.',
    quote: '"You never really understand a person until you climb into their skin and walk around in it."',
    why: 'Atticus Finch is one of literature\'s greatest moral heroes. The book changed how millions of people think about justice.',
    img: 'https://i.postimg.cc/4N8w55Rg/Another-Book-cover-or-Poster-for-To-Kill-a-Mockingbird.jpg'
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    filterGenres: ['Fiction'],
    rating: 4,
    desc: 'A teenage voice like no other — raw, funny, and painfully honest.',
    fullDesc: 'Holden Caulfield wanders New York City after being expelled from prep school, railing against the phoniness of adult life. Salinger\'s voice is electric — restless, funny, and aching with loneliness.',
    quote: '"Don\'t ever tell anybody anything. If you do, you start missing everybody."',
    why: 'Every generation rediscovers Holden and finds themselves in his defiant, heartbroken narration.',
    img: 'https://i.postimg.cc/T2trM37N/Bookish-Literature.jpg'
  },
  {
    id: 6,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    genre: 'Gothic',
    filterGenres: ['Horror', 'Gothic'],
    rating: 4,
    desc: 'The original science fiction — about creation, ambition, and moral responsibility.',
    fullDesc: 'Victor Frankenstein creates life, then abandons his creation. The creature — intelligent, feeling, rejected — becomes a monster shaped by his maker\'s neglect. One of literature\'s most haunting allegories.',
    quote: '"Nothing is so painful to the human mind as a great and sudden change."',
    why: 'Written by a 19-year-old, it asks questions that haunt us still: Who bears responsibility for the beings we bring into the world?',
    img: 'https://i.pinimg.com/1200x/6d/df/b4/6ddfb43335137ffec54449ed6019b467.jpg'
  },
  {
    id: 7,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Philosophical',
    filterGenres: ['Fiction', 'Self Help'],
    rating: 4,
    desc: 'A lyrical fable about destiny, dreams, and listening to your heart.',
    fullDesc: 'A young Andalusian shepherd named Santiago journeys from Spain to the Egyptian desert in search of treasure. Coelho\'s beloved parable teaches that the journey itself is the destination.',
    quote: '"When you want something, all the universe conspires in helping you to achieve it."',
    why: 'Simple, warm, and quietly profound — The Alchemist has helped millions of readers find courage to pursue their Personal Legend.',
    img: 'https://i.postimg.cc/jSSf80Qp/Book.jpg'
  },
  {
    id: 8,
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    genre: 'Psychological',
    filterGenres: ['Fiction', 'Classics'],
    rating: 5,
    desc: 'A psychological masterpiece about guilt, morality, and the weight of sin.',
    fullDesc: 'Raskolnikov, a student in St. Petersburg, commits a murder he believes is philosophically justified. What follows is one of literature\'s most intense psychological explorations of conscience, suffering, and redemption.',
    quote: '"Pain and suffering are always inevitable for a large intelligence and a deep heart."',
    why: 'Dostoevsky\'s psychological depth is unmatched. The interior experience of guilt has never been rendered so completely.',
    img: 'https://i.postimg.cc/YC046NtH/Crime-And-Punishment-by-Fyodor-Dostoyevsky-Indigo-Chapters.jpg'
  },
  {
    id: 9,
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    genre: 'Gothic Romance',
    filterGenres: ['Romance', 'Gothic', 'Classics'],
    rating: 5,
    desc: 'A story of independence, passion, and a woman who refuses to compromise her soul.',
    fullDesc: 'An orphan governess navigates love, independence, and morality in Victorian England. Jane Eyre is one of literature\'s most fiercely individual heroines — her voice burns off the page.',
    quote: '"I am no bird; and no net ensnares me."',
    why: 'Jane is ahead of her time in every way. Her refusal to accept less than she deserves feels as radical and inspiring today as it ever did.',
    img: 'https://i.postimg.cc/kGZFbW4X/Jane-Eyre-(Charlotte-Bronte).jpg'
  },
  {
    id: 10,
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Tragedy',
    filterGenres: ['Fiction', 'Gothic', 'Classics'],
    rating: 4,
    desc: 'A wild, fierce love story set on the dark Yorkshire moors — passion and revenge.',
    fullDesc: 'Heathcliff and Catherine\'s doomed love burns across generations in this gothic tragedy. Emily Brontë\'s only novel is unlike anything else — raw, strange, and unforgettable.',
    quote: '"Whatever our souls are made of, his and mine are the same."',
    why: 'It rewrites what a love story can be — obsessive, destructive, utterly consuming. Nothing quite like it.',
    img: 'https://i.postimg.cc/j2JnBmxT/Wuthering-Heights-by-Emily-Bronte.jpg'
  },
  {
    id: 11,
    title: 'Little Women',
    author: 'Louisa May Alcott',
    genre: 'Family Fiction',
    filterGenres: ['Fiction', 'Classics'],
    rating: 4,
    desc: 'A warm, wise portrait of four sisters growing up, growing apart, and growing into themselves.',
    fullDesc: 'The March sisters — Meg, Jo, Beth, and Amy — navigate love, loss, ambition, and identity in Civil War-era New England. Jo March remains one of literature\'s most beloved heroines.',
    quote: '"I am not afraid of storms, for I am learning how to sail my ship."',
    why: 'Jo\'s fierce independence and creative ambition have inspired generations of women to claim their own stories.',
    img: 'https://i.postimg.cc/3xw0TkJV/Little-Women-Louisa-May-Alcott.jpg'
  },
  {
    id: 12,
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    genre: 'Gothic',
    filterGenres: ['Horror', 'Gothic', 'Classics'],
    rating: 4,
    desc: 'A dazzling, decadent fable about vanity, beauty, and the corruption of the soul.',
    fullDesc: 'A beautiful young man wishes that a portrait of him would age in his place. His wish is granted — and the portrait becomes the record of every sin. Wilde\'s only novel drips with wit and darkness.',
    quote: '"The only way to get rid of a temptation is to yield to it."',
    why: 'Wickedly quotable and morally complex — Wilde makes decadence feel both glamorous and genuinely terrifying.',
    img: 'https://i.postimg.cc/fyG3jChZ/download-(3).jpg'
  },
  {
    id: 13,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    filterGenres: ['Fiction', 'Dystopian'],
    rating: 4,
    desc: 'A future of pleasure and control — where happiness is engineered and freedom is extinct.',
    fullDesc: 'In the World State, people are bred in hatcheries, conditioned for their role, and kept content with soma. Huxley\'s vision of soft authoritarianism through comfort rather than fear feels increasingly prescient.',
    quote: '"One believes things because one has been conditioned to believe them."',
    why: 'More unsettling than 1984 in some ways — because the citizens of Brave New World are happy. That\'s the horror.',
    img: 'https://i.postimg.cc/YSd37vFj/download-(4).jpg'
  },
  {
    id: 14,
    title: 'The Bell Jar',
    author: 'Sylvia Plath',
    genre: 'Literary Fiction',
    filterGenres: ['Fiction'],
    rating: 5,
    desc: 'A raw, searingly honest account of mental illness, identity, and the search for self.',
    fullDesc: 'Esther Greenwood, a brilliant young woman in 1950s New York, begins to crack under the pressures of expectation. Plath\'s semi-autobiographical novel remains one of the most honest books about mental health ever written.',
    quote: '"I took a deep breath and listened to the old brag of my heart: I am, I am, I am."',
    why: 'Plath\'s prose is beautiful and devastating. For many readers, this book made them feel less alone for the first time.',
    img: 'https://i.postimg.cc/4dKzTBsm/download-(5).jpg'
  },
  {
    id: 15,
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    genre: 'Realist Fiction',
    filterGenres: ['Fiction', 'Classics', 'Romance'],
    rating: 5,
    desc: 'A monumental novel of love, society, and the cost of following your heart.',
    fullDesc: 'Anna Karenina abandons her husband for a passionate affair with the dashing Count Vronsky — with devastating consequences. Tolstoy\'s panoramic vision of 19th-century Russian life is without equal in world literature.',
    quote: '"All happy families are alike; each unhappy family is unhappy in its own way."',
    why: 'Simply one of the greatest novels ever written. The characters breathe; the world is alive; the tragedy is inevitable and heartbreaking.',
    img: 'https://i.postimg.cc/mrnHVCCs/download-(6).jpg'
  },
  {
    id: 16,
    title: 'The Stranger',
    author: 'Albert Camus',
    genre: 'Philosophical',
    filterGenres: ['Fiction', 'Philosophy'],
    rating: 4,
    desc: 'A slim existential masterpiece — detached, unsettling, and unforgettable.',
    fullDesc: 'Meursault, a French Algerian, commits an unmotivated murder and faces trial — not for the crime, but for his indifference. Camus\'s novel is a cool, devastating inquiry into absurdism and the human condition.',
    quote: '"I had only a little time left and I didn\'t want to waste it on God."',
    why: 'It provokes more thought per page than almost any book — and its ending is strangely liberating.',
    img: 'https://i.postimg.cc/wTkRZSLq/download-(7).jpg'
  },
  {
    id: 17,
    title: 'Sense and Sensibility',
    author: 'Jane Austen',
    genre: 'Romance',
    filterGenres: ['Romance', 'Classics'],
    rating: 4,
    desc: 'Two sisters, two approaches to love — a sharp and tender exploration of feeling and reason.',
    fullDesc: 'The Dashwood sisters, Elinor and Marianne, must navigate romantic disappointment and social expectation after being left near-penniless. Austen\'s first published novel is full of wit, warmth, and wisdom.',
    quote: '"Know your own happiness. You want nothing but patience — or give it a more fascinating name: call it hope."',
    why: 'Austen gives both sisters their due — neither sense nor sensibility wins outright, and that moral complexity is what makes the book so rewarding.',
    img: 'https://i.postimg.cc/C5gd6NKf/download-(8).jpg'
  },
  {
    id: 18,
    title: 'Dracula',
    author: 'Bram Stoker',
    genre: 'Horror',
    filterGenres: ['Horror', 'Gothic'],
    rating: 4,
    desc: 'The vampire that started it all — eerie, suspenseful, and surprisingly compelling.',
    fullDesc: 'Jonathan Harker travels to Transylvania to assist a nobleman — and discovers Count Dracula intends to move to England to find new blood. Stoker\'s epistolary gothic horror remains the definitive vampire novel.',
    quote: '"There are darknesses in life and there are lights, and you are one of the lights."',
    why: 'More atmospheric and psychologically rich than most people expect. The dread builds slowly and pays off completely.',
    img: 'https://i.postimg.cc/BvP6SyLp/download-(9).jpg'
  },
  {
    id: 19,
    title: 'Great Expectations',
    author: 'Charles Dickens',
    genre: 'Bildungsroman',
    filterGenres: ['Fiction', 'Classics'],
    rating: 4,
    desc: 'A young orphan\'s journey from poverty to ambition — and hard-won wisdom.',
    fullDesc: 'Pip grows up in the marshes of Kent, dreaming of becoming a gentleman. When a mysterious benefactor funds his education, he enters London society — and slowly learns what truly matters. Dickens at his most humane.',
    quote: '"I loved her against reason, against promise, against peace, against hope, against happiness."',
    why: 'Miss Havisham, Magwitch, Estella — few novels have given us such a gallery of unforgettable characters.',
    img: 'https://i.postimg.cc/nVGLhqrz/download-(10).jpg'
  },
  {
    id: 20,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    genre: 'Historical',
    filterGenres: ['Fiction', 'Classics'],
    rating: 5,
    desc: 'An epic of justice, redemption, and the power of human kindness.',
    fullDesc: 'Jean Valjean, paroled after 19 years for stealing bread, tries to rebuild his life — pursued relentlessly by Inspector Javert. Hugo\'s vast, passionate novel encompasses the French Revolution and the full range of human experience.',
    quote: '"Even the darkest night will end and the sun will rise."',
    why: 'Impossible to read without being moved. Its faith in human goodness — against all evidence — is both naive and magnificent.',
    img: 'https://i.postimg.cc/Y2RpHkDM/download-(11).jpg'
  },
  {
    id: 21,
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    genre: 'Magical Realism',
    filterGenres: ['Fiction', 'Fantasy'],
    rating: 5,
    desc: 'Seven generations of the Buendía family — myth, history, and magic woven together.',
    fullDesc: 'The founding and fall of the mythical town of Macondo, told through the Buendía family over a century. García Márquez blends the supernatural with the mundane in a way that feels completely natural and utterly hypnotic.',
    quote: '"A person doesn\'t die when he should but when he can."',
    why: 'An experience unlike any other in literature. After reading it, the world itself feels slightly magical.',
    img: 'https://i.postimg.cc/x1wQRd8W/download-(12).jpg'
  },
  {
    id: 22,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    genre: 'Dystopian',
    filterGenres: ['Fiction', 'Dystopian'],
    rating: 4,
    desc: 'In a world where books are burned, one fireman starts to read.',
    fullDesc: 'Guy Montag is a fireman whose job is to burn books in a future America that has embraced mindless entertainment. When he starts to read, everything changes. Bradbury\'s lyrical prose makes this the most poetic of dystopian novels.',
    quote: '"There must be something in books, something we can\'t imagine, to make a woman stay in a burning house."',
    why: 'For book lovers, it\'s personal. And its warning about distraction culture grows more urgent every year.',
    img: 'https://i.postimg.cc/J7pWFxt0/download-(13).jpg'
  },
  {
    id: 23,
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    genre: 'Absurdist',
    filterGenres: ['Fiction', 'Philosophy'],
    rating: 4,
    desc: 'Gregor Samsa wakes up as a giant insect — and the family adjusts.',
    fullDesc: 'One morning, traveling salesman Gregor Samsa wakes to find himself transformed into a monstrous vermin. His family\'s reaction is the real horror. Kafka\'s short masterpiece is a perfect allegory for alienation, family duty, and the fear of being a burden.',
    quote: '"I cannot make you understand. I cannot make anyone understand what is happening inside me."',
    why: 'Kafka makes the absurd feel inevitable and the ordinary feel monstrous — a rare, uncomfortable magic.',
    img: 'https://i.postimg.cc/NMQWJ2c2/download.png'
  },
  {
    id: 24,
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    genre: 'Tragedy',
    filterGenres: ['Fiction', 'Classics'],
    rating: 4,
    desc: 'A brief, devastating story of friendship and the American dream\'s cruelty.',
    fullDesc: 'George and Lennie, itinerant ranch workers in Depression-era California, dream of owning their own land. Steinbeck\'s novella is spare and gut-wrenching — a perfect tragedy in under 200 pages.',
    quote: '"A guy needs somebody — to be near him. A guy goes nuts if he ain\'t got nobody."',
    why: 'Steinbeck shows how tenderness and tragedy can live in the same breath. Few endings in literature hit harder.',
    img: 'https://i.postimg.cc/t4Pw9NRY/download-(14).jpg'
  },
  {
    id: 25,
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
    genre: 'Literary',
    filterGenres: ['Fiction', 'Classics'],
    rating: 4,
    desc: 'An old fisherman battles a great marlin — and his own limits.',
    fullDesc: 'Santiago, an aging Cuban fisherman, ventures far out to sea and hooks a magnificent marlin. Over three days, a lone battle of endurance and will unfolds. Hemingway\'s spare prose is at its most powerful here.',
    quote: '"A man can be destroyed but not defeated."',
    why: 'It\'s really about old age, dignity, and what it means to keep going when the world no longer recognises your greatness.',
    img: 'https://i.postimg.cc/MHv3Nyr5/download-(15).jpg'
  }
];

// ============================================================
// QUOTES
// ============================================================

const QUOTES = [
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "Reading is essential for those who seek to rise above the ordinary.", author: "Jim Rohn" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
  { text: "Reading is to the mind what exercise is to the body.", author: "Joseph Addison" },
  { text: "Literature is the most agreeable way of ignoring life.", author: "Fernando Pessoa" },
  { text: "In the case of good books, the point is not to see how many of them you can get through, but rather how many can get through to you.", author: "David McCullough" },
  { text: "A library is not a luxury but one of the necessities of life.", author: "Henry Ward Beecher" },
  { text: "Words are, of course, the most powerful drug used by mankind.", author: "Rudyard Kipling" },
  { text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
  { text: "Books are mirrors: you only see in them what you already have inside you.", author: "Carlos Ruiz Zafón" },
  { text: "The reading of all good books is like a conversation with the finest minds of past centuries.", author: "René Descartes" },
  { text: "Outside of a dog, a book is man's best friend. Inside of a dog it's too dark to read.", author: "Groucho Marx" },
  { text: "Literature is my Utopia. Here I am not disenfranchised.", author: "Helen Keller" },
  { text: "To learn to read is to light a fire; every syllable that is spelled out is a spark.", author: "Victor Hugo" },
  { text: "A book is a garden, an orchard, a storehouse, a party, a company by the way, a counsellor, a multitude of counsellors.", author: "Henry Ward Beecher" },
  { text: "We read to know we're not alone.", author: "C.S. Lewis" },
  { text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.", author: "Haruki Murakami" },
  { text: "One must always be careful of books, and what is inside them, for words have the power to change us.", author: "Cassandra Clare" },
  { text: "The best books are the ones that tell you what you already know.", author: "George Orwell" },
  { text: "Reading is dreaming with open eyes.", author: "Yolanda Nava" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" }
];

let quoteIndex = 0;

function starsHTML(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function renderQuote(index) {
  const container = document.getElementById('quote-container');
  const textEl = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  if (!container || !textEl || !authorEl) return;

  container.style.opacity = '0';
  container.style.transform = 'scale(0.96)';

  setTimeout(() => {
    const q = QUOTES[index];
    textEl.textContent = `"${q.text}"`;
    authorEl.textContent = `— ${q.author}`;
    container.style.opacity = '1';
    container.style.transform = 'scale(1)';
  }, 300);
}

function initQuotes() {
  const container = document.getElementById('quote-container');
  if (!container) return;

  // Smooth transition style
  container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  quoteIndex = Math.floor(Math.random() * QUOTES.length);
  renderQuote(quoteIndex);

  const prevBtn  = document.getElementById('prev-quote-btn');
  const nextBtn  = document.getElementById('next-quote-btn');
  const randBtn  = document.getElementById('new-quote-btn');
  const copyBtn  = document.getElementById('copy-quote-btn');
  const shareBtn = document.getElementById('share-quote-btn');

  if (prevBtn) prevBtn.addEventListener('click', () => {
    quoteIndex = (quoteIndex - 1 + QUOTES.length) % QUOTES.length;
    renderQuote(quoteIndex);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % QUOTES.length;
    renderQuote(quoteIndex);
  });

  if (randBtn) randBtn.addEventListener('click', () => {
    let r;
    do { r = Math.floor(Math.random() * QUOTES.length); } while (r === quoteIndex);
    quoteIndex = r;
    renderQuote(quoteIndex);
  });

  if (copyBtn) copyBtn.addEventListener('click', () => {
    const q = QUOTES[quoteIndex];
    const text = `"${q.text}" — ${q.author}`;
    navigator.clipboard.writeText(text)
      .then(() => showToast('Quote copied to clipboard!'))
      .catch(() => showToast('Could not copy — try manually'));
  });

  if (shareBtn) shareBtn.addEventListener('click', () => {
    const q = QUOTES[quoteIndex];
    const text = `"${q.text}" — ${q.author}`;
    if (navigator.share) {
      navigator.share({ title: 'The Lit Library', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text)
        .then(() => showToast('Quote copied to share!'))
        .catch(() => showToast('Sharing not supported on this browser'));
    }
  });
}

// ============================================================
// DARK MODE
// ============================================================

function applyDarkMode(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
  btn && (btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode'));
}

function initDarkMode() {
  const btn = document.getElementById('dark-toggle');
  if (!btn) return;

  const saved = lsGet('litlibrary-dark');
  applyDarkMode(!!saved);

  btn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDarkMode(isDark);
    lsSet('litlibrary-dark', isDark ? true : null);
    if (!isDark) localStorage.removeItem('litlibrary-dark');
  });
}

// ============================================================
// NAVIGATION — hamburger, scroll, active link, sticky
// ============================================================

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky nav shrink on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));
}

// ============================================================
// BACK TO TOP BUTTON
// ============================================================

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  const footerBtn = document.getElementById('footer-scroll-top');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (btn) btn.addEventListener('click', scrollToTop);
  if (footerBtn) footerBtn.addEventListener('click', scrollToTop);

  window.addEventListener('scroll', () => {
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ============================================================
// READING LIST (Local Storage)
// ============================================================

let readingList = lsGet('litlibrary-rl') || [];

function saveReadingList() {
  lsSet('litlibrary-rl', readingList);
}

function isInReadingList(id) {
  return readingList.some(b => b.id === id);
}

function addToReadingList(book) {
  if (!isInReadingList(book.id)) {
    readingList.push({ id: book.id, title: book.title, author: book.author, img: book.img });
    saveReadingList();
    updateRLUI();
    showToast(`"${book.title}" added to your reading list!`);
  } else {
    removeFromReadingList(book.id);
  }
}

function removeFromReadingList(id) {
  const book = readingList.find(b => b.id === id);
  readingList = readingList.filter(b => b.id !== id);
  saveReadingList();
  updateRLUI();
  if (book) showToast(`"${book.title}" removed from reading list`);
  // Update card button if on books page
  updateBookCardRLButton(id);
}

function updateBookCardRLButton(id) {
  const btn = document.querySelector(`.add-rl-btn[data-id="${id}"]`);
  if (btn) {
    const inList = isInReadingList(id);
    btn.textContent = inList ? '✓ Listed' : '+ List';
    btn.classList.toggle('in-list', inList);
  }
}

function updateRLUI() {
  const listEl  = document.getElementById('rl-list');
  const countEl = document.getElementById('rl-count');

  if (countEl) {
    countEl.textContent = readingList.length;
    countEl.style.display = readingList.length > 0 ? 'flex' : 'none';
  }

  if (!listEl) return;

  if (readingList.length === 0) {
    listEl.innerHTML = '<p class="rl-empty">No books added yet. Click "+ List" on any card!</p>';
    return;
  }

  listEl.innerHTML = readingList.map(b => `
    <div class="reading-list-item">
      <img src="${b.img}" alt="${b.title}" loading="lazy">
      <div class="rl-item-info">
        <strong>${b.title}</strong>
        <span>${b.author}</span>
      </div>
      <button class="rl-remove" data-id="${b.id}" aria-label="Remove ${b.title} from reading list">✕</button>
    </div>
  `).join('');

  listEl.querySelectorAll('.rl-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromReadingList(Number(btn.dataset.id)));
  });
}

function initReadingListPanel() {
  const toggleBtn = document.getElementById('rl-toggle-btn');
  const panel     = document.getElementById('reading-list-panel');
  const closeBtn  = document.getElementById('rl-close');

  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('open');
    });
  }

  if (closeBtn && panel) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
    });
  }

  updateRLUI();
}

// ============================================================
// FAVORITES (Local Storage)
// ============================================================

let favorites = lsGet('litlibrary-favs') || [];

function saveFavorites() {
  lsSet('litlibrary-favs', favorites);
}

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id, title) {
  if (isFavorite(id)) {
    favorites = favorites.filter(f => f !== id);
    saveFavorites();
    showToast(`Removed "${title}" from favorites`);
  } else {
    favorites.push(id);
    saveFavorites();
    showToast(`❤️ "${title}" added to favorites!`);
  }
  // Update heart icon on card
  const heartBtn = document.querySelector(`.heart-btn[data-id="${id}"]`);
  if (heartBtn) {
    heartBtn.classList.toggle('favorited', isFavorite(id));
    heartBtn.textContent = isFavorite(id) ? '♥' : '♡';
    heartBtn.setAttribute('aria-label', isFavorite(id) ? `Remove ${title} from favorites` : `Add ${title} to favorites`);
  }
  // Update modal button if open
  const modalFavBtn = document.getElementById('modal-fav-btn');
  if (modalFavBtn && Number(modalFavBtn.dataset.id) === id) {
    updateModalFavBtn(id, title);
  }
}

function updateModalFavBtn(id, title) {
  const btn = document.getElementById('modal-fav-btn');
  if (!btn) return;
  btn.dataset.id = id;
  const fav = isFavorite(id);
  btn.textContent = fav ? '♥ Favorited' : '♡ Favorite';
  btn.style.background = fav ? '#c0392b' : '';
}

// ============================================================
// BOOK MODAL
// ============================================================

function openModal(book) {
  const overlay = document.getElementById('book-modal');
  if (!overlay) return;

  document.getElementById('modal-cover').src    = book.img;
  document.getElementById('modal-cover').alt    = `Cover of ${book.title}`;
  document.getElementById('modal-title').textContent  = book.title;
  document.getElementById('modal-author').textContent = book.author;
  document.getElementById('modal-genre').textContent  = book.genre;
  document.getElementById('modal-stars').textContent  = starsHTML(book.rating);
  document.getElementById('modal-stars').setAttribute('aria-label', `Rating: ${book.rating} out of 5`);
  document.getElementById('modal-desc').textContent   = book.fullDesc;
  document.getElementById('modal-quote').textContent  = book.quote;
  document.getElementById('modal-why').textContent    = book.why;

  // Reading list button
  const rlBtn = document.getElementById('modal-rl-btn');
  if (rlBtn) {
    rlBtn.dataset.id = book.id;
    rlBtn.textContent = isInReadingList(book.id) ? '✓ In Reading List' : '+ Reading List';
    rlBtn.onclick = () => {
      addToReadingList(book);
      rlBtn.textContent = isInReadingList(book.id) ? '✓ In Reading List' : '+ Reading List';
    };
  }

  // Favorites button
  updateModalFavBtn(book.id, book.title);
  const modalFavBtn = document.getElementById('modal-fav-btn');
  if (modalFavBtn) {
    modalFavBtn.onclick = () => {
      toggleFavorite(book.id, book.title);
      updateModalFavBtn(book.id, book.title);
    };
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus management
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeModal() {
  const overlay = document.getElementById('book-modal');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModal() {
  const overlay = document.getElementById('book-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay) return;

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ============================================================
// BOOKS PAGE — render, search, filter
// ============================================================

let activeFilter = 'all';
let searchQuery  = '';

function renderBooks() {
  const grid = document.getElementById('books-grid');
  const noResults = document.getElementById('no-results');
  if (!grid) return;

  const q = searchQuery.trim().toLowerCase();

  const filtered = BOOKS.filter(book => {
    const matchesFilter = activeFilter === 'all' || book.filterGenres.includes(activeFilter);
    const matchesSearch = !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q) ||
      book.filterGenres.some(g => g.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  if (noResults) noResults.style.display = filtered.length === 0 ? 'block' : 'none';

  grid.innerHTML = filtered.map(book => `
    <article class="book-card" data-id="${book.id}" tabindex="0" role="button" aria-label="${book.title} by ${book.author}">
      <!-- Favorite heart -->
      <button
        class="heart-btn ${isFavorite(book.id) ? 'favorited' : ''}"
        data-id="${book.id}"
        aria-label="${isFavorite(book.id) ? 'Remove from favorites' : 'Add to favorites'}: ${book.title}"
        title="${isFavorite(book.id) ? 'Remove from favorites' : 'Add to favorites'}"
      >${isFavorite(book.id) ? '♥' : '♡'}</button>

      <img src="${book.img}" alt="Cover of ${book.title}" loading="lazy">

      <div class="book-card-three">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <div class="card-stars" aria-label="Rating: ${book.rating} out of 5">${starsHTML(book.rating)}</div>
        <span class="genre">${book.genre}</span>
        <p class="desc">${book.desc}</p>
        <div class="card-actions">
          <button class="read-more-btn" data-id="${book.id}" aria-label="Read more about ${book.title}">Read More</button>
          <button
            class="add-rl-btn ${isInReadingList(book.id) ? 'in-list' : ''}"
            data-id="${book.id}"
            aria-label="${isInReadingList(book.id) ? 'Remove from reading list' : 'Add to reading list'}: ${book.title}"
          >${isInReadingList(book.id) ? '✓ Listed' : '+ List'}</button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach events to newly rendered cards
  grid.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const book = BOOKS.find(b => b.id === Number(btn.dataset.id));
      if (book) openModal(book);
    });
  });

  grid.querySelectorAll('.add-rl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const book = BOOKS.find(b => b.id === Number(btn.dataset.id));
      if (book) {
        addToReadingList(book);
        btn.textContent = isInReadingList(book.id) ? '✓ Listed' : '+ List';
        btn.classList.toggle('in-list', isInReadingList(book.id));
      }
    });
  });

  grid.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const book = BOOKS.find(b => b.id === Number(btn.dataset.id));
      if (book) toggleFavorite(book.id, book.title);
    });
  });

  // Card click → modal
  grid.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if a button inside was clicked
      if (e.target.closest('button')) return;
      const book = BOOKS.find(b => b.id === Number(card.dataset.id));
      if (book) openModal(book);
    });
    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const book = BOOKS.find(b => b.id === Number(card.dataset.id));
        if (book) openModal(book);
      }
    });
  });
}

function initBooksPage() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  renderBooks();

  // Search input
  const searchInput = document.getElementById('book-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      renderBooks();
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderBooks();
    });
  });
}

// ============================================================
// CONTACT FORM
// ============================================================

function initContactForm() {
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea');

  // Focus/blur styling
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--golden)';
      input.style.boxShadow = '0 0 0 3px rgba(184,139,74,0.12)';
    });
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        input.style.borderColor = '#d4c0a4';
        input.style.boxShadow = 'none';
      } else {
        input.style.borderColor = 'var(--golden)';
      }
    });
    // Clear error border on typing
    input.addEventListener('input', () => {
      if (input.style.borderColor === '#e74c3c' || input.style.borderColor === 'rgb(231, 76, 60)') {
        input.style.borderColor = 'var(--golden)';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide previous messages
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg)   errorMsg.style.display   = 'none';

    // Validate required fields
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.12)';
        valid = false;
      }
    });

    // Email format check
    const emailInput = form.querySelector('[type="email"]');
    if (emailInput && emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailInput.style.borderColor = '#e74c3c';
      valid = false;
    }

    if (!valid) {
      if (errorMsg) {
        errorMsg.style.display = 'block';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Success
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.reset();
    inputs.forEach(input => {
      input.style.borderColor = '#d4c0a4';
      input.style.boxShadow = 'none';
    });

    // Auto-hide success message
    setTimeout(() => {
      if (successMsg) successMsg.style.display = 'none';
    }, 6000);
  });
}

// ============================================================
// FAQ ACCORDION
// ============================================================

function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

// ============================================================
// LAZY LOAD IMAGES
// ============================================================

function initLazyLoad() {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// INIT — run everything on DOMContentLoaded
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNav();
  initReadingListPanel();
  initScrollAnimations();
  initBackToTop();
  initQuotes();
  initBooksPage();
  initModal();
  initContactForm();
  initFAQ();
  initLazyLoad();
  initSmoothScroll();

  console.log('✓ The Lit Library — loaded successfully');
});
