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

    getColors (num) {
      let colors = [];
      colorSeries.forEach( (series) => {
        colors.push(this.genColorName(series, num));
      });
      return colors;
    },

    getGrayLevel (color) {//hex
      let red = parseInt(color.slice(1,3),16);
      let green = parseInt(color.slice(3,5),16);
      let blue = parseInt(color.slice(5,7),16);
      let grayLevel = red * 0.299 + green * 0.587 + blue * 0.114;
      return grayLevel;
    },

    getBlackOrWhite(color, bHex) {//
      if (bHex) {
        return this.getGrayLevel(color) > 145 ? '#000000' : '#FFFFFF';
      }else{
        return this.getGrayLevel(color) > 145 ? 'black' : 'white';
      }
    }
  },
};
