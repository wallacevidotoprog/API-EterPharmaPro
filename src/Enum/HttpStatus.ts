export enum HttpStatus {
    // Sucessos
    OK = 200,                     // Requisição bem-sucedida
    CREATED = 201,                // Recurso criado com sucesso
    NO_CONTENT = 204,             // Sucesso, mas sem conteúdo para retornar

    // Erros do Cliente
    BAD_REQUEST = 400,            // Requisição inválida
    UNAUTHORIZED = 401,           // Não autenticado
    FORBIDDEN = 403,              // Autenticado, mas sem permissão
    NOT_FOUND = 404,              // Recurso não encontrado
    CONFLICT = 409,               // Conflito com o estado atual do recurso

    // Erros do Servidor
    INTERNAL_SERVER_ERROR = 500,  // Erro interno do servidor
    NOT_IMPLEMENTED = 501,        // Funcionalidade não implementada
    BAD_GATEWAY = 502,            // Erro de gateway ou proxy
    SERVICE_UNAVAILABLE = 503,    // Serviço indisponível
}
