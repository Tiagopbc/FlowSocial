/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./perfil.module.css";

export default function Perfil() {
  const [profile, setProfile] = useState({
    nome: "Ana Costa",
    bio: "Desenvolvedora Frontend & Apaixonada por UI/UX. Transformando café em interfaces modernas e responsivas. 👩‍💻✨",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
    capa: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempNome, setTempNome] = useState("");
  const [tempBio, setTempBio] = useState("");

  // Carrega as informações do perfil salvas no localStorage (se existirem)
  useEffect(() => {
    const savedProfile = localStorage.getItem("flow_profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleEditClick = () => {
    setTempNome(profile.nome);
    setTempBio(profile.bio);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      nome: tempNome,
      bio: tempBio
    };
    setProfile(updatedProfile);
    localStorage.setItem("flow_profile", JSON.stringify(updatedProfile));
    setIsEditing(false);
    
    // Forçar atualização do Header se necessário (o ideal em uma rede real seria contexto ou state global, 
    // mas para o escopo local, recarregar ou apenas atualizar o estado local resolve, vamos recarregar para atualizar o Header também).
    window.location.reload();
  };

  return (
    <main className={styles.main}>
      <div className={styles.cardContainer}>
        {/* Banner de Capa */}
        <div 
          className={styles.coverPhoto} 
          style={{ backgroundImage: `url(${profile.capa})` }}
        />

        {/* Informações do Perfil */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <img 
              src={profile.avatar} 
              alt={`Foto de ${profile.nome}`} 
              className={styles.avatar} 
            />
          </div>
          
          <div className={styles.headerActions}>
            {!isEditing ? (
              <button onClick={handleEditClick} className={styles.editButton}>
                Editar Perfil
              </button>
            ) : (
              <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                Cancelar
              </button>
            )}
            <Link href="/" className={styles.backButton}>
              ← Voltar ao Feed
            </Link>
          </div>
        </div>

        {/* Detalhes do Usuário */}
        <div className={styles.profileDetails}>
          {!isEditing ? (
            <>
              <h1 className={styles.name}>{profile.nome}</h1>
              <p className={styles.username}>@anacosta.dev</p>
              <p className={styles.bio}>{profile.bio}</p>
            </>
          ) : (
            <form onSubmit={handleSave} className={styles.editForm}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-nome">Nome</label>
                <input 
                  id="edit-nome"
                  type="text" 
                  value={tempNome} 
                  onChange={(e) => setTempNome(e.target.value)} 
                  required
                  maxLength={50}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-bio">Biografia</label>
                <textarea 
                  id="edit-bio"
                  value={tempBio} 
                  onChange={(e) => setTempBio(e.target.value)} 
                  required
                  maxLength={160}
                  className={styles.textarea}
                />
              </div>
              <button type="submit" className={styles.saveButton}>
                Salvar Alterações
              </button>
            </form>
          )}

          {/* Estatísticas Fictícias */}
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>18</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>1.4k</span>
              <span className={styles.statLabel}>Seguidores</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>890</span>
              <span className={styles.statLabel}>Seguindo</span>
            </div>
          </div>
        </div>

        {/* Grid de Fotos Recentes (Extra Visual) */}
        <div className={styles.recentActivity}>
          <h2 className={styles.sectionTitle}>Publicações Recentes</h2>
          <div className={styles.photoGrid}>
            <div className={styles.gridItem} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80)` }} />
            <div className={styles.gridItem} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80)` }} />
          </div>
        </div>
      </div>
    </main>
  );
}
