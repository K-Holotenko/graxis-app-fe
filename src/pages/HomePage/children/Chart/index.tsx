import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

import { getAllPublications } from 'src/services/PublicationService';
import { theme } from 'src/config/theme';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

import { convertFirestoreTimestampToDate } from './utils';

export interface DataPoint {
  date: string;
  publicationNumber: number;
}

export const Chart = () => {
  const [publications, setPublications] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { openNotification } = useNotification();

  useEffect(() => {
    getAllPublications()
      .then((data) => {
        const formattedData = convertFirestoreTimestampToDate(data);

        setPublications(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        openNotification(
          NotificationType.ERROR,
          error.message,
          'Не вдалося отримати дані'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <h1 style={{ textAlign: 'center', color: theme.primary }}>
        Завантаження...
      </h1>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={publications}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: 'Кількість публікацій',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          strokeWidth={3}
          type="monotone"
          dataKey="publicationNumber"
          stroke={theme.primary}
          name="Кількість створених публікаці на день"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
