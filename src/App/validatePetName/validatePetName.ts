export function validatePetName(name: string) {
  if(name.length === 0) return {valid:false, text: 'Name is required!'};
  if(name.match(/[0-9]/g)) return {valid:false, text: 'Name must be alphabetic'};
  if (name.length < 3) return {valid:false, text: 'Name must contain at least 3 characters'};
  if(name.length > 15) return {valid:false, text: 'Name must contain no more than 15 characters'};
  if (name[0] !== name[0].toUpperCase()) return {valid:false, text: 'Name must start with a capital letter'};
  return {valid: true, text: ''};
}
