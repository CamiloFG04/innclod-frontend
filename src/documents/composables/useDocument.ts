import { useQuery } from '@tanstack/vue-query';
import { Document, Documento } from '../interfaces/document';
import { innClodApi } from 'src/api/innClodApi';

const getDocument = async (id: number): Promise<Documento> => {
  const access_token = localStorage.getItem('access_token');
  const { data } = await innClodApi.get<Documento>(`/documentos/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data.data;
};

const useDocument = (id: number) => {
  const documentQuery = useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocument(id),
    staleTime: 1000 * 60,
  });

  return {
    documentQuery,
  };
};

export default useDocument;
