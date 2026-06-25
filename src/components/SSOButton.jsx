function SSOButton({ label = 'Continue with Google', onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '6px',
        background: 'white',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'black',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#ececec')}
      onMouseLeave={e => (e.currentTarget.style.background = 'white')}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt="Google"
        style={{ width: '20px' }}
      />
      {label}
    </button>
  )
}

export default SSOButton
