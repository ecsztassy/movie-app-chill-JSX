const inputStyle = {
  width: '100%',
  padding: '14px',
  background: '#333',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
}

function InputField({ type = 'text', placeholder, value, onChange, required }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        onFocus={e => (e.target.style.border = '1px solid #E50914')}
        onBlur={e => (e.target.style.border = 'none')}
      />
    </div>
  )
}

export default InputField
