const useProof = false;
let local;

const init = async () => {
  console.log("BEING INSTANTIATED AGAIN")
  const { Mina } = await import('snarkyjs') 
  return Mina.LocalBlockchain({ proofsEnabled: useProof });
}

export const getLocal = async () => {
  let local;

  if(!local){
    local = await init()
  }

  return local;
}