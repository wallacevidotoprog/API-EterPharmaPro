#!/bin/bash

SERVICE_NAME="service.service"


PROJECT_DIR="/home/ubuntu/server"


DIST_DIR="$PROJECT_DIR/dist"

echo "Iniciando o processo..."


echo "Parando o serviço $SERVICE_NAME..."
sudo systemctl stop "$SERVICE_NAME"
if [ $? -ne 0 ]; then
  echo "Erro ao parar o serviço $SERVICE_NAME. Verifique o status."
  exit 1
fi
echo "Serviço $SERVICE_NAME parado com sucesso."


if [ -d "$DIST_DIR" ]; then
  echo "Removendo o diretório $DIST_DIR..."
  rm -rf "$DIST_DIR"
  echo "Diretório $DIST_DIR removido."
else
  echo "O diretório $DIST_DIR não existe. Nada para remover."
fi


cd "$PROJECT_DIR" || { echo "Erro: não foi possível acessar $PROJECT_DIR"; exit 1; }


echo "Executando 'npx prisma generate'..."
npx prisma generate
if [ $? -ne 0 ]; then
  echo "Erro ao executar 'npx prisma generate'. Abortando."
  exit 1
fi

echo "Executando 'npm run build'..."
npm run build
if [ $? -ne 0 ]; then
  echo "Erro ao executar 'npm run build'. Abortando."
  exit 1
fi

echo "Reiniciando o serviço $SERVICE_NAME..."
sudo systemctl start "$SERVICE_NAME"
if [ $? -ne 0 ]; then
  echo "Erro ao iniciar o serviço $SERVICE_NAME. Verifique o status."
  exit 1
fi
echo "Serviço $SERVICE_NAME reiniciado com sucesso."


echo "Exibindo os logs do serviço $SERVICE_NAME..."
sudo journalctl -u "$SERVICE_NAME" -f
