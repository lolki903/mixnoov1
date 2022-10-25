const {Dimensions} = require('react-native');
const {width, height} = Dimensions.get('screen');


export const CARD = {
    width: width * 0.9,
    height: height * 0.78,
    borderRadius: 20,
}
export const COLORS = {
    like: '#6ee3b4',
    nope: '#ec5288',

}
export const ACTION_OFFSET = 100;