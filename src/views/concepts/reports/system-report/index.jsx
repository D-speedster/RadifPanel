import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const SystemReport = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: t('Date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('Event Type'),
      dataIndex: 'eventType',
      key: 'eventType',
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('User'),
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: t('Actions'),
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            {t('View Details')}
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchSystemReports();
  }, []);

  const fetchSystemReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/system-reports');
      setData(response.data);
    } catch (error) {
      message.error(t('Failed to fetch system reports'));
      console.error('Error fetching system reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    // Handle viewing detailed report
    console.log('View details for record:', record);
  };

  return (
    <Card title={t('System Reports')} className="system-report-card">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => t('Total {{total}} items', { total }),
        }}
      />
    </Card>
  );
};

export default SystemReport;
