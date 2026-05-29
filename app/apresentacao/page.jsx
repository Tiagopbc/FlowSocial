"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./apresentacao.module.css";

export default function Apresentacao() {
  const [activeTab, setActiveTab] = useState(0);

  const CODE_HIGHLIGHTS = [
    {
      id: 0,
      title: "Micro-Animações CSS",
      icon: "❤️",
      filePath: "components/PostCard.module.css",
      description: "Feedback tátil e resposta visual instantânea ao curtir publicações, vinculando o estado dinâmico do React à animação pura por keyframes do CSS.",
      code: (
        <>
          <span className={styles.codeComment}>/* Animação disparada quando o botão recebe a classe .liked */</span>{"\n"}
          <span className={styles.codeSelector}>.liked</span> <span className={styles.codeSelector}>.actionIcon</span> {"{"}{"\n"}
          {"  "}<span className={styles.codeProperty}>animation</span>: <span className={styles.codeValue}>heartBeat 0.3s ease-in-out</span>;{"\n"}
          {"}"}{"\n"}{"\n"}
          <span className={styles.codeKeyword}>@keyframes</span> <span className={styles.codeFunctionName}>heartBeat</span> {"{"}{"\n"}
          {"  "}0% {"{"}{"\n"}
          {"    "}<span className={styles.codeProperty}>transform</span>: <span className={styles.codeValue}>scale(1)</span>;{"\n"}
          {"  "}{"}"}{"\n"}
          {"  "}50% {"{"}{"\n"}
          {"    "}<span className={styles.codeProperty}>transform</span>: <span className={styles.codeValue}>scale(1.3)</span>;{"\n"}
          {"  "}{"}"}{"\n"}
          {"  "}100% {"{"}{"\n"}
          {"    "}<span className={styles.codeProperty}>transform</span>: <span className={styles.codeValue}>scale(1)</span>;{"\n"}
          {"  "}{"}"}{"\n"}
          {"}"}
        </>
      ),
      explanation: "Aproveitamos a potência do hardware do navegador usando keyframes de escala do CSS Vanilla. Isso torna a interface reativa e suave de forma otimizada."
    },
    {
      id: 1,
      title: "Persistência no localStorage",
      icon: "💾",
      filePath: "app/page.jsx",
      description: "Criação de novos posts no feed com persistência nativa usando o armazenamento interno do navegador. Permite que as publicações fiquem guardadas mesmo se fechar a aba.",
      code: (
        <>
          <span className={styles.codeKeyword}>const</span> <span className={styles.codeFunctionName}>handleCreatePost</span> = (<span className={styles.codeParams}>e</span>) =&gt; {"{"}{"\n"}
          {"  "}e.<span className={styles.codeMethod}>preventDefault</span>();{"\n"}
          {"  "}<span className={styles.codeKeyword}>if</span> (!novoPostConteudo.<span className={styles.codeMethod}>trim</span>()) <span className={styles.codeKeyword}>return</span>;{"\n"}{"\n"}
          {"  "}<span className={styles.codeKeyword}>const</span> novoPost = {"{"}{"\n"}
          {"    "}id: <span className={styles.codeString}>`post-\${Date.now()}`</span>,{"\n"}
          {"    "}autor: userProfile.<span className={styles.codeProperty}>nome</span>,{"\n"}
          {"    "}conteudo: novoPostConteudo,{"\n"}
          {"    "}data: <span className={styles.codeString}>"Agora mesmo"</span>,{"\n"}
          {"    "}imagemPost: selectedPresetImage,{"\n"}
          {"    "}curtidas: <span className={styles.codeNumber}>0</span>,{"\n"}
          {"    "}jaCurtido: <span className={styles.codeBoolean}>false</span>,{"\n"}
          {"    "}isOwnPost: <span className={styles.codeBoolean}>true</span>{"\n"}
          {"  "}{"}"};{"\n"}{"\n"}
          {"  "}<span className={styles.codeKeyword}>const</span> updatedPosts = [novoPost, ...posts];{"\n"}
          {"  "}<span className={styles.codeFunctionName}>setPosts</span>(updatedPosts);{"\n"}
          {"  "}localStorage.<span className={styles.codeMethod}>setItem</span>(<span className={styles.codeString}>"flow_posts"</span>, JSON.<span className={styles.codeMethod}>stringify</span>(updatedPosts));{"\n"}
          {"  "}<span className={styles.codeFunctionName}>setNovoPostConteudo</span>(<span className={styles.codeString}>""</span>);{"\n"}
          {"}"};
        </>
      ),
      explanation: "A função handleCreatePost captura o texto do formulário, monta um objeto estruturado em JS, gera um identificador exclusivo baseado no timestamp do sistema (Date.now()) e o guarda na chave local, simulando um banco de dados."
    },
    {
      id: 2,
      title: "Componentização & Props",
      icon: "🧩",
      filePath: "components/PostCard.jsx",
      description: "Código altamente modular. Um único componente representacional responsável por desenhar posts diferentes com base nas propriedades enviadas pelo componente pai.",
      code: (
        <>
          <span className={styles.codeKeyword}>export default function</span> <span className={styles.codeFunctionName}>PostCard</span>({"{"} {"\n"}
          {"  "}autor,{"\n"}
          {"  "}fotoAutor,{"\n"}
          {"  "}conteudo,{"\n"}
          {"  "}data,{"\n"}
          {"  "}imagemPost,{"\n"}
          {"  "}curtidas = <span className={styles.codeNumber}>0</span>,{"\n"}
          {"  "}jaCurtido = <span className={styles.codeBoolean}>false</span>,{"\n"}
          {"  "}onLike,{"\n"}
          {"  "}onDelete,{"\n"}
          {"  "}isOwnPost = <span className={styles.codeBoolean}>false</span>{"\n"}
          {"}"}) {"{"}{"\n"}
          {"  "}<span className={styles.codeKeyword}>return</span> ({"\n"}
          {"    "}&lt;<span className={styles.codeTag}>article</span> <span className={styles.codeAttr}>className</span>=<span className={styles.codeString}>{"{"}styles.postCard{"}"}</span>&gt;{"\n"}
          {"      "}&lt;<span className={styles.codeTag}>div</span> <span className={styles.codeAttr}>className</span>=<span className={styles.codeString}>{"{"}styles.userInfo{"}"}</span>&gt;{"\n"}
          {"        "}&lt;<span className={styles.codeTag}>img</span> <span className={styles.codeAttr}>src</span>=<span className={styles.codeString}>{"{"}fotoAutor{"}"}</span> <span className={styles.codeAttr}>alt</span>=<span className={styles.codeString}>{"{"}autor{"}"}</span> /&gt;{"\n"}
          {"        "}&lt;<span className={styles.codeTag}>h4</span>&gt;{"{"}autor{"}"}&lt;/<span className={styles.codeTag}>h4</span>&gt;{"\n"}
          {"      "}&lt;/<span className={styles.codeTag}>div</span>&gt;{"\n"}
          {"      "}&lt;<span className={styles.codeTag}>p</span>&gt;{"{"}conteudo{"}"}&lt;/<span className={styles.codeTag}>p</span>&gt;{"\n"}
          {"    "}&lt;/<span className={styles.codeTag}>article</span>&gt;{"\n"}
          {"  "});{"\n"}
          {"}"}
        </>
      ),
      explanation: "Evitamos duplicar código em loop. O PostCard é puramente representacional e reage a funções passadas por referência (como onLike e onDelete), mantendo o desenvolvimento limpo (conceito DRY)."
    },
    {
      id: 3,
      title: "Modo Escuro com CSS Puro",
      icon: "🌓",
      filePath: "app/globals.css",
      description: "Tema escuro e claro automático e com alto desempenho. As variáveis de cor se adaptam de acordo com as preferências do sistema operacional do usuário de forma 100% nativa.",
      code: (
        <>
          <span className={styles.codeComment}>/* Tema Claro Padrão */</span>{"\n"}
          <span className={styles.codeSelector}>:root</span> {"{"}{"\n"}
          {"  "}<span className={styles.codeProperty}>--bg-primary</span>: <span className={styles.codeValue}>#f8fafc</span>;{"\n"}
          {"  "}<span className={styles.codeProperty}>--text-primary</span>: <span className={styles.codeValue}>#0f172a</span>;{"\n"}
          {"  "}<span className={styles.codeProperty}>--accent-color</span>: <span className={styles.codeValue}>#6366f1</span>;{"\n"}
          {"}"}{"\n"}{"\n"}
          <span className={styles.codeComment}>/* Modo Escuro Nativo */</span>{"\n"}
          <span className={styles.codeKeyword}>@media</span> (prefers-color-scheme: dark) {"{"}{"\n"}
          {"  "}<span className={styles.codeSelector}>:root</span> {"{"}{"\n"}
          {"    "}<span className={styles.codeProperty}>--bg-primary</span>: <span className={styles.codeValue}>#09090b</span>;{"\n"}
          {"    "}<span className={styles.codeProperty}>--text-primary</span>: <span className={styles.codeValue}>#f4f4f5</span>;{"\n"}
          {"    "}<span className={styles.codeProperty}>--accent-color</span>: <span className={styles.codeValue}>#8b5cf6</span>;{"\n"}
          {"  "}{"}"}{"\n"}
          {"}"}
        </>
      ),
      explanation: "Destaque para performance: o navegador computa e atualiza as cores instantaneamente sem a necessidade de processar qualquer lógica JavaScript em segundo plano."
    }
  ];

  return (
    <main className={styles.presentationBg}>
      {/* Elementos visuais de fundo brilhantes (Glows Pastel) */}
      <div className={styles.gridOverlay} />
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      <div className={styles.glow3} />

      <div className={styles.container}>
        {/* Cabeçalho */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>Apresentação Prática 🎓</div>
          <h1 className={styles.title}>
            <span>Rede Social</span> <span className={styles.gradientText}>Flow</span>
          </h1>
          <p className={styles.subtitle}>
            Uma demonstração interativa de engenharia web moderna com Next.js (App Router), JavaScript e CSS puro.
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
              <div className={`${styles.levelHeader} ${styles.lvl1}`}>
                <span className={styles.levelNum}>Nível 1</span>
              </div>
              <h3>Perfil do Usuário</h3>
              <p>Construção da base conceitual: cabeçalho de navegação estático e a página individual do perfil com foto (tag img) e biografia detalhada.</p>
              <div className={styles.featureTags}>
                <span>layout.jsx</span>
                <span>/perfil</span>
                <span>img tag</span>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div className={`${styles.levelHeader} ${styles.lvl2}`}>
                <span className={styles.levelNum}>Nível 2</span>
              </div>
              <h3>Feed & Componentização</h3>
              <p>Foco em renderização iterativa. Criação do componente dinâmico PostCard e renderização de listas em array de posts usando o método .map().</p>
              <div className={styles.featureTags}>
                <span>PostCard.jsx</span>
                <span>props</span>
                <span>map() list</span>
              </div>
            </div>

            <div className={styles.levelCard}>
              <div className={`${styles.levelHeader} ${styles.lvl3}`}>
                <span className={styles.levelNum}>Nível 3</span>
              </div>
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
                {/* A chave key={activeTab} força o React a remontar e disparar a animação CSS de fade-in suave */}
                <div key={activeTab} className={styles.codeBody}>
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
                <div className={styles.colorBubble} style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", boxShadow: "0 10px 20px rgba(139,92,246,0.2)" }}>
                  <span>Violeta</span>
                  <small>#8B5CF6</small>
                </div>
                <div className={styles.colorBubble} style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", boxShadow: "0 10px 20px rgba(59,130,246,0.2)" }}>
                  <span>Azul</span>
                  <small>#3B82F6</small>
                </div>
                <div className={styles.colorBubble} style={{ background: "linear-gradient(135deg, #18181b, #09090b)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}>
                  <span>Dark Zinc</span>
                  <small>#09090B</small>
                </div>
                <div className={styles.colorBubble} style={{ background: "linear-gradient(135deg, #ffffff, #f1f5f9)", color: "#0f172a", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}>
                  <span>Slate Light</span>
                  <small>#F8FAFC</small>
                </div>
              </div>
            </div>

            <div className={styles.designCard}>
              <h3>Diretrizes de Interface</h3>
              <div className={styles.fontsDisplay}>
                <div className={styles.fontRow}>
                  <strong>Geist Sans & Inter</strong>
                  <span>Tipografias sem serifa modernas para botões, rótulos e interface de usuário.</span>
                </div>
                <div className={styles.fontRow}>
                  <strong>Geist Mono</strong>
                  <span>Fonte monoespaçada premium usada para formatar blocos de código.</span>
                </div>
                <div className={styles.fontRow}>
                  <strong>Glassmorfismo de Alta Fidelidade</strong>
                  <span>Visual translúcido fosco (`blur-20px`) com bordas brancas sutis que simulam reflexo.</span>
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
