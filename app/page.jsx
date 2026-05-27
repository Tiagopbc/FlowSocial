/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import styles from "./page.module.css";

// Posts de Exemplo Iniciais (Mockados)
const INITIAL_POSTS = [
  {
    id: "mock-1",
    autor: "Felipe Melo",
    fotoAutor: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    conteudo: "Hoje comecei a estudar Next.js! A estrutura de pastas com App Router é muito organizada. A velocidade de carregamento é insana. 🚀 #NextJS #ProgramacaoWeb",
    data: "Hoje às 14:32",
    imagemPost: "",
    curtidas: 12,
    jaCurtido: false,
    isOwnPost: false
  },
  {
    id: "mock-2",
    autor: "Luana Silva",
    fotoAutor: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    conteudo: "Acabei de finalizar a estilização do meu perfil usando CSS puro. Adicionei efeitos de glassmorphism e micro-animações! O que acharam do resultado? 💻✨",
    data: "Ontem às 18:15",
    imagemPost: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    curtidas: 24,
    jaCurtido: true,
    isOwnPost: false
  },
  {
    id: "mock-3",
    autor: "Marcos Lima",
    fotoAutor: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    conteudo: "Dica de ouro para quem está começando na Web: foquem primeiro em dominar o HTML, CSS e JavaScript puro (Vanilla) antes de pular para os frameworks. Isso faz toda a diferença no longo prazo! 💡 #DesenvolvimentoWeb #Dicas",
    data: "25 de mai. de 2026",
    imagemPost: "",
    curtidas: 8,
    jaCurtido: false,
    isOwnPost: false
  }
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [novoPostConteudo, setNovoPostConteudo] = useState("");
  const [selectedPresetImage, setSelectedPresetImage] = useState("");
  const [userProfile, setUserProfile] = useState({
    nome: "Ana Costa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  });
  
  // Evitar hydration mismatch no Next.js (erro de servidor x cliente diferente)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Carrega dados do Perfil
    const savedProfile = localStorage.getItem("flow_profile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    // Carrega posts do localStorage ou define os mockados caso esteja vazio
    const savedPosts = localStorage.getItem("flow_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem("flow_posts", JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!novoPostConteudo.trim()) return;

    const novoPost = {
      id: `post-${Date.now()}`,
      autor: userProfile.nome,
      fotoAutor: userProfile.avatar,
      conteudo: novoPostConteudo,
      data: "Agora mesmo",
      imagemPost: selectedPresetImage,
      curtidas: 0,
      jaCurtido: false,
      isOwnPost: true // Indica que foi criado pelo usuário atual
    };

    const updatedPosts = [novoPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("flow_posts", JSON.stringify(updatedPosts));
    
    // Reset do form
    setNovoPostConteudo("");
    setSelectedPresetImage("");
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          curtidas: post.jaCurtido ? post.curtidas - 1 : post.curtidas + 1,
          jaCurtido: !post.jaCurtido
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("flow_posts", JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (postId) => {
    if (confirm("Deseja realmente excluir este post?")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem("flow_posts", JSON.stringify(updatedPosts));
    }
  };

  // Se não estiver montado no cliente, renderiza um esqueleto
  if (!mounted) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <main className="app-container">
      {/* Coluna Esquerda: Mini Perfil (Sidebar) */}
      <aside className={`${styles.sidebar} hide-mobile`}>
        <div className="glass-card" style={{ padding: "20px" }}>
          <div className={styles.profileSummary}>
            <div className={styles.coverMini} />
            <img 
              src={userProfile.avatar} 
              alt={`Avatar de ${userProfile.nome}`} 
              className={styles.avatarMini}
            />
            <h2 className={styles.nameMini}>{userProfile.nome}</h2>
            <p className={styles.usernameMini}>@anacosta.dev</p>
            
            <div className={styles.statsMini}>
              <div>
                <span>18</span>
                <label>Posts</label>
              </div>
              <div>
                <span>1.4k</span>
                <label>Seguidores</label>
              </div>
            </div>
            
            <Link href="/perfil" className={styles.viewProfileButton}>
              Ver Perfil Completo
            </Link>
          </div>
        </div>
      </aside>

      {/* Coluna Central: Feed */}
      <section className={styles.feedArea}>
        {/* Caixa de Criação de Post */}
        <div className="glass-card" style={{ padding: "20px", marginBottom: "20px" }}>
          <form onSubmit={handleCreatePost} className={styles.postForm}>
            <div className={styles.formHeader}>
              <img src={userProfile.avatar} alt="Seu Avatar" className={styles.avatarForm} />
              <textarea
                value={novoPostConteudo}
                onChange={(e) => setNovoPostConteudo(e.target.value)}
                placeholder="O que está acontecendo no seu mundo?"
                className={styles.postTextarea}
                maxLength={280}
                required
              />
            </div>

            {/* Imagens Presetadas Opcionais (UX Premium) */}
            <div className={styles.presetImagesSection}>
              <span className={styles.presetLabel}>Adicionar Imagem Ilustrativa:</span>
              <div className={styles.presetsGrid}>
                <button
                  type="button"
                  className={`${styles.presetBtn} ${selectedPresetImage === "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80" ? styles.selectedPreset : ""}`}
                  onClick={() => setSelectedPresetImage(selectedPresetImage === "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80" ? "" : "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80")}
                >
                  💻 Código
                </button>
                <button
                  type="button"
                  className={`${styles.presetBtn} ${selectedPresetImage === "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" ? styles.selectedPreset : ""}`}
                  onClick={() => setSelectedPresetImage(selectedPresetImage === "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" ? "" : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80")}
                >
                  ☕ Café
                </button>
                <button
                  type="button"
                  className={`${styles.presetBtn} ${selectedPresetImage === "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80" ? styles.selectedPreset : ""}`}
                  onClick={() => setSelectedPresetImage(selectedPresetImage === "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80" ? "" : "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80")}
                >
                  🚀 Setup
                </button>
              </div>
            </div>

            <div className={styles.formFooter}>
              <span className={styles.charCount}>
                {280 - novoPostConteudo.length} caracteres
              </span>
              <button 
                type="submit" 
                className={styles.publishButton}
                disabled={!novoPostConteudo.trim()}
              >
                Publicar ⚡
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Posts */}
        <div className={styles.postList}>
          {posts.length === 0 ? (
            <div className={styles.emptyFeed}>
              <h3>Nenhum post no momento.</h3>
              <p>Seja o primeiro a compartilhar alguma coisa!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                autor={post.autor}
                fotoAutor={post.fotoAutor}
                conteudo={post.conteudo}
                data={post.data}
                imagemPost={post.imagemPost}
                curtidas={post.curtidas}
                jaCurtido={post.jaCurtido}
                isOwnPost={post.isOwnPost}
                onLike={() => handleLikePost(post.id)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))
          )}
        </div>
      </section>

      {/* Coluna Direita: Widgets (Tendências e Quem Seguir) */}
      <aside className={`${styles.widgets} hide-tablet`}>
        <div className={`${styles.widgetCard} glass-card`}>
          <h3>O que está em alta ⚡</h3>
          <ul className={styles.trendsList}>
            <li>
              <span>#NextJS</span>
              <small>1,234 flows</small>
            </li>
            <li>
              <span>#ProgramacaoWeb</span>
              <small>892 flows</small>
            </li>
            <li>
              <span>#VanillaCSS</span>
              <small>567 flows</small>
            </li>
            <li>
              <span>#React19</span>
              <small>320 flows</small>
            </li>
          </ul>
        </div>

        <div className={`${styles.widgetCard} glass-card`}>
          <h3>Quem seguir</h3>
          <ul className={styles.followList}>
            <li>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80" alt="Felipe" />
              <div>
                <strong>Felipe Melo</strong>
                <span>@felipe.melo</span>
              </div>
              <button className={styles.followBtn}>Seguir</button>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&h=50&q=80" alt="Mariana" />
              <div>
                <strong>Mariana Dias</strong>
                <span>@mariana_d</span>
              </div>
              <button className={styles.followBtn}>Seguir</button>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
