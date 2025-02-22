enum PermissionsEnum {
    PADRAO = 1,          // 00000000001
    DEV = 2,             // 00000000010
    ADMIN = 4,           // 00000000100
    SUPERVISOR = 8,      // 00000001000
    GERENTE = 16,        // 00000010000 
    FARMACEUTICO = 32,   // 00000100000
    BALCONISTA = 64,     // 00001000000
    OPERADOR_LOJA = 128, // 00010000000
    OPERADOR_CAIXA = 256,// 00100000000
    ENTREGADOR = 512,    // 01000000000
    PERFUMISTA = 1024    // 10000000000
  }
  class ControlePermissionsEnum {
    private permissoes: number;
  
    constructor(permissoes: number = 0) {
      this.permissoes = permissoes;
    }
  
    
    add(permissao: PermissionsEnum): void {
      this.permissoes |= permissao;
    }

    remove(permissao: PermissionsEnum): void {
      this.permissoes &= ~permissao;
    }
  
    verify(permissao: PermissionsEnum): boolean {
      return (this.permissoes & permissao) !== 0;
    }
  
    list(): PermissionsEnum[] {
      return Object.values(PermissionsEnum)
        .filter(value => typeof value === "number" && (this.permissoes & (value as number)) !== 0)
        .map(value => value as PermissionsEnum);
    }
  
    value(): number {
      return this.permissoes;
    }
  }


//   const usuario = new ControlePermissoes();

// usuario.adicionar(Permissoes.ADMIN);
// usuario.adicionar(Permissoes.GERENTE);

// console.log(usuario.possui(Permissoes.ADMIN)); // true
// console.log(usuario.possui(Permissoes.SUPERVISOR)); // false

// usuario.remover(Permissoes.ADMIN);
// console.log(usuario.possui(Permissoes.ADMIN)); // false

// console.log(usuario.listar()); // [Permissoes.GERENTE]
// console.log(usuario.valor());  // 16 (binário: 00000010000)

  