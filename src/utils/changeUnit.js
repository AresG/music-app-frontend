// 转换num单位
export const changeUnit = (number) => {
  if (number < 10000) {
    return number
  }else if(number < 10e9){
    number = (number / 10000).toFixed(1) + '万';
  }else{
    number = (number / 10e9).toFixed(1) + '亿';
  }
  return number;
}