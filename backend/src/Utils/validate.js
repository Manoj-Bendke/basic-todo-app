
export const isBlank = (value)=>{
  return value === undefined || value === null || value.toString().trim() === '';
}