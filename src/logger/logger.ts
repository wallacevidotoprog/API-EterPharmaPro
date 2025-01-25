import * as fs from 'fs';
import * as path from 'path';

type LogType = "log" | "alert" | "warn" | "error";

const COLORS = {
  reset: "\x1b[0m",
  blue: "\x1b[34m",    // Cor azul para log
  cyan: "\x1b[36m",    // Cor ciano para alert
  yellow: "\x1b[33m",  // Cor amarela para warn
  red: "\x1b[31m",     // Cor vermelha para error
};

const logFilePath = path.resolve(__dirname, 'logs.txt'); // Caminho do arquivo de log

export class Logger {
  static log(type: LogType, message: string, obj?: unknown) {
    const timestamp = new Date().toISOString(); // Timestamp do log
    const location = this.getCallerLocation(); // Função para obter o local do erro
    const formattedMessage = `[${type.toUpperCase()}]-[${timestamp}]\n${location}\n${message}`;

    // Define as cores para cada tipo de log
    switch (type) {
      case "log":
        console.log(`${COLORS.blue}${formattedMessage}${COLORS.reset}`, obj ? `\n${this.formatObject(obj)}` : "");
        break;
      case "alert":
        console.info(`${COLORS.cyan}${formattedMessage}${COLORS.reset}`, obj ? `\n${this.formatObject(obj)}` : "");
        break;
      case "warn":
        console.warn(`${COLORS.yellow}${formattedMessage}${COLORS.reset}`, obj ? `\n${this.formatObject(obj)}` : "");
        break;
      case "error":
        console.error(`${COLORS.red}${formattedMessage}${COLORS.reset}`, obj ? `\n${this.formatObject(obj)}` : "");
        break;
      default:
        console.log(formattedMessage, obj ? `\n${this.formatObject(obj)}` : "");
    }

    // Registra a mensagem no arquivo de log
    this.appendToLogFile(`${formattedMessage} ${obj ? `\n${this.formatObject(obj)}` : ""}\n`);
  }
  private static formatObject(obj: unknown): string {
    return JSON.stringify(obj, null, 2); // Formata com indentação de 2 espaços
  }
  // Função para obter o local do chamador utilizando a pilha de chamadas
  private static getCallerLocation(): string {
    const error = new Error();
    const stackLines = error.stack?.split("\n") || [];
    const callerLine = stackLines[3]?.trim(); // Captura a linha de onde o erro foi chamado
    if (!callerLine) {
      return "[unknown location]";
    }

    // Regex para capturar o caminho do arquivo e a linha/coluna
    const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
    if (match) {
      const filePath = match[1];
      const line = match[2];
      const column = match[3];
      return `${filePath}:${line}:${column}`;
    }
    return "[unknown location]";
  }

  // Função para registrar no arquivo de log
  private static appendToLogFile(message: string) {
    // Adiciona a mensagem ao arquivo de log, criando o arquivo se ele não existir
    fs.appendFile(logFilePath, `${message}\n`, (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo de log:", err);
      }
    });
  }
}
