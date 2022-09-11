export const resetRefForm = (
  nameRef,
  countryRef,
  ageRef,
  heightRef,
  weightRef,
  numberRef,
  positionRef,
  footRef,
  imageRef,
  attackRef,
  defensiveRef,
  passingRef,
  movingRef
) => {
  nameRef.current.value = null;
  countryRef.current.value = null;
  ageRef.current.value = null;
  heightRef.current.value = null;
  weightRef.current.value = null;
  numberRef.current.value = null;
  positionRef.current.value = '';
  footRef.current.value = null;
  imageRef.current.value = null;
  attackRef.current.value = null;
  defensiveRef.current.value = null;
  passingRef.current.value = null;
  movingRef.current.value = null;
};
