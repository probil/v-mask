import format from './format';

export default {
  name: 'VMaskWrapper',
  render(h) {
    return h(
      this.$slots.default,
      {
        listeners: this.listeners,
        attrs: {
          ...this.$attrs,
          value: this.value,
        },
      },
    );
  },
  props: {
    value: String,
    mask: String,
  },
  data: () => ({
    previousValue: '',
  }),
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.redirectEvent,
      };
    },
  },
  methods: {
    redirectEvent(event) {
      const rawValue = event.target.value;
      const newValue =
        rawValue !== this.previousValue && rawValue.length > this.previousValue.length
          ? format(rawValue, this.mask)
          : rawValue;
      this.$emit('input', newValue);
    },
  },
};
