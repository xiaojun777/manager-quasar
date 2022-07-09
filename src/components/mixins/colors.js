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

const lightGray = 160;

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

    getRGB (color) {
      let red = parseInt(color.slice(1,3),16);
      let green = parseInt(color.slice(3,5),16);
      let blue = parseInt(color.slice(5,7),16);
      return [red, green, blue];
    },

    getGrayLevel (color) {//hex
      let [red, green, blue] = this.getRGB(color);
      let grayLevel =  (red*299 + green*587 + blue*114 + 500) / 1000;
      return grayLevel;
    },

    getBlackOrWhite(color, bHex) {//
      if (bHex) {
        return this.getGrayLevel(color) > lightGray ? '#000000' : '#FFFFFF';
      }else{
        return this.getGrayLevel(color) > lightGray ? 'black' : 'white';
      }
    },

    getGradientColor(color, level) {
      if (this.getGrayLevel(color) > lightGray) {
        return this.darkGrayLevel(color, level);
      }else{
        return this.lightGrayLevel(color, level);
      }
    },

    lightGrayLevel(color, level) {
      let rgbs = this.getRGB(color);
      for (var i = 0; i < 3; i++) rgbs[i] = Math.floor((255 - rgbs[i]) * level + rgbs[i]);
      let red = Math.ceil(rgbs[0]).toString(16).padStart(2,'0');
      let green = Math.ceil(rgbs[1]).toString(16).padStart(2,'0');
      let blue = Math.ceil(rgbs[2]).toString(16).padStart(2,'0');
      return `#${red}${green}${blue}`;
    },

    darkGrayLevel(color, level) {
      let rgbs = this.getRGB(color);
      for (var i = 0; i < 3; i++) rgbs[i] = Math.floor(rgbs[i] * (1 - level));
      let red = Math.ceil(rgbs[0]).toString(16).padStart(2,'0');
      let green = Math.ceil(rgbs[1]).toString(16).padStart(2,'0');
      let blue = Math.ceil(rgbs[2]).toString(16).padStart(2,'0');
      return `#${red}${green}${blue}`;
    },

  },
};
