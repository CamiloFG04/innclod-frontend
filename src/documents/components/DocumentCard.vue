<script lang="ts" setup>
import { Document } from '../interfaces/document';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import useDocumentMutation from '../composables/useDocumentMutation';
import { watch } from 'vue';
interface Props {
  documents: Document;
}
const props = defineProps<Props>();
const router = useRouter();
const { documentDeleteMutation } = useDocumentMutation();
watch(
  () => documentDeleteMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      documentDeleteMutation.reset();
      Swal.fire('Eliminado!', '', 'success');
    }
  }
);
const onDelete = (id: number) => {
  Swal.fire({
    title: 'Desea eliminar el documento?',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      documentDeleteMutation.mutate({
        DOC_ID: id,
      });
    }
  });
};
</script>
<template>
  <div
    v-if="props.documents.data.documentos.length > 0"
    style="max-width: 100%"
  >
    <q-list bordered separator>
      <q-item
        v-for="item in props.documents.data.documentos"
        :key="item.DOC_ID"
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar
            color="blue"
            text-color="white"
            icon="visibility"
            class="cursor-pointer"
            @click="
              router.push({ name: 'document', params: { id: item.DOC_ID } })
            "
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.DOC_NOMBRE }} </q-item-label>

          <q-item-label caption>
            ({{ item.TIP_NOMBRE }} - {{ item.PRO_NOMBRE }})
          </q-item-label>
          <q-item-label caption>{{ item.DOC_CODIGO }}</q-item-label>
          <q-item-label caption>{{ item.DOC_CONTENIDO }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-avatar
            color="red"
            text-color="white"
            icon="delete"
            class="cursor-pointer"
            @click="onDelete(item.DOC_ID)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-else class="text-center" style="max-width: 100%">
    <span class="text-h4">No hay información</span>
  </div>
</template>

<style lang="postcss" scoped></style>
