import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { innClodApi } from '../../api/innClodApi';
import { DocumentResponse } from '../interfaces/documentsResponse';

interface ArgsCreate {
  DOC_NOMBRE: string | undefined;
  DOC_CONTENIDO: string | undefined;
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

interface ArgsDelete {
  DOC_ID: number | undefined;
}

const addDocument = async ({
  DOC_NOMBRE,
  DOC_CONTENIDO,
  DOC_ID_TIPO,
  DOC_ID_PROCESO,
}: ArgsCreate): Promise<DocumentResponse> => {
  const access_token = localStorage.getItem('access_token');
  const newDocumentData = {
    DOC_NOMBRE,
    DOC_CONTENIDO,
    DOC_ID_TIPO,
    DOC_ID_PROCESO,
  };
  const { data } = await innClodApi.post<DocumentResponse>(
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
}: ArgsEdit): Promise<DocumentResponse> => {
  const access_token = localStorage.getItem('access_token');
  const documentData = {
    DOC_NOMBRE,
    DOC_CONTENIDO,
    DOC_ID_TIPO,
    DOC_ID_PROCESO,
  };
  const { data } = await innClodApi.put<DocumentResponse>(
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

const DeleteDocument = async ({
  DOC_ID,
}: ArgsDelete): Promise<DocumentResponse> => {
  const access_token = localStorage.getItem('access_token');
  const { data } = await innClodApi.delete<DocumentResponse>(
    `/documentos/delete/${DOC_ID}`,
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
      queryClient.setQueryData(
        ['document', document.data.DOC_ID],
        document.data
      );
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

  const documentDeleteMutation = useMutation(DeleteDocument, {
    onSuccess: (document) => {
      queryClient.removeQueries({
        queryKey: ['document', document.data.DOC_ID],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['documents'],
        exact: false,
      });
      queryClient.refetchQueries(['documents'], {
        exact: false,
      });
    },
  });

  return {
    documentMutation,
    documentEditMutation,
    documentDeleteMutation,
  };
};

export default useDocumentMutation;
