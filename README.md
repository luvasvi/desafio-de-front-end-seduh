# 🌦️ Weather App - Desafio Front-end

Este projeto é uma aplicação de previsão do tempo responsiva e moderna, desenvolvida como parte de um desafio técnico. A aplicação reproduz fielmente um design de alta fidelidade (estilo iOS Weather), consumindo dados reais de clima e apresentando-os com ícones dinâmicos e horários ajustados ao fuso horário local de cada cidade.

## 🔗 Link do Projeto (Deploy)

🚀 **Acesse a aplicação aqui:** [https://desafio-de-front-end-seduh-six.vercel.app/](https://desafio-de-front-end-seduh-six.vercel.app/)

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna focada em performance, tipagem estática e qualidade de código:

* **Framework:** Next.js 14 (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Ícones:** Lucide React
* **Testes:** Jest & React Testing Library
* **Containerização:** Docker

## ✨ Funcionalidades

* **Listagem de Cidades:** Seleção rápida entre cidades pré-definidas (Madrid, London, Vancouver, etc.).
* **Detalhes do Clima:** Visualização de temperatura atual, mínima, máxima, umidade e velocidade do vento.
* **Previsão por Período:** Dados segmentados por Madrugada, Manhã, Tarde e Noite.
* **Fuso Horário Real:** Horários de nascer (sunrise) e pôr do sol (sunset) calculados com base no timezone da cidade.
* **Ícones Dinâmicos:** Os ícones mudam conforme a condição (Sol, Chuva, Neve) e o horário (Dia/Noite).
* **Design Responsivo:** Layout adaptável para dispositivos móveis e desktops.
* **CI/CD Ready:** Configuração de Docker pronta para deploy.

## 📦 Como Rodar o Projeto

Você pode rodar a aplicação de duas formas: **Localmente** (com Node.js) ou via **Docker**.

### Pré-requisitos

* Node.js (v18 ou superior)
* NPM ou Yarn
* Docker (Opcional)

### 1. Configuração de Variáveis de Ambiente (Importante ⚠️)

Por questões de segurança, a chave da API não é versionada no repositório. Para rodar o projeto, você precisa configurar sua chave localmente:

1. Crie um arquivo chamado `.env.local` na raiz do projeto.
2. Adicione a seguinte linha dentro dele:
```env
NEXT_PUBLIC_WEATHER_API_KEY=sua_chave_aqui

```


*(Você pode gerar uma chave gratuita em [https://openweathermap.org/](https://openweathermap.org/))*

### 2. Instalação Local

```bash
# Clone este repositório
git clone https://github.com/luvasvi/desafio-de-front-end-seduh.git

# Entre na pasta
cd desafio-de-front-end-seduh

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

```

Acesse http://localhost:3000 no seu navegador.

### 3. Rodando com Docker 🐳

O projeto está totalmente containerizado para facilitar a execução.

```bash
# Construir a imagem (pode levar alguns minutos)
docker build -t weather-app .

# Rodar o container na porta 3000
docker run -p 3000:3000 weather-app

```

Acesse http://localhost:3000 no seu navegador.

## 🧪 Rodando os Testes

O projeto possui testes unitários configurados para garantir a integridade dos componentes.

```bash
# Rodar todos os testes
npm test

# Rodar em modo watch (desenvolvimento)
npm run test:watch

```

## 📂 Estrutura de Pastas

* **tests**: Testes unitários (Jest)
* **app**: Páginas e rotas do Next.js (App Router)
* **components**: Componentes reutilizáveis
* **services**: Lógica de consumo da API
* **utils**: Funções auxiliares
* **Dockerfile**: Configuração de build do Docker

## 👨‍💻 Autor

Desenvolvido por **Lucas**
