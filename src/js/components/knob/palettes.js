
//TODO: make _init attributes optional

function LightenDarkenColor(col, amt) {
  var usePound = false;
  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }
  var num = parseInt(col,16);
  var r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if  (r < 0) r = 0;
  var b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;
  var g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export default {
  fry: {
    bg_color: '#FFFFFF',
    bg_border_color: '#FFFFFF',
    track_bg_color: LightenDarkenColor('#4e4084', 50),
    track_color_init: LightenDarkenColor('#4e4084', -10),
    track_color: LightenDarkenColor('#4e4084', -10),
    cursor_color_init: LightenDarkenColor('#4e4084', -2),
    cursor_color: LightenDarkenColor('#4e4084', -2),
    markers_color: '#4e4084',
    font_color: LightenDarkenColor('#4e4084', -20),
  },
  card: {
    bg_color: '#FFFFFF',
    bg_border_color: '#FFFFFF',
    track_bg_color: '#4a80b5',//LightenDarkenColor('#003865', 99),
    track_color_init: '#003865',
    track_color: '#003865',
    cursor_color_init: '#003865',
    cursor_color: '#003865',
    markers_color: '#003865',
    font_color: '#003865',
  }
}