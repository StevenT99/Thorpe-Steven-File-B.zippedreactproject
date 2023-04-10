import { useState } from 'react';
import data from './book-of-mormon.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const books = data.books;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateOptions(correctReference) {
  const options = new Set();
  options.add(correctReference);
  while (options.size < 5) {
    const randomBook = books[getRandomInt(books.length)];
    const randomChapter =
      randomBook.chapters[getRandomInt(randomBook.chapters.length)];
    const randomVerse =
      randomChapter.verses[getRandomInt(randomChapter.verses.length)];
    options.add(randomVerse.reference);
  }
  return Array.from(options);
}

function Movie() {
  const [inputVerse, setInputVerse] = useState('');
  const [reference, setReference] = useState('');
  const [currentVerse, setCurrentVerse] = useState({
    reference: '',
    text: '',
  });
  const [referenceOptions, setReferenceOptions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  const handleInput = (event) => {
    setInputVerse(event.target.value);
  };

  const handleReferenceSelect = (event) => {
    setReference(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      inputVerse === currentVerse.text &&
      reference === currentVerse.reference
    ) {
      alert('Good job!');
      setCorrectCount(correctCount + 1);
    } else {
      alert(
        `Incorrect. The correct verse is "${currentVerse.text}" and the correct reference is ${currentVerse.reference}.`,
      );
      setCorrectCount(0);
    }
    setInputVerse('');
    setReference('');
    generateNewVerse();
  };

  const generateNewVerse = () => {
    const randomBook = books[getRandomInt(books.length)];
    const randomChapter =
      randomBook.chapters[getRandomInt(randomBook.chapters.length)];
    const randomVerse =
      randomChapter.verses[getRandomInt(randomChapter.verses.length)];
    setCurrentVerse({
      reference: randomVerse.reference,
      text: randomVerse.text,
    });
    setReferenceOptions(generateOptions(randomVerse.reference));
  };

  if (!currentVerse.text) {
    generateNewVerse();
  }
  return (
    <div style={{ backgroundColor: 'white', padding: '30px' }}>
      <div className="container">
        <h3 style={{ fontSize: '2rem' }}>
          Book of Mormon Verse Memorization Tool
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Please write the following verse word for word:
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          {currentVerse.text}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <textarea
              className="form-control"
              value={inputVerse}
              onChange={handleInput}
              style={{ fontSize: '1.2rem' }}
              placeholder="Enter verse"
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Choose the reference:</label>
            <select
              className="form-control"
              value={reference}
              onChange={handleReferenceSelect}
            >
              <option value="">Select reference</option>
              {referenceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p style={{ marginTop: '20px' }}>
          Total correct in a row: {correctCount}
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => {
            generateNewVerse();
            setCorrectCount(0);
          }}
        >
          Try another verse
        </button>
      </div>
    </div>
  );
}

export default Movie;
