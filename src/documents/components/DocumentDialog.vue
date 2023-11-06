<script setup lang="ts">
import { ref, watch } from 'vue';
import useDocumentMutation from '../composables/useDocumentMutation';
import { Proceso, Tipo, Documento } from '../interfaces/document';

interface Props {
  isOpenProp: boolean;
  typesProp: Tipo[];
  processProp: Proceso[];
  documentData?: Documento;
}

interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { documentMutation, documentEditMutation } = useDocumentMutation();

const isOpen = ref<boolean>();
const DOC_ID = ref<number | undefined>();
const DOC_NOMBRE = ref<string>('');
const DOC_CONTENIDO = ref<string>('');
const DOC_ID_TIPO = ref<number | undefined>();
const DOC_ID_PROCESO = ref<number | undefined>();

if (props.documentData) {
  DOC_ID.value = props.documentData.DOC_ID;
  DOC_NOMBRE.value = props.documentData.DOC_NOMBRE;
  DOC_CONTENIDO.value = props.documentData.DOC_CONTENIDO;
  DOC_ID_TIPO.value = props.documentData.DOC_ID_TIPO;
  DOC_ID_PROCESO.value = props.documentData.DOC_ID_PROCESO;
}

watch(props, () => {
  isOpen.value = props.isOpenProp;
});

watch(
  () => documentMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      DOC_NOMBRE.value = '';
      DOC_CONTENIDO.value = '';
      DOC_ID_TIPO.value = undefined;
      DOC_ID_PROCESO.value = undefined;

      documentMutation.reset();
      emits('onClose');
    }
  }
);
watch(
  () => documentEditMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      documentEditMutation.reset();
      emits('onClose');
    }
  }
);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form
          @submit.prevent="
            props.documentData
              ? documentEditMutation.mutate({
                  DOC_ID,
                  DOC_NOMBRE,
                  DOC_CONTENIDO,
                  DOC_ID_TIPO,
                  DOC_ID_PROCESO,
                })
              : documentMutation.mutate({
                  DOC_NOMBRE,
                  DOC_CONTENIDO,
                  DOC_ID_TIPO,
                  DOC_ID_PROCESO,
                })
          "
        >
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">
                {{
                  props.documentData ? 'Editar Documento' : 'Nuevo Documento'
                }}
              </div>
              <div class="text-grey">
                {{
                  props.documentData
                    ? 'Modificar el documento'
                    : 'Agregar un documento'
                }}
              </div>
            </div>

            <q-space />

            <div>
              <q-input
                filled
                dense
                v-model="DOC_NOMBRE"
                label="Nombre"
                placeholder="Nombre"
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-select
                v-model="DOC_ID_TIPO"
                :options="props.typesProp"
                option-value="TIP_ID"
                option-label="TIP_NOMBRE"
                emit-value
                map-options
                use-input
                label="Tipo"
                use-chips
                filled
                dense
                stack-label
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-select
                v-model="DOC_ID_PROCESO"
                :options="props.processProp"
                option-value="PRO_ID"
                option-label="PRO_NOMBRE"
                emit-value
                map-options
                use-input
                label="Proceso"
                use-chips
                filled
                dense
                stack-label
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <!-- TODO: Markdown editor -->
              <q-input
                v-model="DOC_CONTENIDO"
                filled
                type="textarea"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn
              @click="emits('onClose')"
              flat
              label="Close"
              v-close-popup
              color="dark"
            />
            <q-space />
            <q-btn flat type="submit" label="Guardar" color="dark" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
