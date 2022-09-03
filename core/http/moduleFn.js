function resStatus(url) {
  const router = ['/home', '/list']
  return router.includes(url) ? 200 : 404
}

function renderHtml(url) {
  switch(url) {
    case '/home':
      return `
        <html>
          <p>你好！${url}</p>
        </html>
      `
    case '/list':
      return `
        <html>
          <p>你好！${url}</p>
        </html>
      `
    default: 
      return `
      <html>
        <p>not fount</p>
      </html>
    `
  }
}

module.exports = {
  resStatus,
  renderHtml
}