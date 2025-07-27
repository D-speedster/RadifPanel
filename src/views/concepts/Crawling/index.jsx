import React, { useState } from 'react';
import { Input, Button, Card, Typography, Space, Spin, message } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const Crawling = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCrawl = async () => {
    if (!url) {
      message.error('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post('/api/crawl', { url });
      setResults(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred while crawling');
      message.error('Failed to crawl the website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Web Crawler</Title>
      
      <Card style={{ marginBottom: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text>Enter the URL you want to crawl:</Text>
          <Space.Compact style={{ width: '100%' }}>
            <Input 
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <Button 
              type="primary"
              onClick={handleCrawl}
              loading={loading}
            >
              Crawl
            </Button>
          </Space.Compact>
        </Space>
      </Card>

      {loading && (
        <div style={{ textAlign: 'center', margin: '24px' }}>
          <Spin size="large" />
          <Text style={{ display: 'block', marginTop: '12px' }}>
            Crawling in progress...
          </Text>
        </div>
      )}

      {error && (
        <Card style={{ marginTop: '24px', backgroundColor: '#fff2f0' }}>
          <Text type="danger">{error}</Text>
        </Card>
      )}

      {results && (
        <Card title="Crawling Results" style={{ marginTop: '24px' }}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default Crawling;
