const colorSeries = [
  "red",
  "blue",
  "light-green",
  "deep-orange",
  "pink",
  "light-blue",
  "lime",
  "brown",
  "purple",
  "cyan",
  "yellow",
  "grey",
  "deep-purple",
  "teal",
  "amber",
  "indigo",
  "green",
  "orange",
  "blue-grey",
];

export default {
  props: {},
  data() {
    return {};
  },

  methods: {
    genColorName(color, num) {
      return `${color}-${num}`;
    },

    getRandomColorWidthNumber(num) {
      let nRandom = Math.ceil(Math.random() * 100);
      let color = colorSeries[nRandomcolorSeries.length];
      return this.genColorName(color, num);
    },

    getColorWidthNumber(index, num) {
      return this.genColorName(colorSeries[index % colorSeries.length], num);
    },
  },
};
