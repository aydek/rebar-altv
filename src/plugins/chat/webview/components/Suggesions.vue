<script lang="ts" setup>
import { CommandInfo } from '@Plugins/chat/store';
import { onMounted, onUnmounted, ref } from 'vue';

const index = ref(-1);

const props = defineProps<{
    suggestions: CommandInfo[];
}>();

const emits = defineEmits(['insertCommand']);

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
        index.value += 1;
        if (index.value > props.suggestions.length - 1) {
            index.value = 0;
        }
        let command = props.suggestions[index.value].name;
        const gapIndex = command.indexOf(' ');
        if (gapIndex > 0) {
            command = command.slice(0, gapIndex);
        }
        emits('insertCommand', '/' + command);
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div class="absolute top-[110%] flex w-full flex-col gap-2 rounded bg-black bg-opacity-50 p-2">
        <div
            v-for="(suggestion, i) in props.suggestions"
            :key="suggestion.name"
            :class="['transition-all', i === index && 'w-full rounded-lg bg-black bg-opacity-50 p-2']"
        >
            <div class="flex gap-2">
                <div>/{{ suggestion.name }}</div>
                <div class="text-neutral-400">
                    {{ suggestion.desc.indexOf('-') > -1 ? suggestion.desc.slice(0, suggestion.desc.indexOf('-')) : '' }}
                </div>
            </div>
            <div class="text-neutral-400">
                {{ suggestion.desc.indexOf('-') > -1 ? suggestion.desc.slice(suggestion.desc.indexOf('-') + 2, suggestion.desc.length) : suggestion.desc }}
            </div>
        </div>
    </div>
</template>
