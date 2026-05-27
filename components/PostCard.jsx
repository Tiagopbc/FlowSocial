/* eslint-disable @next/next/no-img-element */
import styles from "./PostCard.module.css";

export default function PostCard({ 
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
      {/* Cabeçalho do Post */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img 
            src={fotoAutor || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"} 
            alt={`Avatar de ${autor}`} 
            className={styles.avatar}
          />
          <div className={styles.userText}>
            <h3 className={styles.authorName}>{autor}</h3>
            <span className={styles.postDate}>{data}</span>
          </div>
        </div>
        
        {isOwnPost && onDelete && (
          <button 
            onClick={onDelete} 
            className={styles.deleteButton}
            aria-label="Excluir publicação"
            title="Excluir publicação"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Conteúdo do Post */}
      <div className={styles.content}>
        <p className={styles.postText}>{conteudo}</p>
        
        {imagemPost && (
          <div className={styles.postImageContainer}>
            <img src={imagemPost} alt="Conteúdo visual do post" className={styles.postImage} />
          </div>
        )}
      </div>

      {/* Ações do Post */}
      <div className={styles.actions}>
        <button 
          onClick={onLike} 
          className={`${styles.actionButton} ${jaCurtido ? styles.liked : ""}`}
        >
          <span className={styles.actionIcon}>{jaCurtido ? "❤️" : "🤍"}</span>
          <span className={styles.actionCount}>{curtidas}</span>
        </button>
        
        <button className={styles.actionButton} onClick={() => alert("Comentários serão integrados na próxima versão! 🚀")}>
          <span className={styles.actionIcon}>💬</span>
          <span className={styles.actionCount}>0</span>
        </button>
        
        <button className={styles.actionButton} onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copiado para a área de transferência! 🔗");
        }}>
          <span className={styles.actionIcon}>🔗</span>
        </button>
      </div>
    </article>
  );
}
