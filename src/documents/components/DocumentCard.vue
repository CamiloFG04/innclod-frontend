<script lang="ts" setup>
import { Document } from '../interfaces/document';
import { useRouter } from 'vue-router';

interface Props {
  documents: Document;
}
const props = defineProps<Props>();
const router = useRouter();
</script>
<template>
  <div style="max-width: 100%">
    <q-list bordered separator>
      <q-item
        v-for="item in props.documents.data.documentos"
        :key="item.DOC_ID"
        clickable
        v-ripple
        @click="router.push({ name: 'document', params: { id: item.DOC_ID } })"
      >
        <q-item-section>
          <q-item-label>{{ item.DOC_NOMBRE }} </q-item-label>

          <q-item-label caption>
            ({{ item.TIP_NOMBRE }} - {{ item.PRO_NOMBRE }})
          </q-item-label>
          <q-item-label caption>{{ item.DOC_CODIGO }}</q-item-label>
          <q-item-label caption>{{ item.DOC_CONTENIDO }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style lang="postcss" scoped></style>
