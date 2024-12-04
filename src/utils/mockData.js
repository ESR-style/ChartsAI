export const mockChats = [
  {
    id: 1,
    title: 'Sales Analysis',
    messages: [
      { id: 1, role: 'user', content: 'Show me sales trends for 2023' },
      { 
        id: 2, 
        role: 'assistant', 
        content: `Based on the 2023 sales data analysis:\n\n1. Overall Performance:\n   - Total Revenue: $6.6M\n   - Growth: 15% YoY\n\n2. Quarterly Breakdown:\n   - Q1: $1.2M (↑20%)\n   - Q2: $1.5M (↑15%)\n   - Q3: $1.8M (↑12%)\n   - Q4: $2.1M (↑13%)\n\n3. Key Growth Sectors:\n   - Technology: 25%\n   - Healthcare: 18%\n   - Retail: 12%\n\nWould you like to see these trends visualized in a chart?`
      }
    ]
  },
  {
    id: 2,
    title: 'Revenue Forecast',
    messages: [
      { id: 1, role: 'user', content: 'Predict revenue for Q4' },
      { 
        id: 2, 
        role: 'assistant', 
        content: `Based on historical data and current trends:\n\n1. Q4 Forecast:\n   - Predicted Revenue: $2.3M\n   - Growth Rate: 15-18%\n\n2. Key Factors:\n   - Seasonal uplift: +8%\n   - Market expansion: +5%\n   - New product lines: +4%\n\n3. Confidence Level: 85%\n\nWould you like to see the forecast visualization?`
      }
    ]
  }
];