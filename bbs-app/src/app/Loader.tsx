export default function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        className='loader'
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `,
        }}
      />
    </div>
  );
}
