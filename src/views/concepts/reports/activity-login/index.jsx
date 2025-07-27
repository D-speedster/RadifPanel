import React, { useState, useEffect } from 'react';
import { Card, Table, Space, DatePicker } from 'antd';
import axios from 'axios';

const UserActivityReport = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    }
  ];

  const fetchActivities = async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user-activities', {
        params: { startDate, endDate }
      });
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching user activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates) {
      fetchActivities(dates[0].toISOString(), dates[1].toISOString());
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Card title="User Activity Report">
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <DatePicker.RangePicker
          onChange={handleDateRangeChange}
          value={dateRange}
        />
        <Table
          columns={columns}
          dataSource={activities}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} records`,
          }}
        />
      </Space>
    </Card>
  );
};

export default UserActivityReport;
