# 🏆 Atleta Performance Pro

App de Alta Performance para Atletas - Desenvolvido especialmente para Gabriel

## 📱 Características

- ✅ **Check-in Matinal Inteligente**: Perguntas relevantes sobre sono, humor, fome e bem-estar
- 📅 **Rotina Personalizada**: Organização completa dos treinos, estudos e recuperação
- ✔️ **Sistema de Checkboxes**: Marque atividades cumpridas ao longo do dia
- 📊 **Dashboard de Performance**: Visualize seu progresso e evolução
- 💡 **Insights Personalizados**: Recomendações baseadas em seus dados
- 🔥 **Sequências e Conquistas**: Gamificação para manter a motivação
- 📱 **100% Mobile**: Otimizado para uso no celular

## 🚀 Como Instalar e Executar

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- NPM ou Yarn

### Instalação

1. Abra o terminal na pasta do projeto

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

4. Abra no navegador:
```
http://localhost:3000
```

### Para usar no celular:

1. Certifique-se que seu celular está na mesma rede Wi-Fi que o computador

2. Descubra o IP do seu computador:
   - Windows: `ipconfig` no terminal
   - Mac/Linux: `ifconfig` no terminal

3. No celular, acesse:
```
http://[SEU-IP]:3000
```
Exemplo: `http://192.168.1.100:3000`

## 📋 Rotina Configurada

### Segunda, Quarta e Sexta
- 09:00 - Acordar
- 10:00-12:00 - Treino MMA (Chute Boxe - Parque Barigui)
- 12:30-13:50 - Jiu-Jitsu (Bateu)
- 14:00 - Almoço
- 15:30-16:30 - Musculação
- 18:30-23:00 - Estudar

### Terça e Quinta
- 09:00 - Acordar
- 10:00-11:00 - Treino Manhã (Colombo)
- 12:00 - Almoço
- 13:00-14:00 - Treino Tarde (Colombo)
- 15:00-16:00 - Aula de Inglês
- 18:30-23:00 - Estudar

### Fim de Semana
- Horários flexíveis para treino e recuperação

## 🎯 Funcionalidades Principais

### Check-in Matinal
- Horário que acordou
- Qualidade do sono
- Nível de fome
- Estado de humor
- Se teve sonhos
- Se acordou durante a noite
- Observações gerais

### Dashboard
- Visualização das atividades do dia
- Progresso em tempo real
- Estatísticas de sequência
- Resumo matinal

### Performance
- Gráficos de evolução
- Estatísticas detalhadas
- Metas semanais
- Conquistas desbloqueadas

### Insights
- Análise inteligente do dia
- Recomendações personalizadas
- Dicas de treino e recuperação
- Alertas importantes

### Perfil
- Informações do atleta
- Conquistas
- Estatísticas gerais
- Configurações

## 🏗️ Build para Produção

Para criar uma versão otimizada:

```bash
npm run build
npm start
```

## 📱 PWA - Instalar como App

O app pode ser instalado como um aplicativo no celular:

1. Acesse o app pelo navegador do celular
2. No menu do navegador, procure "Adicionar à tela inicial"
3. O app funcionará como um aplicativo nativo

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **React 18** - Biblioteca UI
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Zustand** - Gerenciamento de estado
- **Recharts** - Gráficos
- **Date-fns** - Manipulação de datas
- **Lucide Icons** - Ícones

## 📸 Fotos do Atleta

As fotos do atleta devem estar na pasta `public/`:
- `image1.jpg`
- `image2.jpg`
- `image3.jpg`

## 🔧 Personalização

Para personalizar o app:

1. **Mudar rotina**: Edite o objeto `weeklySchedule` em `lib/store.js`
2. **Alterar cores**: Modifique as cores em `tailwind.config.js`
3. **Adicionar perguntas**: Edite o array `steps` em `components/MorningCheckIn.js`

## 💪 Desenvolvido para Alta Performance!

Este app foi criado especialmente para Gabriel, 16 anos, atleta de alta performance, com o objetivo de otimizar sua rotina de treinos, estudos e recuperação.

---

**Vamos treinar! 🚀**
