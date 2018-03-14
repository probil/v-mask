<template>
  <slot
    v-bind="$attrs"
    :value="value"
    v-on="listeners"
  />
</template>

<script>
import format from './format'

export default {
  name: 'VMaskWrapper',
  props: {
    value: String,
  },
  data: () => ({
    previousValue: '',
  }),
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.redirectEvent,
      }
    }
  },
  methods: {
    redirectEvent(event) {
      const rawValue = event.target.value;
      const newValue = rawValue !== this.previousValue && rawValue.length > this.previousValue.length
        ? format(rawValue)
        : rawValue;
      this.$emit('input', newValue);
    }
  }
}
</script>
