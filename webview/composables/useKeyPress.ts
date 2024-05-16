import { ref, onMounted, onUnmounted } from 'vue';

function onKeyDown(key: string, onPress: (event: KeyboardEvent) => void) {
    const cooldown = ref(Date.now());

    const handleKeyDown = (event: KeyboardEvent) => {
        if (cooldown.value > Date.now()) return;
        if (event.key === key) {
            onPress(event);
            cooldown.value = Date.now() + 100;
        }
    };

    onMounted(() => {
        document.addEventListener('keydown', handleKeyDown);
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeyDown);
    });
}

function onKeyUp(key: string, onPress: (event: KeyboardEvent) => void) {
    const cooldown = ref(Date.now());

    const handleKeyUp = (event: KeyboardEvent) => {
        if (cooldown.value > Date.now()) return;
        if (event.key === key) {
            onPress(event);
            cooldown.value = Date.now() + 300;
        }
    };

    onMounted(() => {
        document.addEventListener('keyup', handleKeyUp);
    });

    onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyUp);
    });
}

export function useKeyPress() {
    return {
        onKeyDown,
        onKeyUp,
    };
}
