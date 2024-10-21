<script setup lang="ts">
import Modal from '@Components/Modal.vue';
import TextField from '@Components/TextField.vue';
import Button from '@Components/Button.vue';
import { onMounted, ref } from 'vue';
import '../../translate/index';
import { useStore } from '../store';
import { useTranslate } from '@Shared/translate';
import { useEvents } from '@Composables/useEvents';
import { CharacterCreatorEvents } from '../../shared/events';

const { internal, setInternal } = useStore();
const events = useEvents();

const { t } = useTranslate();

const first = ref({
    name: '',
    error: false,
    helper: '',
});

const last = ref({
    name: '',
    error: false,
    helper: '',
});

const age = ref({
    val: 0,
    error: false,
    helper: '',
});

const checkingName = ref(false);
const nameGood = ref(false);

const checkName = () => {
    firstnameChange(first.value.name);
    lastnameChange(last.value.name);
    ageChange(age.value.val);

    setTimeout(() => {
        if (first.value.error || last.value.error || age.value.error) {
            return;
        }
        const fixedFirstName = first.value.name.charAt(0).toUpperCase() + first.value.name.slice(1);
        const fixedLastName = last.value.name.charAt(0).toUpperCase() + last.value.name.slice(1);
        checkingName.value = true;
        events.emitServer(CharacterCreatorEvents.toServer.nameCheck, fixedFirstName, fixedLastName);
    }, 100);
};

const finish = () => {
    firstnameChange(first.value.name);
    lastnameChange(last.value.name);
    ageChange(age.value.val);
    setTimeout(() => {
        if (first.value.error || last.value.error || age.value.error) {
            return;
        }
        const fixedFirstName = first.value.name.charAt(0).toUpperCase() + first.value.name.slice(1);
        const fixedLastName = last.value.name.charAt(0).toUpperCase() + last.value.name.slice(1);
        checkingName.value = true;
        events.emitClient(CharacterCreatorEvents.toClient.save, fixedFirstName, fixedLastName, age.value.val);
    }, 100);
};

const handleCheckReturn = (foundDoc: boolean) => {
    if (foundDoc) {
        first.value = { name: '', error: true, helper: t('character.creator.name.taken') };
        last.value = { name: '', error: true, helper: t('character.creator.name.taken') };
        checkingName.value = false;
        return;
    }
    checkingName.value = false;
    nameGood.value = true;
};

onMounted(() => {
    events.emitClient(CharacterCreatorEvents.toClient.toggleRotation, false);
    events.on(CharacterCreatorEvents.toServer.nameCheck, handleCheckReturn);
});

const firstnameChange = (text: string) => {
    first.value = { name: text, error: false, helper: '' };
    nameGood.value = false;
    const regEx = /^[a-zA-Z\u00c0-\u017e]{2,16}$/;
    if (!regEx.test(text)) {
        first.value = { name: text, error: true, helper: t('character.creator.name.error') };
    }
};

const lastnameChange = (text: string) => {
    last.value = { name: text, error: false, helper: '' };
    const regEx = /^[a-zA-Z\u00c0-\u017e]{2,16}$/;
    nameGood.value = false;
    if (!regEx.test(text)) {
        last.value = { name: text, error: true, helper: t('character.creator.name.error') };
    }
};

const ageChange = (_val: number) => {
    age.value = { val: _val, error: false, helper: '' };
    if (_val < 18 || _val > 99) {
        age.value = { val: _val, error: true, helper: t('character.creator.day.error') };
        return;
    }
};

const handleClose = () => {
    events.emitClient(CharacterCreatorEvents.toClient.toggleRotation, true);
    setInternal('modalOpen', false);
};
</script>

<template>
    <Modal @onClose="handleClose" :open="internal.modalOpen" class="flex flex-col gap-0 p-10">
        <TextField
            :label="t('character.creator.first.name')"
            class="w-96"
            @onChange="firstnameChange"
            :error="first.error"
            :helperText="first.helper"
        />
        <TextField
            :label="t('character.creator.last.name')"
            class="w-96"
            @onChange="lastnameChange"
            :error="last.error"
            :helperText="last.helper"
        />
        <TextField
            type="number"
            :label="t('character.creator.age')"
            class="mb-10 w-96"
            @onChange="ageChange"
            :error="age.error"
            :helperText="age.helper"
        />
        <Button class="mb-2 w-full" :type="checkingName ? 'disabled' : 'primary'" @click="checkName">{{
            t('character.creator.verify.name')
        }}</Button>
        <Button class="w-full" :type="!nameGood ? 'disabled' : 'primary'" @click="finish">{{
            t('character.creator.finish')
        }}</Button>
    </Modal>
</template>
