import { useQuery } from '@tanstack/vue-query';
import { Document } from '../interfaces/document';
import { innClodApi } from 'src/api/innClodApi';

const getDocuments = async (): Promise<Document> => {
  const access_token = localStorage.getItem('access_token');
  const { data } = await innClodApi.get<Document>('/documentos', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

const useDocuments = () => {
  const documentsQuery = useQuery(['documents'], getDocuments);

  return {
    documentsQuery,
  };
};

export default useDocuments;
