<script lang="ts" setup>
import Button from '@Components/Button.vue';
import '../../translate/index';
import { useTranslate } from '@Shared/translate';

const emit = defineEmits<{
    yes_delete: [];
    no_delete: [];
}>();

const props = defineProps<{
    name: string;
}>();

const { t } = useTranslate();
</script>

<template>
    <div class="ml-10 text-xl">
        <div class="text-gray mb-3 font-bold">{{ t('character.select.are.you.sure') }} {{ props.name }}?</div>
        <div class="flex gap-3">
            <Button class="w-full" @click="emit('no_delete')" type="secondary">
                {{ t('character.select.back') }}
            </Button>
            <Button class="w-full" @click="emit('yes_delete')">
                {{ t('character.select.delete') }}
            </Button>
        </div>
    </div>
</template>
