<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Icon from './Icon.vue';

const props = defineProps<{
    items: Array<{
        id: number;
        title: string;
        ref?: any;
        isExpand?: boolean;
        height?: string;
    }>;
}>();

const items = ref(props.items);

const containerRef = ref(null);

const toggleExpand = (index: number) => {
    const item = items.value[index];
    if (item.isExpand) {
        item.isExpand = false;
        item.height = '0px';
    } else {
        items.value.forEach((i) => {
            if (i !== item) {
                i.isExpand = false;
                i.height = '0px';
            }
        });
        item.isExpand = true;
        const content = item.ref;
        const height = content.scrollHeight;
        item.height = height + 'px';
    }
};

function setRef(index: number, ref: any) {
    items.value[index].ref = ref;
}

const getComputedHeight = () => {
    for (const item of items.value) {
        const content = item.ref;
        content.style.height = 'auto';
        content.style.position = 'absolute';
        content.style.visibility = 'hidden';
        content.style.display = 'block';

        content.style.height = 0;
        content.style.position = null;
        content.style.visibility = null;
        content.style.display = null;
    }
};

onMounted(() => {
    setTimeout(() => {
        getComputedHeight();
    }, 100);
});
</script>

<template>
    <div class="accordion" ref="containerRef">
        <div class="card" v-for="(item, index) of items" :key="index + 'accordions'">
            <div class="card-header" @click.prevent="toggleExpand(index)">
                <span>{{ item.title }}</span>
                <div class="icon">
                    <Icon
                        icon="icon-chevron-down"
                        :size="2"
                        :style="[item.isExpand && { transform: 'rotate(180deg)' }]"
                    ></Icon>
                </div>
            </div>

            <div class="card-body" :ref="(el) => setRef(index, el)" :style="{ height: item.height }">
                <hr />
                <div class="card-content">
                    <slot :name="item.title" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.accordion {
    width: 100%;
}
.card {
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    margin: 8px 0;
    border-bottom: 1px solid #aaa;
}

.card-header,
.card-content {
    padding: 15px 0;
}

.card-header {
    cursor: pointer;
}

.card-header span {
    font-weight: 600;
}

.card-body {
    height: 0;
    overflow: hidden;
    transition: 0.3s ease;
}

.icon {
    float: right;
    transition: 0.3s ease;
}

hr {
    margin: 0;
    height: 1px;
    display: block;
    border-width: 0;
    border-top: 1px solid #aaa;
}
</style>
