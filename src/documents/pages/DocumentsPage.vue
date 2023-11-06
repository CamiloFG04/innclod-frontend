<script lang="ts" setup>
import { ref } from 'vue';
import { Size } from '../../shared/interfaces/button';
import DocumentCard from '../components/DocumentCard.vue';
import FloatingButtons from '../../shared/components/FloatingButtons.vue';
import useDocuments from '../composables/useDocuments';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import DocumentDialog from '../components/DocumentDialog.vue';

const { documentsQuery } = useDocuments();
const isOpen = ref<boolean>(false);
const createDocument = () => {
  isOpen.value = true;
};
</script>

<template>
  <div class="q-pa-md example-row-equal-width">
    <div class="row">
      <div class="col">
        <LoaderSpinner v-if="documentsQuery.isLoading.value" />

        <DocumentCard v-else :documents="documentsQuery.data.value! || []" />
      </div>
    </div>
  </div>
  <FloatingButtons
    :buttons="[
      {
        icon: 'add',
        color: 'primary',
        size: Size.lg,
        action: createDocument,
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
    @on-close="isOpen = false"
  />
</template>

<style lang="sass" scoped></style>
