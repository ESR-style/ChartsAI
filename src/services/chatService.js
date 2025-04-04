// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const chatService = {
  async getAllThreads() {
    const response = await fetch(`${API_BASE_URL}/threads/`);
    if (!response.ok) throw new Error('Failed to fetch threads');
    return await response.json();
  },

  async createThread(title) {
    const response = await fetch(`${API_BASE_URL}/threads/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
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
      `${API_BASE_URL}/threads/${threadId}/messages/`,
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify({ content, sender })
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send message');
    }
    
    const [userMessage, aiResponse] = await response.json();
    
    // Handle additional AI response data
    if (aiResponse.analysis_results) {
      // Process analysis results
      console.log('Analysis:', aiResponse.analysis_results);
    }
    
    if (aiResponse.charts_data) {
      // Process chart data
      console.log('Chart data:', aiResponse.charts_data);
    }
    
    return [userMessage, aiResponse];
  },

  async deleteThread(threadId) {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete thread');
    return await response.json();
  }
};
