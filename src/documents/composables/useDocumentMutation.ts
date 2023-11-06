import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { innClodApi } from '../../api/innClodApi';
import { Documento } from '../interfaces/document';

interface ArgsCreate {
  DOC_NOMBRE: string;
  DOC_CONTENIDO: string;
  DOC_ID_TIPO: number | undefined;
  DOC_ID_PROCESO: number | undefined;
}

interface ArgsEdit {
  DOC_ID: number | undefined;
  DOC_NOMBRE?: string;
  DOC_CONTENIDO?: string;
  DOC_ID_TIPO?: number;
  DOC_ID_PROCESO?: number;
}

const addDocument = async ({
  DOC_NOMBRE,
  DOC_CONTENIDO,
  DOC_ID_TIPO,
  DOC_ID_PROCESO,
}: ArgsCreate): Promise<Documento> => {
  const access_token = localStorage.getItem('access_token');
  const newDocumentData = {
    DOC_NOMBRE,
    DOC_CONTENIDO,
    DOC_ID_TIPO,
    DOC_ID_PROCESO,
  };
  const { data } = await innClodApi.post<Documento>(
    '/documentos/create',
    newDocumentData,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

const editDocument = async ({
  DOC_ID,
  DOC_NOMBRE,
  DOC_CONTENIDO,
  DOC_ID_TIPO,
  DOC_ID_PROCESO,
}: ArgsEdit): Promise<Documento> => {
  const access_token = localStorage.getItem('access_token');
  const documentData = {
    DOC_NOMBRE,
    DOC_CONTENIDO,
    DOC_ID_TIPO,
    DOC_ID_PROCESO,
  };
  const { data } = await innClodApi.put<Documento>(
    `/documentos/update/${DOC_ID}`,
    documentData,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

const useDocumentMutation = () => {
  const queryClient = useQueryClient();

  const documentMutation = useMutation(addDocument, {
    onSuccess: (document) => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
        exact: false,
      });
      queryClient.refetchQueries(['documents'], {
        exact: false,
      });
      queryClient.setQueryData(['document', document.DOC_ID], document);
    },
  });

  const documentEditMutation = useMutation(editDocument, {
    onSuccess: (document) => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
        exact: false,
      });
      queryClient.refetchQueries(['documents'], {
        exact: false,
      });
      queryClient.setQueryData(
        ['document', document.data.DOC_ID],
        document.data
      );
    },
  });

  return {
    documentMutation,
    documentEditMutation,
  };
};

export default useDocumentMutation;
