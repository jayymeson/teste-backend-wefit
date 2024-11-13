export function validateCPF(cpf: string): boolean {
    return cpf.length === 11;
  }
  
  export function validateCNPJ(cnpj: string): boolean {
    return cnpj.length === 14; 
  }