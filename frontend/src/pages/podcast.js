import React, { useState, useEffect } from 'react';
import { Card, Button, Form, ListGroup } from 'react-bootstrap';

const Podcast = () => {
  const [entries, setEntries] = useState([]);
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
    calculateStreak(storedEntries);
  }, []);

  const calculateStreak = (storedEntries) => {
    if (storedEntries.length > 0) {
      const sortedDates = storedEntries
        .map((entry) => new Date(entry.date))
        .sort((a, b) => b - a);
      let streakCount = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const dayDifference =
          (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);
        if (dayDifference === 1) {
          streakCount++;
        } else {
          break;
        }
      }
      setStreak(streakCount);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toISOString(),
      topic,
      notes,
    };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    calculateStreak(updatedEntries);
    setTopic('');
    setNotes('');
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleDelete = (indexToDelete) => {
    const updatedEntries = entries.filter(
      (_, index) => index !== indexToDelete,
    );
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    calculateStreak(updatedEntries);
  };

  const handleEdit = (indexToEdit) => {
    const entryToEdit = entries[indexToEdit];
    setTopic(entryToEdit.topic);
    setNotes(entryToEdit.notes);
    handleDelete(indexToEdit);
  };
  return (
    <Card>
      <Card.Header as="h5">Study Journal</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="topic">
            <Form.Label>Topic Studied</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={handleTopicChange}
            />
          </Form.Group>
          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={handleNotesChange}
              placeholder="Enter your notes"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <Card.Text className="mt-3">
          <strong>Stats:</strong>
          <br />
          Days in a row studied: {streak}
          <br />
          Total study times: {entries.length}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ListGroup variant="flush">
          {entries.map((entry, index) => (
            <ListGroup.Item key={index}>
              <strong>{new Date(entry.date).toLocaleDateString()}</strong>
              <br />
              Topic: {entry.topic}
              <br />
              Notes: {entry.notes}
              <br />
              <Button
                variant="primary"
                onClick={() => handleEdit(index)}
                className="mr-2"
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Footer>
    </Card>
  );
};

export default Podcast;
