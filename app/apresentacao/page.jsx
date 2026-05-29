"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./apresentacao.module.css";

const CODE_HIGHLIGHTS = [
  {
    id: 0,
    title: "Micro-Animações CSS",
    icon: "❤️",
    filePath: "components/PostCard.module.css",
    description: "Feedback tátil e resposta visual instantânea ao curtir publicações, vinculando o estado dinâmico do React à animação pura por keyframes do CSS.",
    code: `/* Animação disparada quando o botão recebe a classe .liked */
.liked .actionIcon {
  animation: heartBeat 0.3s ease-in-out;
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}`,
    explanation: "Em vez de usar bibliotecas pesadas de animação, aproveitamos a potência do hardware do navegador usando keyframes de escala do CSS Vanilla. Isso torna a interface reativa e suave de forma otimizada."
  },
  {
    id: 1,
    title: "Persistência no localStorage",
    icon: "💾",
    filePath: "app/page.jsx",
    description: "Criação de novos posts no feed com persistência nativa usando o armazenamento interno do navegador. Permite que as publicações fiquem guardadas mesmo se fechar a aba.",
    code: `const handleCreatePost = (e) => {
  e.preventDefault();
  if (!novoPostConteudo.trim()) return;

  const novoPost = {
    id: \`post-\${Date.now()}\`,
    autor: userProfile.nome,
    conteudo: novoPostConteudo,
    data: "Agora mesmo",
    imagemPost: selectedPresetImage,
    curtidas: 0,
    jaCurtido: false,
    isOwnPost: true
  };

  const updatedPosts = [novoPost, ...posts];
  setPosts(updatedPosts);
  localStorage.setItem("flow_posts", JSON.stringify(updatedPosts));
  setNovoPostConteudo("");
};`,
    explanation: "A função handleCreatePost captura o texto do formulário, monta um objeto estruturado em JS, gera um identificador exclusivo baseado no timestamp do sistema (Date.now()) e o guarda na chave local, simulando um banco de dados."
  },
  {
    id: 2,
    title: "Componentização & Props",
    icon: "🧩",
    filePath: "components/PostCard.jsx",
    description: "Código altamente modular. Um único componente representacional responsável por desenhar posts diferentes com base nas propriedades enviadas pelo componente pai.",
    code: `export default function PostCard({ 
  autor, 
  fotoAutor, 
  conteudo, 
  data, 
  imagemPost, 
  curtidas = 0, 
  jaCurtido = false,
  onLike,
  onDelete,
  isOwnPost = false
}) {
  return (
    <article className={styles.postCard}>
      <div className={styles.userInfo}>
        <img src={fotoAutor} alt={autor} />
        <h4>{autor}</h4>
      </div>
      <p>{conteudo}</p>
    </article>
  );
}`,
    explanation: "Evitamos duplicar código em loop. O PostCard é puramente representacional e reage a funções passadas por referência (como onLike e onDelete), mantendo o desenvolvimento limpo (conceito DRY)."
  },
  {
    id: 3,
    title: "Modo Escuro com CSS Puro",
    icon: "🌓",
    filePath: "app/globals.css",
    description: "Tema escuro e claro automático e com alto desempenho. As variáveis de cor se adaptam de acordo com as preferências do sistema operacional do usuário de forma 100% nativa.",
    code: `/* Tema Claro Padrão */
:root {
  --bg-primary: #f8fafc;
  --text-primary: #0f172a;
  --accent-color: #6366f1;
}

/* Modo Escuro Nativo */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #09090b;
    --text-primary: #f4f4f5;
    --accent-color: #8b5cf6;
  }
}`,
    explanation: "Destaque para performance: o navegador computa e atualiza as cores instantaneamente sem a necessidade de processar qualquer lógica JavaScript em segundo plano."
  }
];

export default function Apresentacao() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className={styles.presentationBg}>
      {/* Elementos visuais de fundo brilhantes (Glows) */}
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={styles.container}>
        {/* Cabeçalho */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>Apresentação Prática 🎓</div>
          <h1 className={styles.title}>
            <span>Rede Social</span> <span className={styles.gradientText}>Flow</span>
          </h1>
          <p className={styles.subtitle}>
            Uma demonstração moderna de engenharia web com Next.js (App Router), JavaScript e CSS puro.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/" className={styles.primaryBtn}>
              Acessar Rede Social 🌊
            </Link>
            <a 
              href="https://github.com/Tiagopbc/FlowSocial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.secondaryBtn}
            >
              Ver no GitHub 🐙
            </a>
          </div>
        </section>

        {/* Os Níveis do Projeto */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Etapas de Desenvolvimento</h2>
          <div className={styles.levelsGrid}>
            <div className={styles.levelCard}>
              <span className={styles.levelNum}>Nível 1</span>
              <h3>Perfil do Usuário</h3>
              <p>Construção da base conceitual: cabeçalho de navegação estático e a página individual do perfil com foto (tag img) e biografia detalhada.</p>
              <div className={styles.featureTags}>
                <span>layout.jsx</span>
                <span>/perfil</span>
                <span>img tag</span>
              </div>
            </div>

            <div className={styles.levelCard}>
              <span className={styles.levelNum}>Nível 2</span>
              <h3>Feed & Componentização</h3>
              <p>Foco em renderização iterativa. Criação do componente dinâmico PostCard e renderização de listas em array de posts usando o método .map().</p>
              <div className={styles.featureTags}>
                <span>PostCard.jsx</span>
                <span>props</span>
                <span>map() list</span>
              </div>
            </div>

            <div className={styles.levelCard}>
              <span className={styles.levelNum}>Nível 3</span>
              <h3>Persistência & Desafio</h3>
              <p>Implementação de formulários reativos para capturar novos posts e escrita/leitura dinâmica no localStorage para persistência de dados.</p>
              <div className={styles.featureTags}>
                <span>useState</span>
                <span>useEffect</span>
                <span>localStorage</span>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase de Código */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Destaques de Engenharia (Code Highlights)</h2>
          <p className={styles.sectionDesc}>Clique nas abas abaixo para ver a estrutura técnica e a explicação de como resolvemos os requisitos:</p>

          <div className={styles.showcaseWrapper}>
            {/* Abas */}
            <div className={styles.tabsCol}>
              {CODE_HIGHLIGHTS.map((highlight) => (
                <button
                  key={highlight.id}
                  onClick={() => setActiveTab(highlight.id)}
                  className={`${styles.tabBtn} ${activeTab === highlight.id ? styles.activeTab : ""}`}
                >
                  <span className={styles.tabIcon}>{highlight.icon}</span>
                  <div className={styles.tabText}>
                    <strong>{highlight.title}</strong>
                    <span>{highlight.filePath}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Visualizador de Código */}
            <div className={styles.codeViewerCol}>
              <div className={styles.codeWindow}>
                <div className={styles.codeHeader}>
                  <div className={styles.windowDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span className={styles.windowTitle}>
                    {CODE_HIGHLIGHTS[activeTab].filePath}
                  </span>
                </div>
                <div className={styles.codeBody}>
                  <pre>
                    <code>{CODE_HIGHLIGHTS[activeTab].code}</code>
                  </pre>
                </div>
              </div>

              {/* Explicação */}
              <div className={styles.explanationBox}>
                <h4>{CODE_HIGHLIGHTS[activeTab].title}</h4>
                <p className={styles.expDesc}>
                  {CODE_HIGHLIGHTS[activeTab].description}
                </p>
                <div className={styles.tipBox}>
                  <strong>💡 Como funciona:</strong>
                  <p>{CODE_HIGHLIGHTS[activeTab].explanation}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tokens de Design */}
        <section className={styles.section} style={{ marginBottom: "60px" }}>
          <h2 className={styles.sectionTitle}>Identidade Visual (Design System)</h2>
          <div className={styles.designGrid}>
            <div className={styles.designCard}>
              <h3>Paleta de Cores Premium</h3>
              <div className={styles.colorPalette}>
                <div className={styles.colorBubble} style={{ backgroundColor: "#8b5cf6" }}>
                  <span>Violeta</span>
                  <small>#8B5CF6</small>
                </div>
                <div className={styles.colorBubble} style={{ backgroundColor: "#3b82f6" }}>
                  <span>Azul</span>
                  <small>#3B82F6</small>
                </div>
                <div className={styles.colorBubble} style={{ backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span>Dark Zinc</span>
                  <small>#09090B</small>
                </div>
                <div className={styles.colorBubble} style={{ backgroundColor: "#f8fafc", color: "#000" }}>
                  <span>Slate Light</span>
                  <small>#F8FAFC</small>
                </div>
              </div>
            </div>

            <div className={styles.designCard}>
              <h3>Tipografia & Layout</h3>
              <div className={styles.fontsDisplay}>
                <div className={styles.fontRow}>
                  <strong>Geist Sans</strong>
                  <span>Usado para títulos, botões e links de alta legibilidade.</span>
                </div>
                <div className={styles.fontRow}>
                  <strong>Geist Mono</strong>
                  <span>Usado para visualização de códigos e blocos técnicos.</span>
                </div>
                <div className={styles.fontRow}>
                  <strong>Glassmorphism</strong>
                  <span>Visual translúcido moderno usando efeito de blur (blur-12px) de fundo.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className={styles.footer}>
          <p>Projeto Desenvolvido por <strong>Ana Costa</strong> & equipe na aula de Programação Web.</p>
        </footer>
      </div>
    </main>
  );
}
