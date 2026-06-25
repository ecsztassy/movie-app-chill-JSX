function Button({ label, onClick, variant = 'primary', type = 'button' }) {
  const styles = {
    primary: {
      display: 'block',
      width: '100%',
      padding: '14px',
      border: 'none',
      borderRadius: '6px',
      background: '#E50914',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      textAlign: 'center',
    },
    secondary: {
      display: 'block',
      width: '100%',
      padding: '14px',
      border: 'none',
      borderRadius: '6px',
      background: 'rgba(255,255,255,0.15)',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      textAlign: 'center',
    },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={e => {
        if (variant === 'primary') e.target.style.background = '#c40712'
      }}
      onMouseLeave={e => {
        if (variant === 'primary') e.target.style.background = '#E50914'
      }}
    >
      {label}
    </button>
  )
}

export default Button
