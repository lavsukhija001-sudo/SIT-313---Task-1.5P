
import { useState } from 'react';

function Post() {
  const [type, setType] = useState('question');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    if (type === 'article' && !abstract.trim()) {
      alert('Please enter an abstract.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tags.length > 3) {
      alert('You can enter a maximum of 3 tags.');
      return;
    }

    alert('Form validated successfully!');
  }

  return (
    <main className="post-page">
      <h1>New Post</h1>

      <h3>Select Post Type:</h3>

      <div className="post-type-selection">
        <label>
          <input
            type="radio"
            name="postType"
            value="question"
            checked={type === 'question'}
            onChange={() => setType('question')}
          />
          Question
        </label>

        <label>
          <input
            type="radio"
            name="postType"
            value="article"
            checked={type === 'article'}
            onChange={() => setType('article')}
          />
          Article
        </label>
      </div>

      <h2>What do you want to ask or share</h2>

      <form onSubmit={handleSubmit}>
        <h3>
          {type === 'question'
            ? 'Ask a Question'
            : 'Write an Article'}
        </h3>

        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={
            type === 'question'
              ? 'Start your question with how, what, why, etc.'
              : 'Enter a descriptive title'
          }
        />

        {type === 'article' && (
          <>
            <label htmlFor="article-abstract">
              Abstract
            </label>

            <textarea
              id="article-abstract"
              rows={3}
              value={abstract}
              onChange={(event) => setAbstract(event.target.value)}
              placeholder="Enter a 1-paragraph abstract"
            />
          </>
        )}

        <label htmlFor="post-content">
          {type === 'question'
            ? 'Describe your problem'
            : 'Article Text'}
        </label>

        <textarea
          id="post-content"
          rows={type === 'question' ? 6 : 9}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={
            type === 'question'
              ? 'Describe your question in detail'
              : 'Write your article here'
          }
        />

        <label htmlFor="post-tags">Tags</label>
        <input
          id="post-tags"
          type="text"
          value={tagsInput}
          onChange={(event) => setTagsInput(event.target.value)}
          placeholder="React, JavaScript, CSS"
        />

        <small>Enter up to 3 tags, separated by commas.</small>

        <button type="submit">
          Post
        </button>
      </form>
    </main>
  );
}

export default Post;

