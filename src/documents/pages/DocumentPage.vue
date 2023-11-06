<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Size } from '../../shared/interfaces/button';
import DocumentInfo from '../components/DocumentInfo.vue';
import FloatingButtons from '../../shared/components/FloatingButtons.vue';
import DocumentDialog from '../components/DocumentDialog.vue';
import useDocument from '../composables/useDocument';
import useDocuments from '../composables/useDocuments';

const isOpen = ref<boolean>(false);
const route = useRoute();
const { documentQuery } = useDocument(+route.params.id);
const { documentsQuery } = useDocuments();

const editDocument = () => {
  isOpen.value = true;
};
</script>

<template>
  <DocumentInfo
    :documento="documentQuery.data.value"
    :is-loading="documentQuery.isLoading.value"
  />
  <FloatingButtons
    :buttons="[
      {
        icon: 'edit',
        color: 'primary',
        size: Size.lg,
        action: editDocument,
      },
    ]"
  />
  <DocumentDialog
    :is-open-prop="isOpen"
    v-if="documentsQuery.data"
    :types-prop="
      documentsQuery.data.value?.data.tipos?.map((tipo) => ({
        TIP_ID: tipo.TIP_ID,
        TIP_NOMBRE: tipo.TIP_NOMBRE,
      })) || []
    "
    :process-prop="
      documentsQuery.data.value?.data.procesos?.map((proceso) => ({
        PRO_ID: proceso.PRO_ID,
        PRO_NOMBRE: proceso.PRO_NOMBRE,
      })) || []
    "
    :document-data="documentQuery.data.value"
    @on-close="isOpen = false"
  />
</template>
