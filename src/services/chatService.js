const API_BASE_URL = 'http://localhost:8000';

export const chatService = {
  async getAllThreads() {
    const response = await fetch(`${API_BASE_URL}/threads/`);
    if (!response.ok) throw new Error('Failed to fetch threads');
    return await response.json();
  },

  async createThread(title) {
    const response = await fetch(`${API_BASE_URL}/threads/?title=${encodeURIComponent(title)}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to create thread');
    return await response.json();
  },

  async getThreadMessages(threadId) {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}/messages/`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return await response.json();
  },

  async sendMessage(threadId, content, sender) {
    const response = await fetch(
      `${API_BASE_URL}/threads/${threadId}/messages/?content=${encodeURIComponent(content)}&sender=${encodeURIComponent(sender)}`,
      { method: 'POST' }
    );
    if (!response.ok) throw new Error('Failed to send message');
    return await response.json(); // This will now return [userMessage, aiResponse]
  },

  async deleteThread(threadId) {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete thread');
    return await response.json();
  }
};
