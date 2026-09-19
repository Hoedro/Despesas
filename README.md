# Despesas

Aplicação de página única para fotografar talões, facturas e capturas de ecrã,
classificá-los com a API do Gemini e produzir o mapa de gastos do período.

Os dados ficam só no aparelho (IndexedDB). A chave da API não está no código:
é introduzida uma vez nas Definições e guardada localmente.

## Publicar

Definições do repositório → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
Fica disponível em `https://UTILIZADOR.github.io/NOME-DO-REPOSITORIO/`.

## Usar

1. Abrir o endereço no Chrome do telemóvel.
2. Menu → **Instalar aplicação** (ou Adicionar ao ecrã principal).
3. Abrir pelo ícone, ir a Definições e colar a chave da API do Gemini.
4. Ver modelos disponíveis e escolher um Flash.

## Ficheiros

- `index.html` — a aplicação inteira
- `manifest.webmanifest` — para instalar no ecrã principal
- `sw.js` — abre sem rede; não guarda pedidos à API
- `icone-*.png`
