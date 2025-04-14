const addressShortner = (addresss: string): string => {
  return addresss.slice(0, 5) + "....." + addresss.slice(-5);
};

export default addressShortner;
