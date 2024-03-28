<img alt="Logo di Error_418" src="https://github.com/Error-418-SWE/Documenti/blob/7778de3e750a90db96204acb8b7942b2876769a8/logo.png" width="128"/>

# Sorgenti del software WMS3

[![Coverage Status](https://coveralls.io/repos/github/Error-418-SWE/WMS3/badge.svg?branch=main)](https://coveralls.io/github/Error-418-SWE/WMS3?branch=dev)

Il contenuto di questo repository è prodotto nell'ambito del corso di **Ingegneria del Software** del corso di Laurea in Informatica dell'Università degli Studi di Padova (A.A. 2023/2024).

## Struttura del repository

WMS3 è un'applicazione Node.js

`./db` contiene il dump del database SQL d'esempio utilizzato per la simulazione dello scenario d'uso previsto dal Capitolato.

`./web` contiene il codice dell'applicativo.

## Esecuzione

### Esecuzione su VPS

```bash
sudo docker compose -f compose.yml -f production.yml up --build -d
```

Eseguendo questi comandi, il software risulta disponibile sulla porta 80.

### Sviluppo o esecuzione locale

```bash
sudo docker compose watch
```
```bash
sudo docker compose compose up -d
```

Eseguendo questi comandi, il software risulta disponibile sulla porta 3000.

## Documenti

I documenti sono consultabili presso il [repository dedicato](https://github.com/Error-418-SWE/Documenti/tree/main) o al [sito web](https://error418swe.netlify.app/) del gruppo.